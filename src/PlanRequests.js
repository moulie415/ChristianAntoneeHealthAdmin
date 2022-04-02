import {Button} from '@material-ui/core';
import * as React from 'react';
import {doc, setDoc} from 'firebase/firestore';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  Filter,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
  EmailField,
  NumberField,
  ArrayField,
  SimpleFormIterator,
  SingleFieldList,
  ChipField,
} from 'react-admin';
import {db} from './App';
import {StringToLabelObject} from './helpers';

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

export const PlanRequestList = props => (
  <List {...props} filter={{planStatus: 2}} bulkActionButtons={false}>
    <Datagrid>
      <TextField source="name" />
      <EmailField source="email" />
      <ShowButton label="" />
      {/* <EditButton label="" />
      <DeleteButton label="" redirect={false} /> */}
    </Datagrid>
  </List>
);

export const PlanRequestShow = props => {
  const [loading, setLoading] = React.useState(false);
  const id = props.id;
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="name" />
        <EmailField source="email" />
        <DateField source="dob" label="Date of birth" />
        <TextField source="equipment" />
        <TextField source="experience" />
        <TextField source="gender" />
        <TextField source="goal" />
        <TextField source="unit" />
        <NumberField source="height" />
        <NumberField source="weight" />
        <TextField source="injuries" />
        <TextField source="lifestyle" />
        <TextField source="medications" />
        <TextField source="stressLevel" />
        <ArrayField source="nutrition">
          <SingleFieldList linkType={false}>
            <StringToLabelObject>
              <ChipField source="label" />
            </StringToLabelObject>
          </SingleFieldList>
        </ArrayField>
        <Button
          onClick={async () => {
            try {
              setLoading(true);
              await setDoc(doc(db, 'plans', id), {user: id});
              props.history.push(`/plans/${id}`);
              setLoading(false);
            } catch (e) {
              setLoading(false);
            }
          }}
          disabled={loading}
          variant="contained"
          color="primary"
          style={{marginTop: 10}}>
          Create plan
        </Button>
      </SimpleShowLayout>
    </Show>
  );
};

export const PlanRequestCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const PlanRequestEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
