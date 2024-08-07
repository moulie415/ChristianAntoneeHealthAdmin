import {BooleanField, BooleanInput} from 'ra-ui-materialui';
import {
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
  NumberInput,
  ResourceProps,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  required,
} from 'react-admin';
import PercentileTable from './PercentileTable';
import Table from './Table';

// const TestsFilter = props => (
//   <Filter {...props}>
//     <TextInput label="Search" source="name" alwaysOn />
//   </Filter>
// );

export const TestList = (props: ResourceProps) => (
  <List {...props} sort={{field: 'name', order: 'ASC'}}>
    <Datagrid>
      <TextField source="name" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const TestShow = (props: ResourceProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="summary" style={{width: 350}} />
      <BooleanField source="premium" />
      <TextField source="metric" />
      <TextField source="source" />
      <BooleanField source="disabled" />
    </SimpleShowLayout>
  </Show>
);

export const TestCreate = (props: ResourceProps) => (
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
        accept={{'video/*': ['.mp4', '.mov', '.avi']}}
        defaultValue={null}>
        <FileField source="src" title="title" />
      </FileInput>
      <ImageInput
        source="thumbnail"
        validate={required()}
        label="Thumbnail"
        accept={{'image/*': ['.jpeg', '.png']}}>
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

export const TestEdit = (props: ResourceProps) => (
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
        accept={{'video/*': ['.mp4', '.mov', '.avi']}}
        defaultValue={null}>
        <FileField source="src" title="title" />
      </FileInput>
      <ImageInput
        source="thumbnail"
        validate={required()}
        label="Thumbnail"
        accept={{'image/*': ['.jpeg', '.png']}}>
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
