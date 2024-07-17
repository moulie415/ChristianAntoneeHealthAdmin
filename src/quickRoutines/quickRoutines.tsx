import {BooleanField} from 'ra-ui-materialui';
import {
  ArrayInput,
  BooleanInput,
  ChipField,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  List,
  ReferenceArrayField,
  ResourceProps,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleFormIterator,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  TextInput,
  required,
} from 'react-admin';
import MyAutoCompleteInput from '../common/MyAutoCompleteInput';
import DuplicateExercisesButton from '../exercises/DuplicateExercisesButton';

export const QuickRoutineList = (props: ResourceProps) => (
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
      <BooleanField source="premium" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const QuickRoutineShow = (props: ResourceProps) => (
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

export const QuickRoutineCreate = (props: ResourceProps) => {
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
            {id: 'none', name: 'No equipment'},
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
        {/* <ArrayInput label="Instructions" source="steps">
          <SimpleFormIterator>
            <TextInput label="Instruction" />
          </SimpleFormIterator>
        </ArrayInput> */}
        <ImageInput
          validate={required()}
          source="thumbnail"
          label="Thumbnail"
          accept={{'image/*': ['.jpeg', '.png']}}>
          <ImageField source="src" title="title" />
        </ImageInput>
        <FileInput
          source="preview"
          label="Preview video"
          accept={{'video/*': ['.mp4', '.mov', '.avi']}}>
          <FileField source="src" title="title" />
        </FileInput>
        <BooleanInput source="premium" />
      </SimpleForm>
    </Create>
  );
};

export const QuickRoutineEdit = (props: ResourceProps) => {
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
            {id: 'none', name: 'No equipment'},
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
        {/* <ArrayInput label="Instructions" source="steps">
          <SimpleFormIterator>
            <TextInput label="Instruction" multiline />
          </SimpleFormIterator>
        </ArrayInput> */}
        <ImageInput
          validate={required()}
          source="thumbnail"
          label="Thumbnail"
          accept={{'image/*': ['.jpeg', '.png']}}>
          <ImageField source="src" title="title" />
        </ImageInput>
        <FileInput
          source="preview"
          label="Preview video"
          accept={{'video/*': ['.mp4', '.mov', '.avi']}}>
          <FileField source="src" title="title" />
        </FileInput>
        <BooleanInput source="premium" />
      </SimpleForm>
    </Edit>
  );
};
