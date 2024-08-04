import HeartIcon from '@mui/icons-material/Favorite';
import FlameIcon from '@mui/icons-material/LocalFireDepartment';
import DurationIcon from '@mui/icons-material/Timer';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import {CircularProgress, Typography} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {doc, getDoc} from 'firebase/firestore';
import moment from 'moment';
import {useParams, useSearchParams} from 'react-router-dom';
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
import {db} from '../App';
import colors from '../colors';
import {getQuickRoutines} from '../helpers/api';
import {SavedQuickRoutine, SavedWorkout} from '../types/Shared';

function pad(num: number) {
  return ('0' + num).slice(-2);
}
function hhmmss(secs: number) {
  let minutes = Math.floor(secs / 60);
  secs = secs % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

const getWorkout = async (
  uid: string,
  id: string,
  type: 'savedWorkouts' | 'savedQuickRoutines',
): Promise<SavedWorkout | SavedQuickRoutine> => {
  const q = doc(db, 'users', uid, type, id);
  const workout = await getDoc(q);
  return {...workout.data(), id: workout.id} as
    | SavedWorkout
    | SavedQuickRoutine;
};

const WorkoutBreakdown = () => {
  const {id, uid} = useParams();
  const [searchParams] = useSearchParams();
  const isPlanWorkout = searchParams.get('planWorkout');

  const type = isPlanWorkout ? 'savedWorkouts' : 'savedQuickRoutines';

  const {isPending, data: workout} = useQuery({
    queryKey: [uid, id, type],
    queryFn: async () => {
      const workout = await getWorkout(uid || '', id || '', type);
      return workout;
    },
  });

  const {data: quickRoutines} = useQuery({
    queryKey: ['quickRoutines'],
    queryFn: getQuickRoutines,
  });

  if (!workout || isPending)
    return (
      <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
    );

  const {heartRateSamples, calorieSamples, exerciseEvents, pauseEvents} =
    workout;

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
      const pauseEvent = pauseEvents?.find(event => {
        return (
          next &&
          event.time?.seconds > moment(cur.startDate).unix() &&
          event.time?.seconds < moment(next.startDate).unix()
        );
      });
      const current = {
        ...cur,
        startDate: moment(cur.startDate).unix(),
        endDate: moment(cur.endDate).unix(),
      };
      const newArr = [...acc, current];

      if (exerciseEvent) {
        newArr.push({
          value: Math.round((cur.value + next.value) / 2),
          startDate: exerciseEvent.time.seconds,
          endDate: exerciseEvent.time.seconds,
        });
      }
      if (pauseEvent) {
        newArr.push({
          value: Math.round((cur.value + next.value) / 2),
          startDate: pauseEvent.time.seconds,
          endDate: pauseEvent.time.seconds,
        });
      }
      return newArr;
    },
    [],
  );

  let cumulativeCalories = 0;
  const calorieSamplesInSeconds = calorieSamples?.map(sample => {
    cumulativeCalories += sample.value;
    return {
      ...sample,
      startDate: moment(sample.startDate).unix(),
      endDate: moment(sample.startDate).unix(),
      cumulativeValue: cumulativeCalories,
    };
  });

  return (
    <div style={{}}>
      <Typography variant="h5" align="center">
        {`${
          'planWorkout' in workout
            ? workout?.planWorkout?.name
            : 'quickRoutineId' in workout
            ? quickRoutines?.[workout.quickRoutineId]?.name
            : ''
        } (${moment(workout.startTime.toDate()).format('DD/MM/YYYY')})`}
      </Typography>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Typography>RPE</Typography>
        <WaterDropIcon style={{color: colors.appBlue, margin: '0 5px'}} />
        <Typography
          style={{marginRight: 20}}>{`${workout.difficulty}/10`}</Typography>
        <Typography>Calories burnt</Typography>
        <FlameIcon style={{color: colors.secondaryDark, margin: '0 5px'}} />
        <Typography style={{marginRight: 20}}>
          {`${Math.round(workout.calories || 0)} ${
            workout.calorieCalculationType === 'estimate' ? '(estimate)' : ''
          }`}
        </Typography>
        <Typography>Average heart rate</Typography>
        <HeartIcon style={{color: colors.appRed, margin: '0 5px'}} />

        <Typography style={{marginRight: 20}}>
          {workout.averageHeartRate
            ? Math.round(workout.averageHeartRate)
            : 'N/A'}
        </Typography>
        <Typography>Duration</Typography>
        <DurationIcon style={{color: colors.textGrey, margin: '0 5px'}} />
        <Typography>{hhmmss(workout.seconds)}</Typography>
      </div>

      <ResponsiveContainer height={720}>
        <LineChart style={{padding: 10}} margin={{bottom: 20}}>
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
            tickFormatter={unixTime => moment.unix(unixTime).format('HH:mm')}
            dataKey="startDate">
            <Label value="Time" dy={20} />
          </XAxis>
          <XAxis
            domain={[workout.startTime.seconds, workout.endTime.seconds]}
            type="number"
            xAxisId="left"
            minTickGap={120}
            tickFormatter={unixTime => moment.unix(unixTime).format('HH:mm')}
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
            labelFormatter={unixTime => moment.unix(unixTime).format('HH:mm')}
          />
          <CartesianGrid stroke="#ccc" />
          {exerciseEvents?.map(event => {
            return (
              <ReferenceLine
                xAxisId="left"
                yAxisId="left"
                // cursor={'planWorkout' in workout ? workout.workout[event.value]}
                key={`exercise-${event.time.seconds}`}
                x={event.time.seconds}
                stroke={colors.appBlue}
              />
            );
          })}
          {pauseEvents?.map(event => {
            return (
              <ReferenceLine
                xAxisId="left"
                yAxisId="left"
                key={`pause-${event.time.seconds}`}
                x={event.time.seconds}
                cursor={`Workout: ${event.paused ? 'Paused' : 'Resumed'}`}
                stroke={colors.appGreen}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutBreakdown;
