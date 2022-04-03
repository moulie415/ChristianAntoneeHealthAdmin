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
  ChipField,
  TextInput,
  SimpleForm,
  ShowButton,
  EditButton,
  DeleteButton,
  SelectInput,
} from 'react-admin';

export const EducationList = props => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <ChipField source="category" />
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
      <ChipField source="category" />
      <BooleanField source="premium" />
    </SimpleShowLayout>
  </Show>
);

export const EducationCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <SelectInput
          source="category"
          choices={[
            {id: 'exercise', name: 'Exercise Articles'},
            {id: 'general', name: 'General Lifestyle'},
            {id: 'nutritional', name: 'Nutritional Info'},
          ]}
        />
        <ImageInput source="image" label="Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <RichTextInput source="body" multiline />
        <BooleanInput source="premium" />
      </SimpleForm>
    </Create>
  );
};

export const EducationEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput
        source="category"
        choices={[
          {id: 'exercise', name: 'Exercise Articles'},
          {id: 'general', name: 'General Lifestyle'},
          {id: 'nutritional', name: 'Nutritional Info'},
        ]}
      />
      <ImageInput source="image" label="Image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <RichTextInput source="body" multiline />
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
