import React from 'react';
import {AutocompleteInput, useGetList} from 'react-admin';

const MyAutoCompleteInput = props => {
  const {data} = useGetList(props.reference, {
    pagination: {perPage: props.perPage || 200, page: props.page || 1},
  });

  return (
    <AutocompleteInput
      {...props}
      choices={data?.map(item => {
        return {id: item.id, name: item[props.optionText]};
      })}
      filterToQuery={() => ''}
      matchSuggestion={(filter, suggestion) => {
        return (
          suggestion[props.optionText]
            .toLowerCase()
            .indexOf(filter?.toLowerCase()) !== -1
        );
      }}
    />
  );
};

export default MyAutoCompleteInput;
