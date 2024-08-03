import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
} from 'firebase/firestore';
import moment from 'moment';
import {useState} from 'react';
import {useRecordContext} from 'react-admin';
import {db} from '../App';
import {SavedQuickRoutine, SavedWorkout} from '../types/Shared';
import WorkoutsModal from './WorkoutsModal';

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

const getWorkouts = async (
  uid: string,
  type: 'savedWorkouts' | 'savedQuickRoutines',
): Promise<(SavedWorkout | SavedQuickRoutine)[]> => {
  const q = query(
    collection(db, 'users', uid, type),
    orderBy('createdate'),
    limitToLast(5),
  );
  const workouts = await getDocs(q);
  return workouts.docs
    .map(d => {
      return {...d.data(), id: d.id};
    })
    .reverse() as (SavedWorkout | SavedQuickRoutine)[];
};

const WorkoutsTable: React.FC<{
  type: 'savedWorkouts' | 'savedQuickRoutines';
}> = ({type}) => {
  const record = useRecordContext();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedWorkout, setSelectedWorkout] = useState<
    SavedWorkout | SavedQuickRoutine
  >();

  const {isPending, data} = useQuery({
    queryKey: [type, record?.uid],
    queryFn: async () => {
      const workouts = await getWorkouts(record?.uid, type);
      return workouts;
    },
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {`Completed ${type === 'savedWorkouts' ? 'plan ' : ''}workouts`}
      </Typography>
      <div>
        <TableContainer style={{}} component={Paper}>
          <Table
            sx={{
              minWidth: 700,
            }}
            aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {type === 'savedWorkouts' && <TableCell>Name</TableCell>}
                <TableCell>RPE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map(workout => {
                return (
                  <TableRow key={workout.id}>
                    <TableCell>
                      {moment
                        .unix(
                          workout.startTime
                            ? workout.startTime.seconds
                            : workout.createdate.seconds,
                        )
                        .format('DD/MM/YY')}
                    </TableCell>
                    {'planWorkout' in workout && (
                      <TableCell>{workout?.planWorkout?.name}</TableCell>
                    )}
                    <TableCell>{`${workout.difficulty}/10`}</TableCell>

                    <TableCell>
                      <Button
                        onClick={async () => {
                          handleOpen();
                          if (workout) {
                            setSelectedWorkout(workout);
                          }
                        }}
                        variant="contained"
                        color="primary"
                        style={{}}>
                        View breakdown
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <WorkoutsModal
        handleClose={handleClose}
        open={open}
        selectedWorkout={selectedWorkout}
        data={data}
        isPending={isPending}
      />
    </>
  );
};

export default WorkoutsTable;
