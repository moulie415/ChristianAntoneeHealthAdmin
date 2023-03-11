import React from 'react';
import {useDataProvider, useInput} from 'react-admin';

const MyAutoComplete = () => {
  const dataProvider = useDataProvider();
  const {field} = useInput();
  return <div>MyAutoComplete</div>;
};

export default MyAutoComplete;
