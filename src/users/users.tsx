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
import moment from 'moment';
import * as React from 'react';
import {
  BooleanField,
  Create,
  Datagrid,
  DateField,
  EmailField,
  ExportButton,
  FilterButton,
  ImageField,
  List,
  ResourceProps,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  SortButton,
  TextField,
  TextInput,
  TopToolbar,
} from 'react-admin';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import PremiumField from '../common/PremiumField';
import CreatePlanButton from '../plans/CreatePlanButton';
import {Plan} from '../types/Shared';
import WorkoutsTable from './WorkoutsTable';

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
    <List {...props} perPage={200} actions={<ListActions />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="name" />
        <TextField source="surname" />
        <EmailField source="email" />
        <BooleanField source="marketing" />
        <CreatePlanButton />
        <PremiumField source="premium" />
        <ShowButton label="" />
        {/* <EditButton label="" /> */}
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
        <BooleanField source="marketing" />
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
