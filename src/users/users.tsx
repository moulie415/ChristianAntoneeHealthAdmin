import {Grid, Typography} from '@mui/material';
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
import {useEffect, useState} from 'react';
import {
  BooleanField,
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
  SimpleForm,
  SortButton,
  TextField,
  Toolbar,
  TopToolbar,
} from 'react-admin';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import PremiumField from '../common/PremiumField';
import CreatePlanButton from '../plans/CreatePlanButton';
import {Plan} from '../types/Shared';
import CurrentExerciseField from './CurrentExerciseField';
import DietaryPreferenceField from './DietaryPreferenceField';
import SleepField from './SleepField';
import StressField from './StressField';
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

const physicalReadinessQuestions = [
  {
    source: 'heartCondition',
    question:
      'Has your doctor ever said that you have a heart condition and that your should only do physical activity recommended by a doctor?',
  },
  {
    source: 'activityChestPain',
    question: 'Do your feel pain in your chest when you do physical activity?',
  },
  {
    source: 'chestPain',
    question:
      'In the past month, have you had chest pain when you were not doing physical activity?',
  },
  {
    source: 'loseBalanceConsciousness',
    question:
      'Do you lose your balance because of dizziness or do you ever lose consciousness?',
  },
  {
    source: 'boneProblems',
    question:
      'Do you have a bone or joint problem (for example, back, knee or hip) that could be made worse by a change in your physical activity?',
  },
  {
    source: 'drugPrescription',
    question:
      'Is your doctor currently prescribing drugs for your blood pressure or heart condition?',
  },
  {
    source: 'otherReason',
    question:
      'Do you know of any other reason why you should not do physical activity?',
  },

  {
    source: 'willInformDoctor',
    question:
      'If you answered YES to any of the above questions, will you inform your doctor that you intend to increase your physical activity levels?',
  },
];

export const UsersEdit = (props: ResourceProps) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" component="h2">
              Health & lifestyle questionnaire
            </Typography>
            <StressField />
            <SleepField />
            <DietaryPreferenceField />
            <CurrentExerciseField />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" component="h2">
              Physical activity readiness questionnaire
            </Typography>
            {physicalReadinessQuestions.map(({question, source}) => {
              return (
                <div>
                  <FormLabel style={{fontSize: 12}}>{question}</FormLabel>
                  <BooleanField source={source} />
                </div>
              );
            })}
          </Grid>
        </Grid>
        <CreatePlanButton />
      </SimpleForm>
      <WorkoutsTable />
    </Edit>
  );
};
