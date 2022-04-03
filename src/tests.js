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
      <TextField source="summary" multiline />
      <TextField source="how" multiline />
      <BooleanField source="premium" />
      <TextField source="metric" />
      <TextField source="source" />
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
      <TextInput source="summary" multiline />
      <ArrayInput source="how">
        <SimpleFormIterator>
          <TextInput label="step" />
        </SimpleFormIterator>
      </ArrayInput>
      <BooleanInput source="premium" />
      <TextInput source="metric" />
      <Table gender="mens" />
      <Table gender="womens" />
      <PercentileTable />
      <TextInput source="source" />
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
      <TextInput source="summary" multiline />
      <ArrayInput source="how">
        <SimpleFormIterator>
          <TextInput label="step" />
        </SimpleFormIterator>
      </ArrayInput>
      <BooleanInput source="premium" />
      <TextInput source="metric" />
      <Table gender="mens" />
      <Table gender="womens" />
      <PercentileTable />
      <TextInput source="source" />
    </SimpleForm>
  </Edit>
);
