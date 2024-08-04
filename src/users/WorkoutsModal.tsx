import {Box, CircularProgress, Fade, Modal} from '@mui/material';
import moment from 'moment';
import React from 'react';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import colors from '../colors';
import {SavedQuickRoutine, SavedWorkout} from '../types/Shared';

const WorkoutsModal: React.FC<{
  handleClose: () => void;
  open: boolean;
  selectedWorkout?: SavedWorkout | SavedQuickRoutine;
  isPending: boolean;
}> = ({open, handleClose, isPending, selectedWorkout}) => {
  if (!selectedWorkout) {
    return null;
  }

  const {heartRateSamples, calorieSamples, exerciseEvents, pauseEvents} =
    selectedWorkout;

  // Convert heart rate samples to seconds

  const heartRateSamplesInSeconds = heartRateSamples.reduce(
    (
      acc: {value: number; startDate: number; endDate: number}[],
      cur,
      index,
    ) => {
      const next = heartRateSamples[index + 1];
      const exerciseEvent = exerciseEvents?.find(event => {
        return (
          next &&
          event.time?.seconds > moment(cur.startDate).unix() &&
          event.time?.seconds < moment(next.startDate).unix()
        );
      });
      if (exerciseEvent) {
        return [
          ...acc,
          {
            ...cur,
            startDate: moment(cur.startDate).unix(),
            endDate: moment(cur.endDate).unix(),
          },
          {
            value: Math.round((cur.value + next.value) / 2),
            startDate: exerciseEvent.time.seconds,
            endDate: exerciseEvent.time.seconds,
          },
        ];
      }
      return [
        ...acc,
        {
          ...cur,
          startDate: moment(cur.startDate).unix(),
          endDate: moment(cur.endDate).unix(),
        },
      ];
    },
    [],
  );

  // Calculate cumulative calories
  let cumulativeCalories = 0;
  const calorieSamplesInSeconds = calorieSamples.map(sample => {
    cumulativeCalories += sample.value;
    return {
      ...sample,
      startDate: moment(sample.startDate).unix(),
      endDate: moment(sample.startDate).unix(),
      cumulativeValue: cumulativeCalories,
    };
  });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition>
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
          {isPending ? (
            <CircularProgress />
          ) : (
            <ResponsiveContainer height={720}>
              <LineChart margin={{bottom: 20}}>
                <YAxis
                  yAxisId="left"
                  label={{
                    value: 'Heart rate (bpm)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{
                    value: 'Calories Burnt',
                    angle: 90,
                    position: 'insideRight',
                  }}
                />

                <XAxis
                  minTickGap={120}
                  xAxisId="right"
                  hide
                  tickFormatter={unixTime =>
                    moment.unix(unixTime).format('HH:mm')
                  }
                  dataKey="startDate">
                  <Label value="Time" dy={20} />
                </XAxis>
                <XAxis
                  domain={[
                    selectedWorkout.startTime.seconds,
                    selectedWorkout.endTime.seconds,
                  ]}
                  type="number"
                  xAxisId="left"
                  minTickGap={120}
                  tickFormatter={unixTime =>
                    moment.unix(unixTime).format('HH:mm')
                  }
                  dataKey="startDate">
                  <Label value="Time" dy={20} />
                </XAxis>
                <Line
                  yAxisId="left"
                  xAxisId="left"
                  type="monotone"
                  dataKey="value"
                  stroke={colors.appRed}
                  dot={false}
                  data={heartRateSamplesInSeconds}
                />
                <Line
                  yAxisId="right"
                  xAxisId="right"
                  type="monotone"
                  dataKey="cumulativeValue"
                  stroke={colors.secondaryDark}
                  dot={false}
                  data={calorieSamplesInSeconds}
                />
                <Tooltip
                  formatter={(value, name) =>
                    name === 'cumulativeValue'
                      ? [`${Math.round(Number(value))} cal`, 'Calories Burnt']
                      : [`${Math.round(Number(value))} bpm`, 'Heart rate']
                  }
                  labelFormatter={unixTime =>
                    moment.unix(unixTime).format('HH:mm')
                  }
                />
                <CartesianGrid stroke="#ccc" />
                {exerciseEvents.map(event => {
                  return (
                    <ReferenceLine
                      xAxisId="left"
                      yAxisId="left"
                      alwaysShow
                      key={`exercise-${event.time.seconds}`}
                      x={event.time.seconds}
                      stroke="blue">
                      <Label value={event.value} position="insideBottomRight" />
                    </ReferenceLine>
                  );
                })}
                {/* {pauseEvents.map(event => {
                  const eventTimeInSeconds = moment(event.time.toDate()).unix(); // Convert Firestore timestamp to Unix time in seconds
                  return (
                    <ReferenceLine
                      key={`pause-${eventTimeInSeconds}`}
                      x={eventTimeInSeconds}
                      stroke="orange">
                      <Label
                        value={`Pause: ${event.paused ? 'Paused' : 'Resumed'}`}
                        position="insideBottomRight"
                      />
                    </ReferenceLine>
                  );
                })} */}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default WorkoutsModal;
