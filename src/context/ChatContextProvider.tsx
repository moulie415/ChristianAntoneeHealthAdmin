import {User} from 'firebase/auth';
import {
  Unsubscribe,
  collection,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
import * as _ from 'lodash';
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import * as api from '../helpers/api';
import {isSafari} from '../helpers/isSafari';
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
  loadEarlier: (
    chatId: string,
    uid: string,
    startAfter: number,
  ) => Promise<void>;
  setRead: (uid: string) => void;
};

export const ChatContext = createContext<ChatContextType>({
  friends: {},
  unread: {},
  loading: false,
  chats: {},
  messages: {},
  sendMessage: () => {},
  loadEarlier: () => new Promise(() => {}),
  setRead: () => {},
});

const ChatContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user?: User;
}) => {
  const [friends, setFriends] = useState<{[key: string]: Profile}>({});
  const [unread, setUnread] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<{[key: string]: Chat}>({});
  const [messages, setMessages] = useState<{
    [key: string]: {[key: string]: Message};
  }>({});

  const uid = user?.uid || '';

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

  const loadEarlier = useCallback(
    async (chatId: string, uid: string, startAfter: number) => {
      try {
        const earlier = await api.getMessages(chatId, startAfter);
        const newMessages = {
          ...messages,
          [uid]: {
            ...earlier,
            ...messages[uid],
          },
        };
        if (!_.isEqual(messages[uid], {...earlier, ...messages[uid]})) {
          setMessages(newMessages);
        }
      } catch (e) {
        toast.error('Error loading messaging');
      }
    },
    [messages],
  );

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

  useEffect(() => {
    const requestPermission = async () => {

      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const messaging = getMessaging();
        const currentToken = await getToken(messaging, {
          vapidKey:
            'BADL544oBJTYq5Yvd1HveVk5knrNI0-586EQIzG189l4wDn7immDCbwxvu6LYGZYQANE09fP7_JTNbFDoZ7SrEs',
        });

        if (currentToken) {
          await api.setWebPushToken(uid, currentToken);
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.',
          );
          // ...
        }
      }
    };
    if (uid && !isSafari) {
      requestPermission();
    }
  }, [uid]);

  const setRead = useThrottle(async (id: string) => {
    const current = unread;
    try {
      const newUnread = {...current, [id || '']: 0};
      if (!_.isEqual(newUnread, current)) {
        setUnread(newUnread);
        await api.setUnread(uid, newUnread);
      }
    } catch (e) {
      setUnread(current);
    }
  }, 1000);

  const {id} = useParams();

  useEffect(() => {
    const messaging = getMessaging();
    const unsubscribe = onMessage(messaging, payload => {
      const uid = payload.data?.uid as string;
      const newUnread = unread && unread[uid] ? unread[uid] + 1 : 1;
      if (!_.isEqual(newUnread, unread) && id !== uid) {
        setUnread({...unread, [uid]: newUnread});
      } else if (id === uid && unread[id]) {
        setRead(id);
      }
    });
    return () => unsubscribe();
  }, [unread, id, setRead]);

  return (
    <ChatContext.Provider
      value={{
        friends,
        unread,
        loading,
        chats,
        messages,
        uid,
        sendMessage,
        loadEarlier,
        setRead,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
