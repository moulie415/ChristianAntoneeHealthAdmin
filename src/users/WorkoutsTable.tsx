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
import {useRecordContext} from 'react-admin';
import {useNavigate} from 'react-router-dom';
import {db} from '../App';
import {getQuickRoutines} from '../helpers/api';
import {SavedQuickRoutine, SavedWorkout} from '../types/Shared';

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

  const {data} = useQuery({
    queryKey: [type, record?.uid],
    queryFn: async () => {
      const workouts = await getWorkouts(record?.uid, type);
      return workouts;
    },
  });

  const {data: quickRoutines} = useQuery({
    queryKey: ['quickRoutines'],
    queryFn: getQuickRoutines,
  });

  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {`Completed ${type === 'savedWorkouts' ? 'plan ' : ''}workouts`}
      </Typography>
      <div>
        <TableContainer style={{}} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
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

                    <TableCell style={{maxWidth: 100}}>
                      {'planWorkout' in workout
                        ? workout?.planWorkout?.name
                        : 'quickRoutineId' in workout
                        ? quickRoutines?.[workout.quickRoutineId]?.name
                        : ''}
                    </TableCell>

                    <TableCell>{`${workout.difficulty}/10`}</TableCell>

                    <TableCell>
                      <Button
                        onClick={() => {
                          navigate(
                            `/users/${record?.uid}/workout-breakdown/${
                              workout.id
                            }${
                              type === 'savedWorkouts'
                                ? '?planWorkout=true'
                                : ''
                            }`,
                          );
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
    </>
  );
};

export default WorkoutsTable;
