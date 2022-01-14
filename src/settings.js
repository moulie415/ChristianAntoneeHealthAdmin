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

export const SettingsEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <BooleanInput source="ads" />
    </SimpleForm>
  </Edit>
);
