import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Chip from '@mui/material/Chip';
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
  BooleanInput,
  DateInput,
  Edit,
  Labeled,
  NumberInput,
  ResourceProps,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  useRecordContext,
} from 'react-admin';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import PremiumField from '../common/PremiumField';
import {getBMIItems} from '../helpers/getBMI';
import {getBMRItems} from '../helpers/getBMR';
import useGetSamples from '../hooks/UseGetSamples';
import CreatePlanButton from '../plans/CreatePlanButton';
import {Goal, Plan, Profile, Sample} from '../types/Shared';
import Aside from './Aside';
import CurrentExerciseField from './CurrentExerciseField';
import DietaryPreferenceField from './DietaryPreferenceField';
import FitnessRatingField from './FitnessRatingField';
import FullNameField from './FullNameField';
import GoalSummaries from './GoalSummaries';
import MetricChart from './MetricChart';
import PremiumModal from './PremiumModal';
import SleepField from './SleepField';
import StressField from './StressField';
import UserNotes from './UserNotes';
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

const MyForm = (props: ResourceProps) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const {id} = useParams();
  const navigate = useNavigate();

  const record = useRecordContext<Profile>(props);

  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [grant, setGrant] = useState(false);

  const targetsEditable = record?.goal === Goal.OTHER;

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
    <Toolbar sx={{position: 'sticky', bottom: 0, zIndex: 2}}>
      <SaveButton label="Save" />
    </Toolbar>
  );

  const weightSamples = useGetSamples('weight', id || '');
  const heightSamples = useGetSamples('height', id || '');
  const bodyFatPercentageSamples = useGetSamples('bodyFatPercentage', id || '');
  const muscleMassSamples = useGetSamples('muscleMass', id || '');
  const boneMassSamples = useGetSamples('boneMass', id || '');
  const visceralFatSamples = useGetSamples('visceralFat', id || '');
  const metabolicAgeSamples = useGetSamples('metabolicAge', id || '');

  const bmiItems = getBMIItems(
    weightSamples,
    heightSamples,
    record?.weight,
    record?.height,
  );

  const bmrItems = getBMRItems(
    weightSamples,
    heightSamples,
    record?.weight,
    record?.height,
    record?.gender,
    record?.dob,
  );

  const charts: {
    title: string;
    source?: string;
    suffix?: string;
    minValue: number;
    maxValue: number;
    updateCurrent?: boolean;
    samples: Sample[];
    entryDisabled?: boolean;
  }[] = [
    {
      title: 'Weight',
      source: 'weight',
      suffix: 'kg',
      minValue: 0,
      maxValue: 150,
      updateCurrent: true,
      samples: weightSamples,
    },
    {
      title: 'Height',
      source: 'height',
      suffix: 'cm',
      minValue: 0,
      maxValue: 300,
      updateCurrent: true,
      samples: heightSamples,
    },
    {
      title: 'BMI',
      suffix: '',
      minValue: 0,
      maxValue: 40,
      samples: bmiItems,
      entryDisabled: true,
    },
    {
      title: 'BMR',
      suffix: '',
      minValue: 1000,
      maxValue: 2000,
      samples: bmrItems,
      entryDisabled: true,
    },
    {
      title: 'Body fat percentage',
      source: 'bodyFatPercentage',
      suffix: '%',
      minValue: 0,
      maxValue: 30,
      samples: bodyFatPercentageSamples,
    },
    {
      title: 'Muscle mass',
      source: 'muscleMass',
      suffix: 'kg',
      minValue: 0,
      maxValue: 70,
      samples: muscleMassSamples,
    },
    {
      title: 'Bone mass',
      source: 'boneMass',
      suffix: 'kg',
      minValue: 0,
      maxValue: 10,
      samples: boneMassSamples,
    },
    {
      title: 'Visceral Fat',
      source: 'visceralFat',
      suffix: '',
      minValue: 0,
      maxValue: 60,
      samples: visceralFatSamples,
    },
    {
      title: 'Metabolic Age',
      source: 'metabolicAge',
      suffix: '',
      minValue: 1,
      maxValue: 100,
      samples: metabolicAgeSamples,
    },
  ];
  return (
    <>
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
                  readOnly
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="surname"
                  fullWidth
                  readOnly
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="email"
                  fullWidth
                  readOnly
                  variant="outlined"
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <DateInput
                  label="Date of birth"
                  source="dob"
                  fullWidth
                  readOnly
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
                  readOnly
                  variant="outlined"
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  source="height"
                  label="height (cm)"
                  fullWidth
                  readOnly
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="gender"
                  label="Sex"
                  readOnly
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  source="phone"
                  fullWidth
                  variant="outlined"
                  defaultValue=""
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="equipment"
                  label="Access to equipment"
                  readOnly
                  variant="outlined"
                  fullWidth
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  source="experience"
                  label="Experience level"
                  fullWidth
                  readOnly
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  readOnly
                  fullWidth
                  label="Area of focus"
                  variant="outlined"
                  source="area"
                />
              </Box>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  readOnly
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
                  readOnly={!targetsEditable}
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
                  readOnly={!targetsEditable}
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
                  readOnly={!targetsEditable}
                />
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  label="Workout minutes target"
                  source="targets.mins"
                  fullWidth
                  variant="outlined"
                  readOnly={!targetsEditable}
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <TextInput
                  readOnly
                  fullWidth
                  label="Auth provider"
                  variant="outlined"
                  source="providerId"
                  defaultValue=""
                />
              </Box>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <NumberInput
                  label="Exercise prepare time"
                  source="prepTime"
                  fullWidth
                  readOnly
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <BooleanInput
                source="freeBiometrics"
                label="All biometrics free regardless of premium"
              />
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <UserNotes />
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
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                <Button
                  style={{marginBottom: 10}}
                  variant="contained"
                  onClick={() => {
                    setGrant(true);
                    setPremiumModalOpen(true);
                  }}>
                  Grant premium
                </Button>
              </Box>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <Box flex={1} mr={{xs: 0, sm: '0.5em'}}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setGrant(false);
                      setPremiumModalOpen(true);
                    }}>
                    Revoke premium
                  </Button>
                </Box>
              </Box>
            </Box>
            <WorkoutsTable />

            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <Typography variant="h6" style={{margin: '20px 0 10px'}}>
                  Health & lifestyle questionnaire
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell>Answer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StressField />
                      <SleepField />
                      <DietaryPreferenceField />
                      <CurrentExerciseField />
                      <FitnessRatingField />
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            <Box display={{xs: 'block', sm: 'flex'}}>
              <Box flex={1} ml={{xs: 0, sm: '0.5em'}}>
                <Typography variant="h6" style={{margin: '20px 0 10px'}}>
                  Physical activity readiness questionnaire
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell>Answer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {physicalReadinessQuestions.map(({question, source}) => {
                        return (
                          <TableRow key={question}>
                            <TableCell>{question}</TableCell>
                            <TableCell>
                              <BooleanField source={source} />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {record?.otherReasonDescription && (
                        <TableRow>
                          <TableCell>Other reason description</TableCell>
                          <TableCell>
                            <TextField source="otherReasonDescription" />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
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
            {charts.map(
              ({
                title,
                source,
                suffix,
                minValue,
                maxValue,
                updateCurrent,
                samples,
                entryDisabled,
              }) => {
                return (
                  <MetricChart
                    key={title}
                    title={title}
                    source={source}
                    suffix={suffix}
                    minValue={minValue}
                    maxValue={maxValue}
                    updateCurrent={updateCurrent}
                    samples={samples}
                    entryDisabled={entryDisabled}
                  />
                );
              },
            )}
          </Grid>
        </Grid>
      </SimpleForm>
      <PremiumModal
        uid={id || ''}
        open={premiumModalOpen}
        handleClose={() => setPremiumModalOpen(false)}
        grant={grant}
      />
    </>
  );
};

export const UsersEdit = (props: ResourceProps) => {
  return (
    <Edit
      title={<FullNameField size="32" sx={{margin: '5px 0'}} />}
      aside={<Aside />}
      {...props}
      sx={{'& .MuiPaper-root': {overflow: 'visible'}}}>
      <MyForm {...props} />
    </Edit>
  );
};
