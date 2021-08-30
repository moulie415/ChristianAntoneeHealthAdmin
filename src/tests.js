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
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin';

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
    </SimpleShowLayout>
  </Show>
);

export const TestCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="summary" options={{multiline: true}} />
      <ArrayInput source="how">
        <SimpleFormIterator>
          <TextInput label="step" />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="why" options={{multiline: true}} />
      <TextInput source="improve" options={{multiline: true}} />
      <ImageInput source="men" label="Mens scores" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput source="women" label="Womens scores" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export const TestEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="summary" options={{multiline: true}} />
      <ArrayInput source="how">
        <SimpleFormIterator>
          <TextInput label="step" />
        </SimpleFormIterator>
      </ArrayInput>
      <TextInput source="why" options={{multiline: true}} />
      <TextInput source="improve" options={{multiline: true}} />
      <ImageInput source="men" label="Mens scores" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ImageInput source="women" label="Womens scores" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Edit>
);
