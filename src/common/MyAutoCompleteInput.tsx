import {
  AutocompleteInput,
  AutocompleteInputProps,
  useGetList,
} from 'react-admin';

interface Props extends AutocompleteInputProps {
  reference: string;
  perPage?: number;
  page?: number;
  optionText: string;
}
const MyAutoCompleteInput: React.FC<Props> = props => {
  const {data} = useGetList(props.reference, {
    pagination: {perPage: props.perPage || 200, page: props.page || 1},
  });
  return (
    <AutocompleteInput
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

export default MyAutoCompleteInput;
