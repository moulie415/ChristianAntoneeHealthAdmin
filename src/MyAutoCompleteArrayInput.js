import React from 'react';
import {AutocompleteArrayInput, useGetList, useInput} from 'react-admin';

const MyAutoCompleteArrayInput = ({source, optionText}) => {
  const {field} = useInput({source});

  const {data} = useGetList(source);

  return (
    <AutocompleteArrayInput
      {...field}
      source={source}
      choices={data}
      optionText={optionText}
      style={{width: 400}}
    />
  );
};

export default MyAutoCompleteArrayInput;
