import React from 'react';
import {CheckForApplicationUpdate, Layout, LayoutComponent} from 'react-admin';
import MyMenu from './MyMenu';

const MyLayout: LayoutComponent = props => {

  return  <><Layout {...props} menu={MyMenu} />
  <CheckForApplicationUpdate />
  </>;
};

export default MyLayout;
