import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import {Menu} from 'react-admin';
import ChatContextProvider from '../context/ChatContextProvider';
import MessagingIcon from './MessagingIcon';

const MyMenu = () => {
  return (
    <Menu>
      <Menu.ResourceItem name="exercises" />
      <Menu.ResourceItem name="tests" />
      <Menu.ResourceItem name="quickRoutines" />
      <Menu.ResourceItem name="education" />
      <Menu.ResourceItem name="settings" />
      <Menu.ResourceItem name="users" />
      <Menu.Item
        to="/premium-users"
        primaryText="Premium users"
        leftIcon={<InventoryOutlinedIcon />}
        placeholder=""
      />
      <Menu.ResourceItem name="plans" />
      <Menu.ResourceItem name="recipes" />
      <Menu.Item
        to="/messaging"
        primaryText="Messaging"
        leftIcon={
          <ChatContextProvider>
            <MessagingIcon />
          </ChatContextProvider>
        }
        placeholder=""
      />
    </Menu>
  );
};

export default MyMenu;
