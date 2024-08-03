import {Box, CircularProgress, Fade, Modal} from '@mui/material';
import moment from 'moment';
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
import {SavedQuickRoutine, SavedWorkout} from '../types/Shared';

const WorkoutsModal: React.FC<{
  handleClose: () => void;
  open: boolean;
  selectedWorkout?: SavedWorkout | SavedQuickRoutine;
  data?: (SavedWorkout | SavedQuickRoutine)[];
  isPending: boolean;
}> = ({open, handleClose, isPending, selectedWorkout}) => {
  if (!selectedWorkout) {
    return null;
  }

  console.log(selectedWorkout);
  const {
    heartRateSamples,
    calories,
    averageHeartRate,
    calorieSamples,
    difficulty,
    exerciseEvents,
  } = selectedWorkout;

  const heartRateSamplesInSeconds = heartRateSamples.map(sample => ({
    ...sample,
    startDate: moment(sample.startDate).unix(),
    endDate: moment(sample.startDate).unix(),
  }));

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      // slots={{backdrop: Backdrop}}
      // slotProps={{
      //   backdrop: {
      //     timeout: 500,
      //   },
      // }}
    >
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
              <LineChart margin={{bottom: 20}} data={heartRateSamplesInSeconds}>
                <YAxis>
                  <Label value="Heart rate (bpm)" angle={270} dx={-20} />
                </YAxis>
                <XAxis
                  minTickGap={120}
                  tickFormatter={unixTime => {
                    return moment.unix(unixTime).format('HH:mm');
                  }}
                  dataKey="startDate">
                  <Label value="Time" dy={20} />
                </XAxis>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="red"
                  dot={false}
                />

                <Tooltip
                  formatter={value => [`${value} bpm`, 'Heart rate']}
                  labelFormatter={unixTime => {
                    return moment.unix(unixTime).format('HH:mm');
                  }}
                />
                <CartesianGrid stroke="#ccc" />
                {exerciseEvents.map(event => {
                  return (
                    <ReferenceLine
                      stroke="blue"
                      key={`${event?.time.toString()} ${event.value}`}
                      x={event?.time?.seconds}>
                      <Label value={event.value} position="insideBottomRight" />
                    </ReferenceLine>
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default WorkoutsModal;
