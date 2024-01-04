import {cloneElement} from 'react';
import {useRecordContext} from 'react-admin';

export const StringToLabelObject = ({children, ...rest}) => {
  const record = useRecordContext();
  return cloneElement(children, {
    record: {label: record},
    ...rest,
  });
};
