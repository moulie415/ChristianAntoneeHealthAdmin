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
  ImageField,
  ImageInput,
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
} from 'react-admin';
import Table from './Table';

const TestsFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
  </Filter>
);

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
      <TextField source="summary" options={{multiline: true}} />
      <TextField source="how" options={{multiline: true}} />
      <TextField source="why" options={{multiline: true}} />
      <TextField source="improve" options={{multiline: true}} />
      <TextField source="metric" />
    </SimpleShowLayout>
  </Show>
);

export const TestCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <SelectInput
        source="type"
        choices={[
          {id: 'countdown', name: 'countdown'},
          {id: 'countup', name: 'countup'},
          {id: 'untimed', name: 'untimed'},
        ]}
      />
      <NumberInput source="time" label="Time in seconds" />
      <TextInput source="summary" options={{multiline: true}} />
      <ArrayInput source="how">
        <SimpleFormIterator>
          <TextInput label="step" />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="why" options={{multiline: true}} />
      <TextInput source="improve" options={{multiline: true}} />
      <TextInput source="metric" />
      <Table gender="mens" />
      <Table gender="womens" />
    </SimpleForm>
  </Create>
);

export const TestEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <SelectInput
        source="type"
        choices={[
          {id: 'countdown', name: 'countdown'},
          {id: 'countup', name: 'countup'},
          {id: 'untimed', name: 'untimed'},
        ]}
      />
      <NumberInput source="time" label="Time in seconds" />
      <TextInput source="summary" options={{multiline: true}} />
      <ArrayInput source="how">
        <SimpleFormIterator>
          <TextInput label="step" />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="why" options={{multiline: true}} />
      <TextInput source="improve" options={{multiline: true}} />
      <TextInput source="metric" />
      <Table gender="mens" />
      <Table gender="womens" />
    </SimpleForm>
  </Edit>
);
