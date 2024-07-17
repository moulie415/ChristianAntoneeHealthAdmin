import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  ResourceProps,
  Show,
  ShowButton,
  SimpleShowLayout,
  TextField,
} from 'react-admin';

export const FeedbackList = (props: ResourceProps) => (
  <List {...props} sort={{field: 'createdate', order: 'DESC'}} perPage={200}>
    <Datagrid>
      <TextField source="feedback" />
      <NumberField source="rating" />
      <ReferenceField label="User" source="id" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdate" />
      <ShowButton label="" />
    </Datagrid>
  </List>
);

export const FeedbackShow = (props: ResourceProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="feedback" />
      <NumberField source="rating" />
      <ReferenceField label="User" source="id" reference="users">
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);
