import {CheckForApplicationUpdate, Layout, LayoutComponent} from 'react-admin';
import ChatContextProvider from '../context/ChatContextProvider';
import MyMenu from './MyMenu';

const MyLayout: LayoutComponent = props => {
  return (
    <ChatContextProvider>
      <Layout {...props} menu={MyMenu} />
      <CheckForApplicationUpdate />
    </ChatContextProvider>
  );
};

export default MyLayout;
