import RichTextInput from 'ra-input-rich-text';
import React from 'react';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  ImageInput,
  ImageField,
  SimpleShowLayout,
  BooleanField,
  BooleanInput,
  TextField,
  TextInput,
  SimpleForm,
  ShowButton,
  EditButton,
  DeleteButton,
} from 'react-admin';

export const EducationList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <BooleanField source="premium" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const EducationShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <BooleanField source="premium" />
    </SimpleShowLayout>
  </Show>
);

export const EducationCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <ImageInput source="image" label="Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <RichTextInput source="body" options={{multiline: true}} />
        <BooleanInput source="premium" />
      </SimpleForm>
    </Create>
  );
};

export const EducationEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <ImageInput source="image" label="Image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <RichTextInput source="body" options={{multiline: true}} />
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
