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
import moment from 'moment';
import React from 'react';

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

const WorkoutsTable = ({workouts}) => {
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
              <TableCell>Average heart rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts?.map(workout => (
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
                <TableCell>{workout?.planWorkout.name}</TableCell>
                <TableCell>{hhmmss(workout.seconds)}</TableCell>
                <TableCell>{workout.calories}</TableCell>
                <TableCell>{`${workout.difficulty}/10`}</TableCell>
                <TableCell>{workout.averageHeartRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WorkoutsTable;
