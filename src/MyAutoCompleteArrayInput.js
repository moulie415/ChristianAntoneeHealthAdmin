import React from 'react';
import {AutocompleteArrayInput} from 'react-admin';

const MyAutoCompleteArrayInput = props => {
  return (
    <AutocompleteArrayInput
      {...props}
      filterToQuery={() => ''}
      matchSuggestion={(filter, suggestion) => {
        return (
          suggestion[props.optionText].toLowerCase().indexOf(filter) !== -1
        );
      }}
    />
  );
};

export default MyAutoCompleteArrayInput;
