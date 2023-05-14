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
  EditButton,
  DeleteButton,
  ArrayInput,
  SimpleFormIterator,
  NumberInput,
  FileInput,
  ImageInput,
  FileField,
  ImageField,
  required,
} from 'react-admin';
import PercentileTable from './PercentileTable';
import Table from './Table';

// const TestsFilter = props => (
//   <Filter {...props}>
//     <TextInput label="Search" source="name" alwaysOn />
//   </Filter>
// );

export const TestList = props => (
  <List {...props} sort={{field: 'name', order: 'ASC'}}>
    <Datagrid>
      <TextField source="name" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const TestShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="summary" style={{width: 350}} multiline />
      <BooleanField source="premium" />
      <TextField source="metric" />
      <TextField source="source" />
      <BooleanField source="disabled" />
    </SimpleShowLayout>
  </Show>
);

export const TestCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <SelectInput
        source="type"
        validate={required()}
        choices={[
          {id: 'countdown', name: 'countdown'},
          {id: 'countup', name: 'countup'},
          {id: 'untimed', name: 'untimed'},
        ]}
      />
      <NumberInput source="time" label="Time in seconds" />
      <TextInput source="summary" style={{width: 350}} multiline />
      <SelectInput
        source="formula"
        choices={[{id: 'vo2', name: 'VO2'}]}
        defaultValue=""
      />
      <FileInput
        source="video"
        label="Video"
        accept="video/*"
        defaultValue={null}>
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
      <TextInput source="metric" defaultValue="" />
      <Table gender="mens" />
      <Table gender="womens" />
      <PercentileTable />
      <TextInput source="source" defaultValue="" />
      <BooleanInput source="disabled" />
    </SimpleForm>
  </Create>
);

export const TestEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <SelectInput
        source="type"
        validate={required()}
        choices={[
          {id: 'countdown', name: 'countdown'},
          {id: 'countup', name: 'countup'},
          {id: 'untimed', name: 'untimed'},
        ]}
      />
      <NumberInput source="time" label="Time in seconds" />
      <TextInput source="summary" style={{width: 350}} multiline />
      <SelectInput
        source="formula"
        choices={[{id: 'vo2', name: 'VO2'}]}
        defaultValue=""
      />
      <FileInput
        source="video"
        label="Video"
        accept="video/*"
        defaultValue={null}>
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
      <TextInput source="metric" defaultValue="" />
      <Table gender="mens" />
      <Table gender="womens" />
      <PercentileTable />
      <TextInput source="source" defaultValue="" />
      <BooleanInput source="disabled" />
    </SimpleForm>
  </Edit>
);
