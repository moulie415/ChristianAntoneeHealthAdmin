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
} from 'react-admin';

export const SettingsList = props => (
  <List bulkActionButtons={false} {...props}>
    <Datagrid>
      <BooleanField source="ads" />
      <ShowButton label="" />
      <EditButton label="" />
    </Datagrid>
  </List>
);

export const SettingsShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <BooleanField source="ads" />
    </SimpleShowLayout>
  </Show>
);

const SettingsEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const SettingsEdit = props => (
  <Edit {...props}>
    <SimpleForm toolbar={<SettingsEditToolbar />}>
      <BooleanInput source="ads" />
    </SimpleForm>
  </Edit>
);
