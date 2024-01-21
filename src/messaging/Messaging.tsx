import moment from 'moment';
import {useCallback, useContext} from 'react';
import {ChatList} from 'react-chat-elements';
import {useNavigate} from 'react-router-dom';
import {ChatContext} from '../context/ChatContextProvider';
import {getLastMessage} from '../helpers/getLastMessage';
import {sortFriends} from '../helpers/sortFriends';
import './messaging.css';

//const getChats = () => {};

const Messaging = () => {
  const {friends, uid: yourUid, messages, unread} = useContext(ChatContext);

  const getLast = useCallback(
    (uid: string) => {
      if (yourUid) {
        return getLastMessage(uid, messages, yourUid, friends);
      }
    },
    [friends, messages, yourUid],
  );

  const sorted = sortFriends(Object.values(friends), messages, unread);

  const navigate = useNavigate();

  return (
    <>
      <ChatList
        id=""
        lazyLoadingImage=""
        onClick={props => navigate(`/messaging/${props.id}`)}
        dataSource={sorted.map(friend => {
          const last = getLast(friend.uid);
          return {
            avatar: friend.avatar || '',
            title: friend.name || '',
            letterItem: friend?.avatar
              ? undefined
              : {id: friend?.uid || '', letter: friend?.name?.[0] || ''},

            id: friend.uid,
            subtitle: last?.preview,
            date: moment(last?.createdAt).toDate(),
            unread: unread[friend.uid],
          };
        })}
      />
    </>
  );
};

export default Messaging;
