import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  collection,
  query,
  getDocs,
  orderBy,
  limitToLast,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useRecordContext} from 'react-admin';
import {toast} from 'react-toastify';
import {db} from './App';
import {
  Line,
  CartesianGrid,
  LineChart,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Label,
  Tooltip,
  ReferenceLine,
} from 'recharts';

function pad(num) {
  return ('0' + num).slice(-2);
}
function hhmmss(secs) {
  var minutes = Math.floor(secs / 60);
  secs = secs % 60;
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

const getWorkouts = async uid => {
  const q = query(
    collection(db, 'users', uid, 'savedWorkouts'),
    orderBy('createdate'),
    limitToLast(50),
  );
  const workouts = await getDocs(q);
  return workouts.docs
    .map(d => {
      return {...d.data(), id: d.id};
    })
    .reverse();
};

const getGarminSummary = async (userId, startTime) => {
  const q = query(
    collection(db, 'garminActivities'),
    where('userId', '==', userId),
    where(
      'startTimeInSeconds',
      '<',
      moment.unix(startTime).add(30, 'minutes').unix(),
    ),
    where(
      'startTimeInSeconds',
      '>',
      moment.unix(startTime).subtract(30, 'minutes').unix(),
    ),
  );
  const summaries = await getDocs(q);
  return summaries.docs?.[0]?.data();
};

const getGarminActivityDetails = async activityId => {
  const q = query(
    collection(db, 'garminActivityDetails'),
    where('activityId', '==', activityId),
  );

  const details = await getDocs(q);
  return details.docs?.[0]?.data();
};

const WorkoutsTable = () => {
  const record = useRecordContext();
  const [workouts, setWorkouts] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState();

  const [activityDetailsObj, setActivityDetailsObj] = useState({});

  useEffect(() => {
    const checkWorkouts = async () => {
      try {
        if (record && record.uid) {
          const workouts = await getWorkouts(record.uid);
          setWorkouts(workouts);
          if (record.garminUserId) {
            const newWorkouts = [];
            for (let i = 0; i < workouts.length; i++) {
              const workout = workouts[i];
              if (workout.startTime) {
                const summary = await getGarminSummary(
                  record.garminUserId,
                  workout.startTime.seconds,
                );

                if (summary) {
                  newWorkouts.push({
                    ...workout,
                    calories: `${summary.activeKilocalories} (Garmin)`,
                    averageHeartRate: `${summary.averageHeartRateInBeatsPerMinute} (Garmin)`,
                    maxHeartRate: `${summary.maxHeartRateInBeatsPerMinute}  (Garmin)`,
                    activityId: summary.activityId,
                    garminSummary: true,
                  });
                  continue;
                }
              }
              newWorkouts.push(workout);
            }
            setWorkouts(newWorkouts);
          }
        }
      } catch (e) {
        toast.error('Error fetching workouts');
      }
    };

    checkWorkouts();
  }, [record]);

  const getActivityDetails = async activityId => {
    try {
      setSelectedActivity(activityId);
      if (activityDetailsObj[activityId]) return;
      setLoadingDetails(true);
      const details = await getGarminActivityDetails(activityId);
      setActivityDetailsObj({...activityDetailsObj, [activityId]: details});
    } catch (e) {
      console.log(e);
      toast.error('Error fetching details');
    }
    setLoadingDetails(false);
  };

  const data = activityDetailsObj[selectedActivity];
  console.log(selectedWorkout?.exerciseEvents);
  return (
    <>
      <Typography style={{marginLeft: 20, marginTop: 20}}>
        Completed workouts
      </Typography>
      <TableContainer style={{}} component={Paper}>
        <Table sx={{minWidth: 700}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Workout</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>RPE</TableCell>
              <TableCell>Average heart rate (bpm)</TableCell>
              <TableCell>Max heart rate (bpm)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts?.map(workout => {
              return (
                <TableRow key={workout.id}>
                  <TableCell>
                    {moment
                      .unix(
                        workout.startTime
                          ? workout.startTime.seconds
                          : workout.createdate.seconds,
                      )
                      .format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>{workout?.planWorkout?.name}</TableCell>
                  <TableCell>{hhmmss(workout.seconds)}</TableCell>
                  <TableCell>{workout.calories}</TableCell>
                  <TableCell>{`${workout.difficulty}/10`}</TableCell>
                  <TableCell>
                    {!!workout.averageHeartRate ? workout.averageHeartRate : ''}
                  </TableCell>
                  <TableCell>
                    {!!workout.maxHeartRate ? workout.maxHeartRate : ''}
                  </TableCell>
                  {workout.garminSummary && (
                    <TableCell>
                      <Button
                        onClick={async () => {
                          handleOpen();
                          getActivityDetails(workout.activityId);
                          setSelectedWorkout(workout);
                        }}
                        variant="contained"
                        color="primary"
                        style={{}}>
                        View breakdown
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{backdrop: Backdrop}}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 1280,
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 5,
              p: 4,
            }}>
            {loadingDetails && !data?.samples ? (
              <CircularProgress />
            ) : (
              <ResponsiveContainer height={720}>
                <LineChart margin={{bottom: 20}} data={data?.samples}>
                  <YAxis>
                    <Label value="Heart rate (bpm)" angle={270} dx={-20} />
                  </YAxis>
                  <XAxis
                    minTickGap={120}
                    tickFormatter={unixTime => {
                      return moment.unix(unixTime).format('HH:mm');
                    }}
                    dataKey="startTimeInSeconds">
                    <Label value="Time" dy={20} />
                  </XAxis>
                  <Line
                    type="monotone"
                    dataKey="heartRate"
                    stroke="red"
                    dot={false}
                  />
                  {selectedWorkout?.exerciseEvents?.map(event => {
                    return (
                      <ReferenceLine x={event.time?.seconds} stroke="blue" />
                    );
                  })}
                  <Tooltip
                    formatter={value => [`${value} bpm`, 'Heart rate']}
                    labelFormatter={label => {
                      return moment.unix(label).format('HH:mm');
                    }}
                  />
                  <CartesianGrid stroke="#ccc" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default WorkoutsTable;
