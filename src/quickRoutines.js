import {BooleanField, BooleanInput} from 'ra-ui-materialui';
import * as React from 'react';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  SimpleShowLayout,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  ImageField,
  ImageInput,
  EditButton,
  DeleteButton,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  AutocompleteInput,
  FileInput,
  FileField,
  required,
} from 'react-admin';
import MyAutoCompleteArrayInput from './MyAutoCompleteArrayInput';
import MyAutoCompleteInput from './MyAutoCompleteInput';
import DuplicateExercisesButton from './DuplicateExercisesButton';
import {useForm} from 'react-hook-form';

export const QuickRoutineList = props => (
  <List {...props} sort={{field: 'name', order: 'ASC'}}>
    <Datagrid>
      <TextField source="name" />
      <ReferenceArrayField
        label="Exercises"
        reference="exercises"
        source="exerciseIds">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const QuickRoutineShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceArrayField
        label="Exercises"
        reference="exercises"
        source="exerciseIds">
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <BooleanField source="premium" />
    </SimpleShowLayout>
  </Show>
);

export const QuickRoutineCreate = props => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" validate={required()} />
        <SelectInput
          source="area"
          validate={required()}
          choices={[
            {id: 'upper', name: 'Upper body'},
            {id: 'lower', name: 'Lower body'},
            {id: 'full', name: 'Full body'},
          ]}
        />
        <SelectInput
          source="equipment"
          validate={required()}
          choices={[
            {id: 'full', name: 'Full equipment'},
            {id: 'minimal', name: 'Minimal equipment'},
          ]}
        />
        <SelectInput
          source="duration"
          validate={required()}
          choices={[
            {id: 15, name: 'Under 15 mins'},
            {id: 30, name: 'Under 30 mins'},
            {id: 45, name: 'Under 45 mins'},
          ]}
        />

        <SelectInput
          source="level"
          validate={required()}
          choices={[
            {id: 'beginner', name: 'Beginner'},
            {id: 'intermediate', name: 'Intermediate'},
            {id: 'advanced', name: 'Advanced'},
          ]}
        />

        <ArrayInput
          validate={[required()]}
          source="exerciseIds"
          label="Exercises">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              label="Exercise"
              reference="exercises"
              validate={[required()]}
              style={{width: 350}}
              optionText="name"
            />
          </SimpleFormIterator>
        </ArrayInput>
        <DuplicateExercisesButton source="exerciseIds" />
        <ArrayInput label="Instructions" source="steps">
          <SimpleFormIterator>
            <TextInput label="Instruction" />
          </SimpleFormIterator>
        </ArrayInput>
        <ImageInput
          validate={required()}
          source="thumbnail"
          label="Thumbnail"
          accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <FileInput source="preview" label="Preview video" accept="video/*">
          <FileField source="src" title="title" />
        </FileInput>
        <BooleanInput source="premium" />
      </SimpleForm>
    </Create>
  );
};

export const QuickRoutineEdit = props => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput validate={required()} source="name" />
        <SelectInput
          source="area"
          validate={required()}
          choices={[
            {id: 'upper', name: 'Upper body'},
            {id: 'lower', name: 'Lower body'},
            {id: 'full', name: 'Full body'},
          ]}
        />
        <SelectInput
          source="equipment"
          validate={required()}
          choices={[
            {id: 'full', name: 'Full equipment'},
            {id: 'minimal', name: 'Minimal equipment'},
          ]}
        />
        <SelectInput
          source="duration"
          validate={required()}
          choices={[
            {id: 15, name: 'Under 15 mins'},
            {id: 30, name: 'Under 30 mins'},
            {id: 45, name: 'Under 45 mins'},
          ]}
        />
        <SelectInput
          source="level"
          validate={required()}
          choices={[
            {id: 'beginner', name: 'Beginner'},
            {id: 'intermediate', name: 'Intermediate'},
            {id: 'advanced', name: 'Advanced'},
          ]}
        />

        <ArrayInput
          validate={[required()]}
          source="exerciseIds"
          label="Exercises">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              label="Exercise"
              reference="exercises"
              validate={[required()]}
              style={{width: 350}}
              optionText="name"
            />
          </SimpleFormIterator>
        </ArrayInput>
        <DuplicateExercisesButton source="exerciseIds" />
        <ArrayInput label="Instructions" source="steps">
          <SimpleFormIterator>
            <TextInput label="Instruction" multiline />
          </SimpleFormIterator>
        </ArrayInput>
        <ImageInput
          validate={required()}
          source="thumbnail"
          label="Thumbnail"
          accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
        <FileInput source="preview" label="Preview video" accept="video/*">
          <FileField source="src" title="title" />
        </FileInput>
        <BooleanInput source="premium" />
      </SimpleForm>
    </Edit>
  );
};
