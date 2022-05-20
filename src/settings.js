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
  ReferenceArrayField,
  ChipField,
  SingleFieldList,
  ReferenceArrayInput,
  AutocompleteArrayInput,
} from 'react-admin';

export const SettingsList = props => (
  <List bulkActionButtons={false} {...props}>
    <Datagrid>
      <BooleanField source="ads" />
      <ReferenceArrayField label="Admins" reference="users" source="admins">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <BooleanField source="emailPlanRequests" label="Email plan requests" />
      <ShowButton label="" />
      <EditButton label="" />
    </Datagrid>
  </List>
);

export const SettingsShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <BooleanField source="ads" />
      <ReferenceArrayField label="Admins" reference="users" source="admins">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <BooleanField source="emailPlanRequests" label="Email plan requests" />
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
      <ReferenceArrayInput
        source="admins"
        reference="users"
        filterToQuery={searchText => ({name: searchText})}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <BooleanInput source="emailPlanRequests" label="Email plan requests" />
    </SimpleForm>
  </Edit>
);
