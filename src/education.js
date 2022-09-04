import {Label} from '@mui/icons-material';
import {Typography} from '@mui/material';
import {RichTextInput} from 'ra-input-rich-text';
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
  useRecordContext,
} from 'react-admin';
import {useWatch} from 'react-hook-form';

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

const CustomBodyField = () => {
  const {body} = useRecordContext();
  return (
    <>
      <p
        style={{
          fontSize: '0.75em',
          fontFamily: 'Roboto, Helvetica,Arial,sans-serif',
          color: 'rgba(0,0,0,0.6)',
        }}>
        Body
      </p>
      <div dangerouslySetInnerHTML={{__html: body}}></div>
    </>
  );
};

export const EducationShow = props => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="title" />
        <ChipField source="category" />
        <ImageField source="image.src" />
        <BooleanField source="premium" />
        <CustomBodyField />
      </SimpleShowLayout>
    </Show>
  );
};

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
