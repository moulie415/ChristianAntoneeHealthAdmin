import {
  ChipField,
  Datagrid,
  Edit,
  EditButton,
  FileField,
  FileInput,
  List,
  NumberField,
  NumberInput,
  ReferenceArrayField,
  required,
  ResourceProps,
  SaveButton,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  SingleFieldList,
  Toolbar,
  ToolbarProps,
} from 'react-admin';
import MyAutoCompleteArrayInput from '../common/MyAutoCompleteArrayInput';
import WelcomeMessageField from './WelcomeMessageField';
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
      <NumberField
        source="premiumPlusMaxSubscriptions"
        label="Premium Plus max subscriptions"
      />
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
      <WelcomeMessageField source="welcomeMessage" />
      <NumberField
        source="premiumPlusMaxSubscriptions"
        label="Premium Plus max subscriptions"
      />
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
        label="Premium plus welcome message (use {{name}} to substitute users name)"
        multiline
        fullWidth
        validate={[required()]}
        source="welcomeMessage"
      />
      <FileInput
        source="welcomeVideo"
        label="Premium plus welcome video"
        accept={{'video/*': ['.mp4', '.mov', '.avi']}}
        defaultValue={null}>
        <FileField source="src" title="title" />
      </FileInput>
      <NumberInput
        source="premiumPlusMaxSubscriptions"
        label="Premium Plus max subscriptions"
      />
    </SimpleForm>
  </Edit>
);
