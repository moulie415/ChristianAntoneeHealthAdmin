import {Button, Typography} from '@mui/material';
import moment from 'moment';
import {
  TextareaHTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Avatar,
  IFileMessage,
  Input,
  MessageList,
  MessageType,
} from 'react-chat-elements';
import {useNavigate, useParams} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import {ChatContext} from '../context/ChatContextProvider';
import {mapMessageType} from '../helpers/mapMessageType';
import useThrottle from '../hooks/UseThottle';
import {Message} from '../types/Shared';
import './chat.css';

let clearRef = () => {};

const Chat = () => {
  const messageListReferance = useRef();

  const inputReferance = useRef<TextareaHTMLAttributes<any>>();

  const {id} = useParams();

  const {
    friends,
    messages,
    sendMessage,
    chats,
    uid,
    loadEarlier,
    setRead,
    unread,
  } = useContext(ChatContext);

  const friend = friends[id || ''];

  const messagesObj = messages[id || ''];

  const sorted: MessageType[] = useMemo(() => {
    const messages = Object.values(messagesObj || {});
    return messages
      .sort((a, b) => (a.createdAt as number) - (b.createdAt as number))
      .map(message => {
        return mapMessageType(message, uid || '');
      });
  }, [messagesObj, uid]);

  const scrollToBottom = () => {
    const mlistElement = document.getElementsByClassName('rce-mlist')[0];
    if (typeof mlistElement !== 'undefined') {
      mlistElement.scrollTop = mlistElement.scrollHeight;
    }
  };
  useEffect(() => {
    if (id && unread[id]) {
      setRead(id || '');
    }
    return () => {
      if (id && unread[id]) {
        setRead(id || '');
      }
    };
  }, [id, setRead, unread]);

  // Listener for when the state changes:
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, []);

  const send = (text: string) => {
    const message: Message = {
      _id: uuidv4(),
      user: {
        _id: uid || '',
        avatar: friend?.avatar,
        name: friend?.name,
      },
      text,
      type: 'text',
      pending: true,
      createdAt: moment().valueOf(),
    };
    sendMessage(message, chats[id || ''].id, id || '');
  };

  const navigate = useNavigate();

  const cursor = useRef(0);

  const loadMore = useThrottle(async () => {
    const startAfter = sorted[0]?.date;
    if (cursor.current === startAfter) {
      return;
    }
    cursor.current = startAfter as number;
    loadEarlier(chats[id || ''].id, id || '', startAfter as number);
  }, 3000);

  return (
    <>
      <div
        style={{
          position: 'sticky',
          display: 'flex',
          alignItems: 'center',
          height: 80,
          boxShadow: `0 4px 2px -2px gray`,
        }}>
        <div
          style={{
            marginLeft: 20,
          }}>
          <button
            onClick={() => navigate(`/users/${id}`)}
            style={{
              all: 'unset',
              cursor: 'pointer',
              alignItems: 'center',
              display: 'flex',
            }}>
            <Avatar
              src={friend?.avatar || ''}
              size="xlarge"
              type="circle"
              alt={friend?.name || ''}
              letterItem={
                friend?.avatar
                  ? undefined
                  : {id: friend?.uid || '', letter: friend?.name?.[0] || ''}
              }
            />
            <Typography style={{marginLeft: 10}} variant="h6">
              {`${friend?.name || ''} ${friend?.surname || ''}`}
            </Typography>
          </button>
        </div>
      </div>
      <div className="right-panel rce-example-messageList">
        <MessageList
          className="message-list"
          onScroll={e => {
            if (
              // @ts-ignore
              e.target.scrollTop === 0
            ) {
              loadMore();
              // load more
            }
          }}
          referance={messageListReferance}
          dataSource={sorted}
          lockable
          downButton
          toBottomHeight="100%"
          downButtonBadge={10}
          onDownload={async m => {
            const message = m as IFileMessage;
            open(message.data.uri);
          }}
          sendMessagePreview
        />

        <div
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            left: 0,
            margin: '0 auto 1rem auto',
            width: '60%',
          }}>
          <Input
            className="rce-example-input"
            placeholder="Type a message..."
            defaultValue=""
            multiline={true}
            maxlength={300}
            onMaxLengthExceed={() => console.log('onMaxLengthExceed')}
            referance={inputReferance}
            clear={(clear: any) => (clearRef = clear)}
            maxHeight={50}
            onKeyDown={e => {
              if (e.shiftKey && e.code === 'Enter') {
                return true;
              }
              if (e.code === 'Enter') {
                e.preventDefault();
                const value = inputReferance.current?.value as string;
                const trimmed = value?.trim();
                if (trimmed) {
                  send(trimmed);
                  clearRef();
                }
              }
            }}
            rightButtons={
              <Button
                variant="contained"
                onClick={() => {
                  const value = inputReferance.current?.value as string;
                  const trimmed = value?.trim();
                  if (trimmed) {
                    send(trimmed);
                    clearRef();
                  }
                }}>
                Submit
              </Button>
            }
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
