import Chip from '@mui/material/Chip';
import FormLabel from '@mui/material/FormLabel';
import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import * as moment from 'moment';
import * as React from 'react';
import {
  BooleanField,
  Create,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  EmailField,
  ExportButton,
  FilterButton,
  ImageField,
  List,
  ResourceProps,
  SaveButton,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  SortButton,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
} from 'react-admin';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import CreatePlanButton from '../plans/CreatePlanButton';
import PremiumField from '../common/PremiumField';
import WorkoutsTable from './WorkoutsTable';
import {Plan} from '../types/Shared';

// const UserFilter = props => (
//   <Filter {...props}>
//     <TextInput label="Search" source="title" alwaysOn />
//   </Filter>
// );

const getPlans = async (uid: string): Promise<Plan[]> => {
  const q = query(
    collection(db, 'plans'),
    where('user', '==', uid),
    orderBy('createdate'),
    limitToLast(50),
  );
  const plans = await getDocs(q);
  return plans.docs
    .map(d => {
      return {...d.data(), id: d.id} as Plan;
    })
    .reverse();
};

const ListActions = () => (
  <TopToolbar>
    <FilterButton
      filters={
        [
          // <BooleanInput label="Is client" source="client" defaultValue />,
        ]
      }
    />
    <SortButton fields={['name', 'email']} />
    <ExportButton />
  </TopToolbar>
);

export const UsersList = (props: ResourceProps) => {
  return (
    <List {...props} perPage={50} actions={<ListActions />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="surname" />
        <EmailField source="email" />
        <CreatePlanButton />
        <PremiumField source="premium" />
        <ShowButton label="" />
        <EditButton label="" />
        {/* <DeleteButton label="" redirect={false} /> */}
      </Datagrid>
    </List>
  );
};

export const UsersShow = (props: ResourceProps) => {
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const {id} = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const checkPlans = async () => {
      try {
        const plans = await getPlans(id || '');
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
        <PremiumField source="premium" />
        <FormLabel style={{fontSize: 12}}>Plans</FormLabel>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {plans.map(p => {
            return (
              <Chip
                key={p.id}
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

        <CreatePlanButton />
      </SimpleShowLayout>
      <WorkoutsTable />
    </Show>
  );
};

export const UsersCreate = (props: ResourceProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export const UsersEdit = (props: ResourceProps) => {
  const [plans, setPlans] = React.useState<Plan[]>([]);
  const {id} = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    const checkPlans = async () => {
      try {
        const plans = await getPlans(id || '');
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
        <BooleanField source="premium" />
        <FormLabel style={{fontSize: 12}}>Plans</FormLabel>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          {plans.map(p => {
            return (
              <Chip
                key={p.id}
                style={{marginRight: 10}}
                onClick={() => navigate(`/plans/${p.id}`)}
                label={moment(p.createdate.toDate()).format('DD/MM/YYYY')}
              />
            );
          })}
        </div>
        <FormLabel style={{fontSize: 12}}>Date of birth</FormLabel>
        <DateField source="dob" label="Date of birth" />

        {/* <TextField source="equipment" />
        <TextField source="experience" />
        <TextField source="gender" /> */}
        <TextField label="goal" source="goal" />

        <CreatePlanButton />
      </SimpleForm>
      <WorkoutsTable />
    </Edit>
  );
};
