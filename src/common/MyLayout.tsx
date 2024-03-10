import {
  AppBar,
  CheckForApplicationUpdate,
  Layout,
  LayoutComponent,
  ToggleThemeButton,
} from 'react-admin';
import MyMenu from './MyMenu';

const MyAppBar = () => <AppBar toolbar={<ToggleThemeButton />} />;

const MyLayout: LayoutComponent = props => {
  return (
    <>
      <Layout {...props} menu={MyMenu} appBar={MyAppBar} />
      <CheckForApplicationUpdate />
    </>
  );
};

export default MyLayout;
