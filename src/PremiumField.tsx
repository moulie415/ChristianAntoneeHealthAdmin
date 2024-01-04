import * as React from 'react';
import {useRecordContext} from 'react-admin';

const PremiumField = props => {
  const record = useRecordContext(props);
  return <span>{record?.premium ? Object.keys(record.premium)?.[0] : ''}</span>;
};

export default PremiumField;
