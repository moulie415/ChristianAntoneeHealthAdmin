import * as React from 'react';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  ImageField,
  ImageInput,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  SelectInput,
  FileInput,
  FileField,
  ArrayInput,
  SimpleFormIterator,
  ChipField,
  BooleanInput,
  BooleanField,
  required,
} from 'react-admin';

// const ExercisesFilter = props => (
//   <Filter {...props}>
//     <TextInput label="Search" source="name" alwaysOn />
//   </Filter>
// );

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

const equipment = [
  {id: 'barbells', name: 'Barbells'},
  {id: 'dumbbells', name: 'Dumbbells'},
  {id: 'benches', name: 'Benches'},
  {id: 'cableMachines', name: 'Cable machines'},
  {id: 'kettlebells', name: 'Kettlebells'},
  {id: 'pullUpBar', name: 'Pull-up Bar'},
  {id: 'squatRack', name: 'Squat Rack'},
  {id: 'exerciseBall', name: 'Exercise Ball'},
  {id: 'bosuBall', name: 'Bosu Ball'},
  {id: 'agilityLadder', name: 'Agility Ladder'},
  {id: 'plyometricBox', name: 'Plyometric Box'},
  {id: 'trxSuspensionTrainer', name: 'TRX Suspension Trainer'},
  {id: 'medicineBalls', name: 'Medicine Balls'},
  {id: 'landmine', name: 'Landmine'},
  {id: 'exerciseStep', name: 'Exercise Step'},
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
    perPage={200}
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
      <BooleanField source="premium" />
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
      <TextField source="description" multiline />
      <TextField source="parameters" multiline />
      <ChipField source="type" />
      <ChipField source="area" />
      <ChipField source="level" />
      <ChipField source="warmUp" />
      <ChipField source="coolDown" />
      <TextField source="equipment" />
      <TextField source="muscles" />
      <TextField source="musclesSecondary" />
      <BooleanField source="premium" />
    </SimpleShowLayout>
  </Show>
);

export const ExerciseCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="description" validate={required()} multiline />
      <TextInput source="parameters" multiline defaultValue="" />
      <SelectInput
        source="type"
        defaultValue=""
        choices={[
          {
            id: 'strength',
            name: 'Improve strength',
          },
          {
            id: 'fitness',
            name: 'Improve fitness',
          },
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="area"
        defaultValue=""
        choices={[
          {id: 'upper', name: 'upper'},
          {id: 'lower', name: 'lower'},
          {id: 'full', name: 'full'},
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="level"
        defaultValue=""
        choices={[
          {id: 'beginner', name: 'beginner'},
          {id: 'intermediate', name: 'intermediate'},
          {id: 'advanced', name: 'advanced'},
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="warmUp"
        defaultValue=""
        choices={[
          {id: 'circulatory', name: 'circulatory'},
          {id: 'softTissue', name: 'soft tissue preparation'},
          {id: 'dynamicStretching', name: 'dynamic stretching'},
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="coolDown"
        defaultValue=""
        choices={[
          {id: 'circulatory', name: 'circulatory'},
          {id: 'staticStretching', name: 'static stretching'},
          {id: '', name: 'None'},
        ]}
      />
      <ArrayInput source="equipment" defaultValue={[]}>
        <SimpleFormIterator>
          <SelectInput choices={equipment} label="Equipment" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="muscles" defaultValue={[]}>
        <SimpleFormIterator>
          <SelectInput choices={muscles} label="Muscle" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="musclesSecondary" defaultValue={[]}>
        <SimpleFormIterator>
          <SelectInput choices={muscles} label="Muscle" />
        </SimpleFormIterator>
      </ArrayInput>
      <FileInput
        validate={required()}
        source="video"
        label="Video"
        accept="video/*">
        <FileField source="src" title="title" />
      </FileInput>
      <ImageInput
        source="thumbnail"
        validate={required()}
        label="Thumbnail"
        accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <BooleanInput source="premium" />
    </SimpleForm>
  </Create>
);

export const ExerciseEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="description" validate={required()} multiline />
      <TextInput source="parameters" multiline defaultValue="" />
      <SelectInput
        source="type"
        defaultValue=""
        choices={[
          {
            id: 'strength',
            name: 'Improve strength',
          },
          {
            id: 'fitness',
            name: 'Improve fitness',
          },
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="area"
        defaultValue=""
        choices={[
          {id: 'upper', name: 'upper'},
          {id: 'lower', name: 'lower'},
          {id: 'full', name: 'full'},
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="level"
        defaultValue=""
        choices={[
          {id: 'beginner', name: 'beginner'},
          {id: 'intermediate', name: 'intermediate'},
          {id: 'advanced', name: 'advanced'},
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="warmUp"
        defaultValue=""
        choices={[
          {id: 'circulatory', name: 'circulatory'},
          {id: 'softTissue', name: 'soft tissue preparation'},
          {id: 'dynamicStretching', name: 'dynamic stretching'},
          {id: '', name: 'None'},
        ]}
      />
      <SelectInput
        source="coolDown"
        defaultValue=""
        choices={[
          {id: 'circulatory', name: 'circulatory'},
          {id: 'staticStretching', name: 'static stretching'},
          {id: '', name: 'None'},
        ]}
      />
      <ArrayInput source="equipment" defaultValue={[]}>
        <SimpleFormIterator>
          <SelectInput choices={equipment} label="Equipment" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="muscles" defaultValue={[]}>
        <SimpleFormIterator>
          <SelectInput choices={muscles} label="Muscle" />
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="musclesSecondary" defaultValue={[]}>
        <SimpleFormIterator>
          <SelectInput choices={muscles} label="Muscle" />
        </SimpleFormIterator>
      </ArrayInput>
      <FileInput
        validate={required()}
        source="video"
        label="Video"
        accept="video/*">
        <FileField source="src" title="title" />
      </FileInput>
      <ImageInput
        validate={required()}
        source="thumbnail"
        label="Thumbnail"
        accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
