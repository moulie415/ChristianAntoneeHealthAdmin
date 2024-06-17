import {getMessaging, getToken} from 'firebase/messaging';
import {useContext} from 'react';
import {Menu} from 'react-admin';
import {ChatContext} from '../context/ChatContextProvider';
import * as api from '../helpers/api';
import {isSafari} from '../helpers/isSafari';
import MessagingIcon from './MessagingIcon';

const MyMenu = () => {
  const chatContext = useContext(ChatContext);

  const uid = chatContext?.uid || '';

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
  return (
    <Menu>
      <Menu.ResourceItem name="dashboard" />
      <Menu.ResourceItem name="exercises" />
      <Menu.ResourceItem name="tests" />
      <Menu.ResourceItem name="quickRoutines" />
      <Menu.ResourceItem name="education" />
      <Menu.ResourceItem name="settings" />
      <Menu.ResourceItem name="users" />
      <Menu.ResourceItem name="plans" />
      <Menu.ResourceItem name="recipes" />
      <Menu.ResourceItem name="feedback" />
      <Menu.Item
        to="/messaging"
        primaryText="Messaging"
        onClick={() => {
          if (isSafari && uid) {
            requestPermission();
          }
        }}
        leftIcon={<MessagingIcon />}
      />
    </Menu>
  );
};

export default MyMenu;
