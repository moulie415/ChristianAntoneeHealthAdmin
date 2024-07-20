import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  limitToLast,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {httpsCallable} from 'firebase/functions';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import moment from 'moment';
import {toast} from 'react-toastify';
import {db, functions, storage} from '../App';
import {
  Chat,
  Entitlement,
  Message,
  Profile,
  QuickRoutine,
  Sample,
  WeeklyItems,
} from '../types/Shared';
import {chunkArrayInGroups} from './chunkArrayInGroups';

export const getUser = (uid: string) => {
  return getDoc(doc(db, 'users', uid));
};

export const getFriends = async (uid: string) => {
  const q = query(collection(db, 'users', uid, 'connections'));
  const connections = await getDocs(q);
  const uids = connections.docs.map(doc => doc.data().uid);
  if (uids.length) {
    const users: {[uid: string]: Profile} = {};
    const uidArrays = chunkArrayInGroups(uids, 10);
    for (let i = 0; i < uidArrays.length; i++) {
      const arr = uidArrays[i];
      const q = query(collection(db, 'users'), where(documentId(), 'in', arr));
      const userData = await getDocs(q);
      userData.docs.forEach(doc => {
        const user: any = doc.data();
        users[doc.id] = user;
      });
    }
    return users;
  }
  return {};
};

export const getChats = async (uid: string) => {
  const idQuery = await getDocs(query(collection(db, 'users', uid, 'chats')));
  const ids = idQuery.docs.map(chat => chat.data().id);
  if (ids.length) {
    const idArrays = chunkArrayInGroups(ids, 10);
    const chats: {[key: string]: Chat} = {};
    for (let i = 0; i < idArrays.length; i++) {
      const arr = idArrays[i];
      const chatsData = await getDocs(
        query(collection(db, 'chats'), where(documentId(), 'in', arr)),
      );
      chatsData.docs.forEach(doc => {
        const otherUid = doc.data().users.find((id: string) => id !== uid);
        const chat: any = {id: doc.id, ...doc.data()};
        chats[otherUid] = chat;
      }, {});
    }
    return chats;
  }
  return {};
};

export const getMessages = async (chatId: string, startAfter: number) => {
  const q = await getDocs(
    query(
      collection(db, 'chats', chatId, 'messages'),
      where('createdAt', '<', startAfter),
      orderBy('createdAt'),
      limitToLast(20),
    ),
  );
  return q.docs.reduce((acc: {[id: string]: Message}, cur) => {
    const message: any = cur.data();
    acc[message ? message._id : cur.id] = {...message, id: cur.id};
    return acc;
  }, {});
};

export const sendMessage = async (
  message: Message,
  chatId: string,
  userId: string,
  yourUid: string,
  data?: Blob | Uint8Array | ArrayBuffer,
) => {
  const fileSizeExceededMessage = 'File size limit exceeded';

  if (
    data &&
    (message.type === 'audio' ||
      message.type === 'image' ||
      message.type === 'video' ||
      message.type === 'document')
  ) {
    const size = 1;
    const maxFileSize = 10;

    if (size && size / 1000000 < maxFileSize) {
      const imageRef = ref(storage, `chats/${yourUid}/${message._id}`);
      await uploadBytes(imageRef, data);
      const url = await getDownloadURL(imageRef);

      message = {
        ...message,
        [message.type]: url,
      };
    } else {
      throw new Error(fileSizeExceededMessage);
    }
  }
  return httpsCallable(functions, 'sendMessage')({message, chatId, userId});
};

export const deleteMessage = (
  message: Message,
  chatId: string,
  messageId: string,
) => {
  return httpsCallable(
    functions,
    'deleteMessage',
  )({
    message,
    chatId,
    messageId,
  });
};

export const setUnread = (uid: string, unread: {[key: string]: number}) => {
  return updateDoc(doc(db, 'users', uid), {unread});
};

export const setWebPushToken = (uid: string, webPushToken: string) => {
  return updateDoc(doc(db, 'users', uid), {webPushToken});
};

export const getQuickRoutines = async () => {
  const snapshot = await getDocs(query(collection(db, 'quickRoutines')));
  return snapshot.docs.reduce((acc: {[id: string]: QuickRoutine}, cur) => {
    const quickRoutine: any = cur.data();
    acc[cur.id] = {
      ...quickRoutine,
      id: cur.id,
      createdate: quickRoutine.createdate?.toDate(),
      lastupdate: quickRoutine.lastupdate?.toDate(),
    };
    return acc;
  }, {});
};

export const getWeeklyItems = async (uid: string): Promise<WeeklyItems> => {
  try {
    const response = await httpsCallable<{uid: string}, WeeklyItems>(
      functions,
      'getWeeklyItems',
    )({uid});

    const {quickRoutines, tests, workouts} = response.data;
    return {quickRoutines, tests, workouts};
  } catch (e) {
    toast.error('Error fetching weekly items');
    return {quickRoutines: {}, tests: {}, workouts: {}};
  }
};

export const getSettings = async () => {
  const snapshot = await getDoc(doc(db, 'settings', 'settings'));
  return snapshot.data();
};

export const getSamples = async (
  sample: string,
  uid: string,
): Promise<Sample[]> => {
  const samples = await getDocs(
    query(
      collection(db, 'users', uid, sample),
      where('createdate', '>=', moment().subtract(1, 'year').toDate()),
    ),
  );

  return samples.docs.map(doc => {
    const data = doc.data();
    return {
      startDate: data.createdate.toDate(),
      endDate: data.createdate.toDate(),
      value: data.value,
    };
  });
};

export const saveSample = (
  sample: string,
  value: number,
  uid: string,
  createdate = new Date(),
) => {
  return addDoc(collection(db, 'users', uid, sample), {
    value,
    createdate,
  });
};

export const grantEntitlement = async (
  userId: string,
  entitlementId: Entitlement,
  startTime: number,
  endTime: number,
) => {
  return httpsCallable<{
    userId: string;
    entitlementId: Entitlement;
    startTime: number;
    endTime: number;
  }>(
    functions,
    'grantEntitlement',
  )({userId, entitlementId, startTime, endTime});
};

export const revokeEntitlement = async (
  userId: string,
  entitlementId: Entitlement,
) => {
  return httpsCallable<{
    userId: string;
    entitlementId: Entitlement;
  }>(
    functions,
    'revokeEntitlement',
  )({userId, entitlementId});
};

export interface OverviewMetric {
  object: string;
  id: string;
  name: string;
  description: string;
  unit: string;
  period: string;
  value: number;
  last_updated_at: number;
  last_updated_at_iso8601: string;
}

export interface OverviewMetricsResponse {
  object: string;
  metrics: OverviewMetric[];
}

export const getOverviewMetrics = async () => {
  return httpsCallable<null, OverviewMetricsResponse>(
    functions,
    'getOverviewMetrics',
  )();
};
