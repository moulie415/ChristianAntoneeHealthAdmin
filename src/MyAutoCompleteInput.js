import React from 'react';
import {AutocompleteInput} from 'react-admin';

const MyAutoCompleteInput = props => {
  return (
    <AutocompleteInput
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

export default MyAutoCompleteInput;
