import {BooleanField, BooleanInput} from 'ra-ui-materialui';
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
  ResourceProps,
  ToolbarProps,
} from 'react-admin';
import MyAutoCompleteArrayInput from '../common/MyAutoCompleteArrayInput';

export const SettingsList = (props: ResourceProps) => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
      <BooleanField source="ads" />
      <ReferenceArrayField label="Admins" reference="users" source="admins">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Premium friends"
        reference="users"
        source="premiumFriends">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ShowButton label="" />
      <EditButton label="" />
    </Datagrid>
  </List>
);

export const SettingsShow = (props: ResourceProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <BooleanField source="ads" />
      <ReferenceArrayField label="Admins" reference="users" source="admins">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ReferenceArrayField
        label="Premium friends"
        reference="users"
        source="premiumFriends">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
    </SimpleShowLayout>
  </Show>
);

const SettingsEditToolbar = (props: ToolbarProps) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const SettingsEdit = (props: ResourceProps) => (
  <Edit {...props}>
    <SimpleForm toolbar={<SettingsEditToolbar />}>
      <BooleanInput source="ads" />

      <MyAutoCompleteArrayInput
        source="admins"
        reference="users"
        optionText="name"
      />

      <MyAutoCompleteArrayInput
        source="premiumFriends"
        reference="users"
        optionText="name"
      />
    </SimpleForm>
  </Edit>
);
