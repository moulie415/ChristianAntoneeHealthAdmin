import {Grid} from '@mui/material';
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
  Edit,
  EditButton,
  EmailField,
  ExportButton,
  FilterButton,
  ImageField,
  Labeled,
  List,
  NumberInput,
  ResourceProps,
  SaveButton,
  SelectInput,
  Show,
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
        {/* <ShowButton label="" /> */}
        <EditButton label="" />
        {/* <DeleteButton label="" redirect={false} /> */}
      </Datagrid>
    </List>
  );
};

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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <ImageField source="avatar" title="avatar" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <TextField source="name" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <TextField source="surname" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <EmailField source="email" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <PremiumField source="premium" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <BooleanField source="marketing" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <DateField source="dob" label="Date of birth" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <TextField source="equipment" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <TextField source="experience" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <TextField source="gender" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Labeled>
              <TextField source="goal" />
            </Labeled>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NumberInput
              label="Workout number target"
              source="targets.workouts.number"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SelectInput
              choices={[
                {id: 'beginner', name: 'beginner'},
                {id: 'intermediate', name: 'intermediate'},
                {id: 'advanced', name: 'advanced'},
              ]}
              label="Workout level target"
              source="targets.workouts.level"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NumberInput label="Calories target" source="targets.calories" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <NumberInput label="Workout minutes target" source="targets.mins" />
          </Grid>
        </Grid>
        <CreatePlanButton />
      </SimpleForm>
      <WorkoutsTable />
    </Edit>
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
