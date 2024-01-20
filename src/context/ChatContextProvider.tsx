import {
  Unsubscribe,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import * as _ from 'lodash';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useGetIdentity} from 'react-admin';
import {toast} from 'react-toastify';
import {db} from '../App';
import * as api from '../helpers/api';
import useThrottle from '../hooks/UseThottle';
import {Chat, Message, Profile} from '../types/Shared';

export type ChatContextType = {
  friends: {[key: string]: Profile};
  unread: {[key: string]: number};
  loading: boolean;
  chats: {[key: string]: Chat};
  messages: {
    [key: string]: {[key: string]: Message};
  };
  uid?: string;
  sendMessage: (
    message: Message,
    chatId: string,
    userId: string,
    data?: Blob | Uint8Array | ArrayBuffer,
  ) => void;
};

export const ChatContext = createContext<ChatContextType>({
  friends: {},
  unread: {},
  loading: false,
  chats: {},
  messages: {},
  sendMessage: () => {},
});

const ChatContextProvider = ({children}: {children: ReactNode}) => {
  const [friends, setFriends] = useState<{[key: string]: Profile}>({});
  const [unread, setUnread] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<{[key: string]: Chat}>({});
  const [messages, setMessages] = useState<{
    [key: string]: {[key: string]: Message};
  }>({});

  const {data} = useGetIdentity();

  const uid = data?.id as string;

  const getFriends = useCallback(async () => {
    setLoading(true);
    try {
      const f = await api.getFriends(uid);
      setFriends(f);

      const user = await api.getUser(uid);
      const userData = user.data();
      if (userData?.unread) {
        // in case a friend had deleted their account we want to set unread back to 0
        const newUnread = Object.keys(userData.unread).reduce((acc, cur) => {
          if (f[cur]) {
            return {...acc, [cur]: userData.unread[cur]};
          }
          if (cur === 'plan') {
            return {...acc, [cur]: userData.unread[cur]};
          }
          return acc;
        }, {});

        if (!_.isEqual(unread, newUnread)) {
          // await api.setUnread(uid, newUnread);
          setUnread(newUnread);
        }
      }
      const c = await api.getChats(uid);
      setChats(c);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, [uid, unread]);

  useEffect(() => {
    if (uid) {
      getFriends();
    }
  }, [uid, getFriends]);

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [];
    if (Object.values(chats)) {
      const uids = Object.keys(chats);
      for (const uid of uids) {
        const unsubscribe = onSnapshot(
          query(
            collection(db, 'chats', chats[uid].id, 'messages'),
            limitToLast(20),
            orderBy('createdAt'),
          ),
          snapshot => {
            const newMessages = snapshot.docs.reduce(
              (acc: {[id: string]: Message}, cur) => {
                const message: any = cur.data();
                acc[message ? message._id : cur.id] = {...message, id: cur.id};
                return acc;
              },
              {},
            );
            const newObj = {
              ...messages,
              [uid]: {
                ...messages[uid],
                ...newMessages,
              },
            };

            if (!_.isEqual(newObj, messages)) {
              setMessages({
                ...messages,
                [uid]: {
                  ...messages[uid],
                  ...newMessages,
                },
              });
            }

            for (const change of snapshot.docChanges()) {
              if (change.type === 'removed') {
                const messagesForUser = messages[uid];
                delete messagesForUser[change.doc.data()._id];
                const newObj = {
                  ...messages,
                  [uid]: messagesForUser,
                };
                if (!_.isEqual(newObj, messages)) {
                  setMessages(newObj);
                }
              }
            }
          },
        );
        subscriptions.push(unsubscribe);
      }
    }
    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
    };
  }, [chats, messages]);

  const sendMessage = useThrottle(
    async (
      message: Message,
      chatId: string,
      userId: string,
      data?: Blob | Uint8Array | ArrayBuffer,
    ) => {
      try {
        setMessages({
          ...messages,
          [userId]: {...messages[userId], [message._id]: message},
        });
        debugger;
        await api.sendMessage(message, chatId, userId, uid, data);
      } catch (e) {
        toast.error('Error sending message');
        const messagesForUser = messages[uid];
        delete messagesForUser[message._id];
        const newObj = {
          ...messages,
          [uid]: messagesForUser,
        };
        setMessages(newObj);
      }
    },
    3000,
  );

  return (
    <ChatContext.Provider
      value={{friends, unread, loading, chats, messages, uid, sendMessage}}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
