import Chip from '@mui/material/Chip';
import FormLabel from '@mui/material/FormLabel';
import * as React from 'react';
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
  DateField,
  EmailField,
  NumberField,
  ArrayField,
  SingleFieldList,
  ChipField,
  TopToolbar,
  ExportButton,
  FunctionField,
  ImageField,
  BooleanField,
  NumberInput,
  FilterButton,
  BooleanInput,
  SaveButton,
  Toolbar,
  SortButton,
} from 'react-admin';
import {db} from './App';
import {StringToLabelObject} from './helpers';
import CreatePlanButton from './CreatePlanButton';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  limitToLast,
} from 'firebase/firestore';
import {toast} from 'react-toastify';
import * as moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import PremiumField from './PremiumField';

const UserFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
  </Filter>
);

const getPlans = async uid => {
  const q = query(
    collection(db, 'plans'),
    where('user', '==', uid),
    orderBy('createdate'),
    limitToLast(50),
  );
  const plans = await getDocs(q);
  return plans.docs
    .map(d => {
      return {...d.data(), id: d.id};
    })
    .reverse();
};

const ListActions = () => (
  <TopToolbar>
    <FilterButton
      filters={[
        <BooleanInput label="Is client" source="client" defaultValue />,
      ]}
    />
    <SortButton fields={['name', 'email']} />
    <ExportButton />
  </TopToolbar>
);

export const UsersList = props => {
  return (
    <List {...props} perPage={50} actions={<ListActions />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="surname" />
        <EmailField source="email" />
        <CreatePlanButton />
        <BooleanField source="client" />
        <PremiumField source="premium" />
        <ShowButton label="" />
        <EditButton label="" />
        {/* <DeleteButton label="" redirect={false} /> */}
      </Datagrid>
    </List>
  );
};

export const UsersShow = props => {
  const [plans, setPlans] = React.useState([]);
  const {id} = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkPlans = async () => {
      try {
        const plans = await getPlans(id);
        setPlans(plans);
      } catch (e) {
        toast.error('Error fetching plans');
      }
    };
    checkPlans();
  }, [id]);
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ImageField source="avatar" title="avatar" />
        <TextField source="name" />
        <TextField source="surname" />
        <EmailField source="email" />
        <BooleanField source="client" />
        <PremiumField source="premium" />
        <FormLabel style={{fontSize: 12}}>Plans</FormLabel>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {plans.map(p => {
            return (
              <Chip
                key={p}
                style={{marginRight: 10}}
                onClick={() => navigate(`/plans/${p.id}`)}
                label={moment(p.createdate.toDate()).format('DD/MM/YYYY')}
              />
            );
          })}
        </div>
        <DateField source="dob" label="Date of birth" />
        {/* <TextField source="equipment" />
        <TextField source="experience" /> */}
        <TextField source="gender" />
        <TextField source="goal" />
        {/* <TextField source="unit" />
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
        </ArrayField> */}
        <CreatePlanButton />
      </SimpleShowLayout>
    </Show>
  );
};

export const UsersCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const UsersEdit = props => {
  const [plans, setPlans] = React.useState([]);
  const {id} = useParams();

  React.useEffect(() => {
    const checkPlans = async () => {
      try {
        const plans = await getPlans(id);
        setPlans(plans);
      } catch (e) {
        toast.error('Error fetching plans');
      }
    };
    checkPlans();
  }, [id]);

  const MyToolbar = () => (
    <Toolbar>
      <SaveButton label="Save" />
    </Toolbar>
  );
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<MyToolbar />}>
        <ImageField source="avatar" title="avatar" />
        <TextField source="name" />
        <TextField source="surname" />
        <EmailField source="email" />
        <BooleanInput source="client" />
        <BooleanField source="premium" />
        <FormLabel style={{fontSize: 12}}>Plans</FormLabel>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {plans.map(p => {
            return (
              <Chip
                key={p}
                style={{marginRight: 10}}
                onClick={() => navigate(`/plans/${p.id}`)}
                label={moment(p.createdate.toDate()).format('DD/MM/YYYY')}
              />
            );
          })}
        </div>
        <DateField source="dob" label="Date of birth" />
        <FormLabel style={{fontSize: 12, marginTop: 10}}>Plans</FormLabel>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 10,
          }}>
          {plans.map(p => {
            return (
              <Chip
                key={p}
                style={{marginRight: 10}}
                onClick={() => navigate(`/plans/${p.id}`)}
                label={moment(p.createdate.toDate()).format('DD/MM/YYYY')}
              />
            );
          })}
        </div>
        {/* <TextField source="equipment" />
        <TextField source="experience" />
        <TextField source="gender" /> */}
        <TextField label="goal" source="goal" />
        {/* <TextField source="unit" />
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
        </ArrayField> */}
        <CreatePlanButton />
      </SimpleForm>
    </Edit>
  );
};
