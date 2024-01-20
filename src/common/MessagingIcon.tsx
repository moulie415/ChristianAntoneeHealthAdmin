import ForumIcon from '@mui/icons-material/Forum';
import {useContext} from 'react';
import colors from '../colors';
import {ChatContext} from '../context/ChatContextProvider';

const MessagingIcon = () => {
  const {unread} = useContext(ChatContext);

  const count = Object.keys(unread || {}).reduce((acc, cur) => {
    if (cur !== 'plan') {
      const num = unread?.[cur];
      if (num) {
        return acc + num;
      }
    }
    return acc;
  }, 0);

  console.log(unread)
  return (
    <>
      <ForumIcon />
      {count > 0 && (
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: 8,
            position: 'absolute',
            top: 0,
            left: 30,
            backgroundColor: colors.appRed,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <b
            style={{
              fontSize: 10,
              color: colors.appWhite,
            }}>
            {count > 9 ? '9+' : count}
          </b>
        </div>
      )}
    </>
  );
};

export default MessagingIcon;
