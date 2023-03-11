import React from 'react';
import {AutocompleteInput, useGetList, useInput} from 'react-admin';

const MyAutoCompleteInput = ({source, optionText}) => {
  const {field} = useInput({source});

  const {data} = useGetList(source);

  return (
    <AutocompleteInput
      {...field}
      source={source}
      choices={data}
      optionText={optionText}
      style={{width: 400}}
    />
  );
};

export default MyAutoCompleteInput;
