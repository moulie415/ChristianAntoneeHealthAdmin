import {
  AutocompleteArrayInput,
  useGetList,
  AutocompleteArrayInputProps,
} from 'react-admin';

interface Props extends AutocompleteArrayInputProps {
  reference: string;
  optionText: string;
  perPage?: number;
  page?: number;
}

const MyAutoCompleteArrayInput: React.FC<Props> = props => {
  const {data} = useGetList(props.reference, {
    pagination: {perPage: props.perPage || 200, page: props.page || 1},
  });
  return (
    <AutocompleteArrayInput
      {...props}
      choices={data?.map(item => {
        return {id: item.id, [props.optionText]: item[props.optionText]};
      })}
      filterToQuery={() => ''}
      matchSuggestion={(filter, suggestion) => {
        return (
          suggestion[props.optionText]
            ?.toLowerCase()
            .indexOf(filter?.toLowerCase()) !== -1
        );
      }}
    />
  );
};

export default MyAutoCompleteArrayInput;
