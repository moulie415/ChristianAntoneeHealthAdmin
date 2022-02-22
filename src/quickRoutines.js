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
} from 'react-admin';

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

export const QuickRoutineCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <SelectInput
        source="area"
        choices={[
          {id: 'upper', name: 'Upper body'},
          {id: 'lower', name: 'Lower body'},
          {id: 'full', name: 'Full body'},
          {id: 'core', name: 'Abs and core'},
        ]}
      />
      <SelectInput
        source="focus"
        choices={[
          {
            id: 'strength',
            name: 'Improve strength',
          },
          {
            id: 'fitness',
            name: 'Improve fitness',
          },
        ]}
      />
      <SelectInput
        source="equipment"
        choices={[
          {id: 'full', name: 'Full equipment'},
          {id: 'minimal', name: 'Minimal equipment'},
        ]}
      />
      <SelectInput
        source="duration"
        choices={[
          {id: 15, name: 'Under 15 mins'},
          {id: 30, name: 'Under 30 mins'},
          {id: 45, name: 'Under 45 mins'},
        ]}
      />

      <SelectInput
        source="level"
        choices={[
          {id: 'beginner', name: 'Beginner'},
          {id: 'intermediate', name: 'Intermediate'},
          {id: 'advanced', name: 'Advanced'},
        ]}
      />

      <ReferenceArrayInput
        source="exerciseIds"
        reference="exercises"
        filterToQuery={searchText => ({name: searchText})}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ArrayInput source="instructions">
        <SimpleFormIterator>
          <TextInput label="instruction" />
        </SimpleFormIterator>
      </ArrayInput>
      <ImageInput source="thumbnail" label="Thumbnail" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <BooleanInput source="premium" />
    </SimpleForm>
  </Create>
);

export const QuickRoutineEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <SelectInput
        source="area"
        choices={[
          {id: 'upper', name: 'Upper body'},
          {id: 'lower', name: 'Lower body'},
          {id: 'full', name: 'Full body'},
          {id: 'core', name: 'Abs and core'},
        ]}
      />
      <SelectInput
        source="focus"
        choices={[
          {
            id: 'strength',
            name: 'Improve strength',
          },
          {
            id: 'fitness',
            name: 'Improve fitness',
          },
        ]}
      />
      <SelectInput
        source="equipment"
        choices={[
          {id: 'full', name: 'Full equipment'},
          {id: 'minimal', name: 'Minimal equipment'},
        ]}
      />
      <SelectInput
        source="duration"
        choices={[
          {id: 15, name: 'Under 15 mins'},
          {id: 30, name: 'Under 30 mins'},
          {id: 45, name: 'Under 45 mins'},
        ]}
      />
      <SelectInput
        source="level"
        choices={[
          {id: 'beginner', name: 'Beginner'},
          {id: 'intermediate', name: 'Intermediate'},
          {id: 'advanced', name: 'Advanced'},
        ]}
      />

      <ReferenceArrayInput
        source="exerciseIds"
        reference="exercises"
        filterToQuery={searchText => ({name: searchText})}>
        <AutocompleteArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ArrayInput source="instructions">
        <SimpleFormIterator>
          <TextInput label="instruction" />
        </SimpleFormIterator>
      </ArrayInput>
      <ImageInput source="thumbnail" label="Thumbnail" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
