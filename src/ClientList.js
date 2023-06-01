import {BooleanField, BooleanInput} from 'ra-ui-materialui';
import * as React from 'react';
import {
  Datagrid,
  List,
  Show,
  Edit,
  SimpleShowLayout,
  SimpleForm,
  ShowButton,
  EditButton,
  Toolbar,
  SaveButton,
  ArrayField,
  ArrayInput,
  SimpleFormIterator,
  TextInput,
  SingleFieldList,
} from 'react-admin';
import SimpleChipField from './SimpleChipField';

export const ClientList = props => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
      <ArrayField source="emails">
        <SingleFieldList>
          <SimpleChipField />
        </SingleFieldList>
      </ArrayField>
      <ShowButton label="" />
      <EditButton label="" />
    </Datagrid>
  </List>
);

export const ClientListShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <ArrayField source="emails">
        <SingleFieldList>
          <SimpleChipField />
        </SingleFieldList>
      </ArrayField>
    </SimpleShowLayout>
  </Show>
);

const ClientListEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const ClientListEdit = props => (
  <Edit {...props}>
    <SimpleForm toolbar={<ClientListEditToolbar />}>
      <ArrayInput label="Emails" source="emails">
        <SimpleFormIterator>
          <TextInput label="Email" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
