import {useContext, useMemo, useRef} from 'react';
import {Button, Input, MessageList, MessageType} from 'react-chat-elements';
import {useParams} from 'react-router-dom';
import {ChatContext} from '../context/ChatContextProvider';
import {mapMessageType} from '../helpers/mapMessageType';

let clearRef = () => {};

const Chat = () => {
  const messageListReferance = useRef();
  const inputReferance = useRef();

  const {id} = useParams();

  console.log(id);

  const {friends, messages} = useContext(ChatContext);

  const friend = friends[id || ''];

  const messagesObj = messages[id || ''];

  const sorted: MessageType[] = useMemo(() => {
    const messages = Object.values(messagesObj || {});
    return messages
      .sort((a, b) => (a.createdAt as number) - (b.createdAt as number))
      .map(message => {
        return mapMessageType(message);
      });
  }, [messagesObj]);

  console.log(sorted);

  return (
    <div className="right-panel rce-example-messageList">
      <MessageList
        className="message-list"
        referance={messageListReferance}
        dataSource={sorted}
        lockable={true}
        downButton={true}
        downButtonBadge={10}
        sendMessagePreview={true}
        messageBoxStyles={{backgroundColor: 'red'}}
        notchStyle={{fill: 'red'}}
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
          onKeyPress={(e: any) => {
            if (e.shiftKey && e.charCode === 13) {
              return true;
            }
            if (e.charCode === 13) {
              clearRef();
              //   addMessage(3);
            }
          }}
          rightButtons={
            <Button
              text="Submit"
              onClick={() => {
                // addMessage(3)
              }}
            />
          }
        />
      </div>
    </div>
  );
};

export default Chat;
