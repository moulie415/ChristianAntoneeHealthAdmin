import {Typography} from '@material-ui/core';
import * as React from 'react';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  ShowButton,
  ReferenceField,
  ReferenceInput,
  TextInput,
  EditButton,
  DeleteButton,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  NumberInput,
  DateTimeInput,
} from 'react-admin';

export const PlansList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid>
      <ReferenceField label="User" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const PlansShow = props => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="User" source="user" reference="users">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
};

export const PlansCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput label="User" source="user" reference="users">
        <AutocompleteInput source="name" />
      </ReferenceInput>
      <ArrayInput source="workouts">
        <SimpleFormIterator>
          <TextInput source="name" label="Workout name" />
          <ArrayInput source="exercises" label="Exercises">
            <SimpleFormIterator>
              <ReferenceInput
                label="Exercise"
                source="exercise"
                reference="exercises">
                <AutocompleteInput source="name" />
              </ReferenceInput>
              <NumberInput source="sets" label="Sets" />
              <NumberInput source="reps" label="Reps" />
              <NumberInput source="duration" label="Duration (secs)" />
              <NumberInput source="resistanceScale" label="Resistance scale" />
              <NumberInput source="restTime" label="Rest time (secs)" />
              <TextInput source="notes" label="Additional notes" multiline />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="dates" label="Dates">
            <SimpleFormIterator>
              <DateInput source="date" label="Date" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="tests" label="Tests">
        <SimpleFormIterator>
          <ReferenceInput label="Test" reference="tests">
            <AutocompleteInput source="name" />
          </ReferenceInput>
          <ArrayInput source="dates" label="Dates">
            <SimpleFormIterator>
              <DateInput source="date" label="Date" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <Typography>Nutritional planning</Typography>
      <TextInput source="nutrition.preWorkout" label="Pre-workout" />
      <TextInput source="nutrition.postWorkout" label="Post-workout" />
      <TextInput source="nutrition.general" label="General recommendations" />
      <Typography>Sleep hygiene</Typography>
      <TextInput
        source="sleep.general"
        label="General recommendations"
        multiline
      />
      <ArrayInput source="education" label="Educational resources">
        <SimpleFormIterator>
          <ReferenceInput label="Article" reference="education">
            <AutocompleteInput source="title" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export const PlansEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceField label="User" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ArrayInput source="workouts">
        <SimpleFormIterator>
          <TextInput source="name" label="Workout name" />
          <ArrayInput source="exercises" label="Exercises">
            <SimpleFormIterator>
              <ReferenceInput
                label="Exercise"
                source="exercise"
                reference="exercises">
                <AutocompleteInput source="name" />
              </ReferenceInput>
              <NumberInput source="sets" label="Sets" />
              <NumberInput source="reps" label="Reps" />
              <NumberInput source="duration" label="Duration (secs)" />
              <NumberInput source="resistanceScale" label="Resistance scale" />
              <NumberInput source="restTime" label="Rest time (secs)" />
              <TextInput source="notes" label="Additional notes" multiline />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="dates" label="Dates">
            <SimpleFormIterator>
              <DateInput source="date" label="Date" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <ArrayInput source="tests" label="Tests">
        <SimpleFormIterator>
          <ReferenceInput label="Test" reference="tests">
            <AutocompleteInput source="name" />
          </ReferenceInput>
          <ArrayInput source="dates" label="Dates">
            <SimpleFormIterator>
              <DateInput source="date" label="Date" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
      <Typography>Nutritional planning</Typography>
      <TextInput source="nutrition.preWorkout" label="Pre-workout" multiline />
      <TextInput
        source="nutrition.postWorkout"
        label="Post-workout"
        multiline
      />
      <TextInput
        source="nutrition.general"
        label="General recommendations"
        multiline
      />
      <Typography>Sleep hygiene</Typography>
      <TextInput
        source="sleep.general"
        label="General recommendations"
        multiline
      />
      <ArrayInput source="education" label="Educational resources">
        <SimpleFormIterator>
          <ReferenceInput label="Article" reference="education">
            <AutocompleteInput source="title" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
