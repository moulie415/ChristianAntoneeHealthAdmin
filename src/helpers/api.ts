import {
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
import {db, functions, storage} from '../App';
import {Chat, Message, Profile} from '../types/Shared';
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
      const url = getDownloadURL(imageRef);

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
  return updateDoc(doc(collection(db, 'users', uid)), {unread});
};
