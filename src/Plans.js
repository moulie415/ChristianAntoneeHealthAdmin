import {Button} from '@material-ui/core';
import * as React from 'react';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  ShowButton,
  ReferenceField,
  TextInput,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const PlansList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid>
      <ReferenceField label="User" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const PlansShow = props => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="User" source="user" reference="users">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
};

export const PlansCreate = props => (
  <Create {...props}>
    <SimpleForm></SimpleForm>
  </Create>
);

export const PlansEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceField label="User" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
    </SimpleForm>
  </Edit>
);
