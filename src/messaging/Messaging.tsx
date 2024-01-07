import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {useGetIdentity} from 'react-admin';
import {ChatList} from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import {db} from '../App';
import {chunkArrayInGroups} from '../helpers/chunkArrayInGroups';
import {Profile} from '../types/Shared';

const getFriends = async (uid: string) => {
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

//const getChats = () => {};

const Messaging = () => {
  const {data} = useGetIdentity();
  const [friends, setFriends] = useState<Profile[]>([]);

  const uid = data?.id as string;

  useEffect(() => {
    const fetch = async (uid: string) => {
      const f = await getFriends(uid);
      setFriends(Object.values(f));
    };
    if (uid) {
      fetch(uid);
    }
  }, [uid]);
  return (
    <div>
      <ChatList
        id=""
        lazyLoadingImage=""
        dataSource={friends.map(friend => {
          return {
            avatar: friend.avatar || '',
            title: friend.name || '',
            id: friend.uid,
          };
        })}
      />
    </div>
  );
};

export default Messaging;
