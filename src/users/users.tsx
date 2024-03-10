import {
  BooleanField,
  Datagrid,
  EditButton,
  EmailField,
  ExportButton,
  FilterButton,
  List,
  ResourceProps,
  SortButton,
  TextField,
  TopToolbar,
} from 'react-admin';
import PremiumField from '../common/PremiumField';
import CreatePlanButton from '../plans/CreatePlanButton';

// const UserFilter = props => (
//   <Filter {...props}>
//     <TextInput label="Search" source="title" alwaysOn />
//   </Filter>
// );

const ListActions = () => (
  <TopToolbar>
    <FilterButton
      filters={
        [
          // <BooleanInput label="Is client" source="client" defaultValue />,
        ]
      }
    />
    <SortButton fields={['name', 'email']} />
    <ExportButton />
  </TopToolbar>
);

export const UsersList = (props: ResourceProps) => {
  return (
    <List {...props} perPage={200} actions={<ListActions />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="surname" />
        <EmailField source="email" />
        <BooleanField source="marketing" />
        <CreatePlanButton />
        <PremiumField source="premium" />
        {/* <ShowButton label="" /> */}
        <EditButton label="" />
        {/* <DeleteButton label="" redirect={false} /> */}
      </Datagrid>
    </List>
  );
};
