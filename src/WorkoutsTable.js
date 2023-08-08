import {
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

const WorkoutsTable = () => {
  const record = useRecordContext();
  const [workouts, setWorkouts] = useState([]);

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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WorkoutsTable;
