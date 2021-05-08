// in src/posts.js
import * as React from 'react';
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  DateField,
  ImageField,
  ImageInput,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  RichTextField,
  ReferenceField,
  SelectInput,
  ReferenceInput,
  FileInput,
  FileField,
  ArrayInput,
  SimpleFormIterator,
  ChipField,
  ArrayField,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const ExercisesFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
  </Filter>
);

const muscles = [
  {id: 'chest', name: 'Chest'},
  {id: 'upperBack', name: 'Upper back'},
  {id: 'midBack', name: 'Mid back'},
  {id: 'lowBack', name: 'Low back'},
  {id: 'shoulders', name: 'Shoulders'},
  {id: 'biceps', name: 'Biceps'},
  {id: 'triceps', name: 'Triceps'},
  {id: 'abdominals', name: 'Abdominals'},
  {id: 'obliques', name: 'Obliques'},
  {id: 'leg', name: 'Leg Muscles'},
  {id: 'gluteals', name: 'Gluteals'},
  {id: 'hamstrings', name: 'Hamstrings'},
  {id: 'quadriceps', name: 'Quadriceps'},
  {id: 'calves', name: 'Calves'},
  {id: 'hipFlexors', name: 'Hip Flexors'},
  {id: 'iliotibialBand', name: 'Iliotibial Band'},
  {id: 'rotatorCuff', name: 'Rotator Cuff Muscles'},
  {id: 'innerThigh', name: 'Inner Thigh Muscles'},
  {id: 'all', name: 'All Muscles'},
  {id: 'upperBody', name: 'Upper Body'},
  {id: 'arms', name: 'Arms'},
];

// const ReferenceFilter = (props) => (
//   <Filter {...props}>
//     <ReferenceInput
//       label="Organization"
//       source="user.id"
//       reference="users"
//       allowEmpty
//     >
//       <SelectInput optionText="name" />
//     </ReferenceInput>
//   </Filter>
// );

export const ExerciseList = props => (
  <List
    {...props}
    sort={{field: 'name', order: 'ASC'}}
    // filters={<ExercisesFilter />}
    // filter={{ updatedby: "test@example.com" }}
  >
    <Datagrid>
      {/* <TextField source="id" /> */}
      <TextField source="name" />
      {/* <RichTextField source="description" /> */}
      <ChipField source="type" />
      <ChipField source="area" />
      <ChipField source="level" />
      <TextField source="muscles" />
      {/* <ReferenceField label="User" source="user_id" reference="users">
        <TextField source="name" />
      </ReferenceField> */}
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const ExerciseShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" options={{multiline: true}} />
      <ChipField source="type" />
      <ChipField source="area" />
      <ChipField source="level" />
      <TextField source="muscles" />
    </SimpleShowLayout>
  </Show>
);

export const ExerciseCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" options={{multiline: true}} />
      <SelectInput
        source="type"
        choices={[
          {id: 'strength', name: 'strength'},
          {id: 'flexibility', name: 'flexibility'},
          {id: 'cardiovascular', name: 'cardiovascular'},
          {id: 'balance', name: 'balance'},
        ]}
      />
      <SelectInput
        source="area"
        choices={[
          {id: 'upper', name: 'upper'},
          {id: 'lower', name: 'lower'},
          {id: 'full', name: 'full'},
        ]}
      />
      <SelectInput
        source="level"
        choices={[
          {id: 'beginner', name: 'beginner'},
          {id: 'intermediate', name: 'intermediate'},
          {id: 'advanced', name: 'advanced'},
        ]}
      />
      <ArrayInput source="muscles">
        <SimpleFormIterator>
          <SelectInput choices={muscles} label="Muscle" />
        </SimpleFormIterator>
      </ArrayInput>
      <FileInput source="video" label="Video" accept="video/*">
        <FileField source="src" title="title" />
      </FileInput>
      <ImageInput source="thumbnail" label="Thumbnail" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const ExerciseEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="description" options={{multiline: true}} />
      <SelectInput
        source="type"
        choices={[
          {id: 'strength', name: 'strength'},
          {id: 'flexibility', name: 'flexibility'},
          {id: 'cardiovascular', name: 'cardiovascular'},
          {id: 'balance', name: 'balance'},
        ]}
      />
      <SelectInput
        source="area"
        choices={[
          {id: 'upper', name: 'upper'},
          {id: 'lower', name: 'lower'},
          {id: 'full', name: 'full'},
        ]}
      />
      <SelectInput
        source="level"
        choices={[
          {id: 'beginner', name: 'beginner'},
          {id: 'intermediate', name: 'intermediate'},
          {id: 'advanced', name: 'advanced'},
        ]}
      />
      <ArrayInput source="muscles">
        <SimpleFormIterator>
          <SelectInput choices={muscles} label="Muscle" />
        </SimpleFormIterator>
      </ArrayInput>
      <FileInput source="video" label="Video" accept="video/*">
        <FileField source="src" title="title" />
      </FileInput>
      <ImageInput source="thumbnail" label="Thumbnail" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
