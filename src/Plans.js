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
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput source="dates" label="Dates">
            <SimpleFormIterator>
              <DateInput source="date" label="Date" />
            </SimpleFormIterator>
          </ArrayInput>
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);
