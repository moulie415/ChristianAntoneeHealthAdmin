import {Box, Grid, Typography} from '@mui/material';
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
  DateInput,
  Edit,
  Labeled,
  NumberInput,
  ResourceProps,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
} from 'react-admin';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import PremiumField from '../common/PremiumField';
import CreatePlanButton from '../plans/CreatePlanButton';
import {Plan} from '../types/Shared';
import Aside from './Aside';
import CurrentExerciseField from './CurrentExerciseField';
import DietaryPreferenceField from './DietaryPreferenceField';
import FullNameField from './FullNameField';
import GoalSummaries from './GoalSummaries';
import MetricChart from './MetricChart';
import SleepField from './SleepField';
import StressField from './StressField';
import WorkoutsTable from './WorkoutsTable';

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
    <Edit
      title={<FullNameField size="32" sx={{margin: '5px 0'}} />}
      aside={<Aside />}
      {...props}>
      <SimpleForm toolbar={<MyToolbar />}>
        <Grid container width={{xs: '100%', xl: 800}} spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="name"
                  disabled
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="surname"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="email"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <DateInput
                  label="Date of birth"
                  source="dob"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  source="weight"
                  label="Weight (kg)"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  source="height"
                  label="height (cm)"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="gender"
                  label="Sex"
                  disabled
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <NumberInput source="phone" fullWidth variant="outlined" />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="equipment"
                  label="Access to equipment"
                  disabled
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="experience"
                  label="Experience level"
                  fullWidth
                  disabled
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  disabled
                  fullWidth
                  label="Area of focus"
                  variant="outlined"
                  source="area"
                />
              </Box>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  disabled
                  fullWidth
                  variant="outlined"
                  source="goal"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  label="Workout number target"
                  source="targets.workouts.number"
                  fullWidth
                  variant="outlined"
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <SelectInput
                  choices={[
                    {id: 'beginner', name: 'beginner'},
                    {id: 'intermediate', name: 'intermediate'},
                    {id: 'advanced', name: 'advanced'},
                  ]}
                  label="Workout level target"
                  source="targets.workouts.level"
                  fullWidth
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  label="Calories target"
                  source="targets.calories"
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  label="Workout minutes target"
                  source="targets.mins"
                  fullWidth
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <Labeled>
                  <PremiumField source="premium" />
                </Labeled>
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <Labeled>
                  <BooleanField source="marketing" />
                </Labeled>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Plans
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              {plans.map(p => {
                return (
                  <Chip
                    key={p.id}
                    style={{marginBottom: 10}}
                    onClick={() => navigate(`/plans/${p.id}`)}
                    label={moment(p.createdate.toDate()).format('DD/MM/YYYY')}
                  />
                );
              })}
            </div>

            <CreatePlanButton />
            <GoalSummaries />
            <MetricChart
              title="Body fat percentage"
              source="bodyFatPercentage"
              suffix="%"
              minValue={0}
              maxValue={30}
            />
            <MetricChart
              title="Muscle mass"
              source="muscleMass"
              suffix="kg"
              minValue={0}
              maxValue={70}
            />
            <MetricChart
              title="Bone mass"
              source="boneMass"
              suffix="kg"
              minValue={0}
              maxValue={10}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6">
              Health & lifestyle questionnaire
            </Typography>
            <StressField />
            <SleepField />
            <DietaryPreferenceField />
            <CurrentExerciseField />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6">
              Physical activity readiness questionnaire
            </Typography>
            {physicalReadinessQuestions.map(({question, source}) => {
              return (
                <div key={question}>
                  <FormLabel style={{fontSize: 12}}>{question}</FormLabel>
                  <BooleanField source={source} />
                </div>
              );
            })}
          </Grid>
        </Grid>
      </SimpleForm>
      <WorkoutsTable />
    </Edit>
  );
};
