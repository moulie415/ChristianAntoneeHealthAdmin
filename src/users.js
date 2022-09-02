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
  DeleteButton,
  DateField,
  EmailField,
  NumberField,
  ArrayField,
  SimpleFormIterator,
  SingleFieldList,
  ChipField,
  TopToolbar,
  SortButton,
  ExportButton,
  FunctionField,
  ReferenceArrayField,
  ReferenceField,
  ImageField,
  BooleanField,
} from 'react-admin';
import {db} from './App';
import {StringToLabelObject} from './helpers';
import PlanStatusField from './PlanStatusField';
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

const getPlanStatusString = record => {
  if (record.planStatus === 3) {
    return 'Complete';
  }
  if (record.planStatus === 2) {
    return 'Pending';
  }
  return 'Uninitialized';
};

const ListActions = () => (
  <TopToolbar>
    <SortButton fields={['planStatus', 'name', 'email']} />
    <ExportButton />
  </TopToolbar>
);

export const UsersList = props => {
  const [loading, setLoading] = React.useState(false);
  return (
    <List
      {...props}
      bulkActionButtons={false}
      perPage={50}
      actions={<ListActions />}>
      <Datagrid>
        <TextField source="name" />
        <EmailField source="email" />
        <PlanStatusField source="planStatus" />
        <CreatePlanButton loading={loading} setLoading={setLoading} />
        <ShowButton label="" />
        <EditButton label="" />
        {/* <DeleteButton label="" redirect={false} /> */}
      </Datagrid>
    </List>
  );
};

export const UsersShow = props => {
  const [loading, setLoading] = React.useState(false);
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
        <EmailField source="email" />
        <BooleanField source="premium" />
        <BooleanField source="usedFreePlan" />
        <FunctionField label="Plan status" render={getPlanStatusString} />
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
        <CreatePlanButton loading={loading} setLoading={setLoading} />
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
  const [loading, setLoading] = React.useState(false);
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
  return (
    <Edit {...props}>
      <SimpleForm toolbar={null}>
        <ImageField source="avatar" title="avatar" />
        <TextField source="name" />
        <EmailField source="email" />
        <BooleanField source="premium" />
        <BooleanField source="usedFreePlan" />
        <FunctionField label="Plan status" render={getPlanStatusString} />
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
        <CreatePlanButton loading={loading} setLoading={setLoading} />
      </SimpleForm>
    </Edit>
  );
};
