import {
  ChipField,
  Datagrid,
  Edit,
  EditButton,
  List,
  ReferenceArrayField,
  required,
  ResourceProps,
  SaveButton,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
  Toolbar,
  ToolbarProps,
} from 'react-admin';
import MyAutoCompleteArrayInput from '../common/MyAutoCompleteArrayInput';
import WelcomeMessageInput from './WelcomeMessageInput';

export const SettingsList = (props: ResourceProps) => (
  <List {...props}>
    <Datagrid bulkActionButtons={false}>
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
      <TextField source="welcomeMessage" />
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
      <WelcomeMessageInput
        label="Welcome message (use {{name}} to substitute users name)"
        multiline
        fullWidth
        validate={[required()]}
        source="welcomeMessage"
      />
    </SimpleForm>
  </Edit>
);
