import {collection, getDocs, query, where} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {db} from './App';
import {toast} from 'react-toastify';
import {
  CircularProgress,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {Plan} from './types/Shared';

function chunkArrayInGroups(arr: string[], size: number) {
  const myArray = [];
  for (let i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size));
  }
  return myArray;
}

const ClientPremiumField: React.FC<{client: any}> = ({client}) => {
  const clientPremium = client?.premium.Premium;
  const hasExpired =
    !!clientPremium && moment(clientPremium.expirationDate).isBefore(moment());
  console.log(clientPremium);
  return (
    <div>
      {clientPremium ? (
        hasExpired ? (
          <span style={{color: 'red'}}>{` Expired ${moment(
            clientPremium.expirationDate,
          ).format('DD/MM/YY')}`}</span>
        ) : (
          <span style={{color: 'green'}}> Active</span>
        )
      ) : (
        ''
      )}
    </div>
  );
};

const ClientSummary = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<any[]>();

  const getClients = async () => {
    try {
      setLoading(true);
      const clientQuery = query(
        collection(db, 'users'),
        where('premium', '!=', false),
      );
      const c = await getDocs(clientQuery);
      const clientUids = c.docs
        .filter(doc => doc.data().premium.Premium)
        .map(doc => doc.data().uid);
      const uidArrays = chunkArrayInGroups(clientUids, 10);
      const plans: Plan[] = [];
      for (let i = 0; i < uidArrays.length; i++) {
        const arr = uidArrays[i];
        const planQuery = query(
          collection(db, 'plans'),
          where('user', 'in', arr),
        );
        const snapshot = await getDocs(planQuery);
        plans.push(...(snapshot.docs.map(doc => doc.data()) as Plan[]));
      }

      setClients(
        c.docs
          .filter(doc => doc.data().premium.Premium)
          .map(doc => {
            const data = doc.data();

            const cPlans = plans.filter(plan => plan.user === data.uid);
            const upToDatePlan = cPlans?.find(plan => {
              return plan?.workouts?.some(workout => {
                return workout.dates?.some(date =>
                  moment(date).isSameOrAfter(moment(), 'day'),
                );
              });
            });
            return {...data, plans: cPlans, upToDatePlan};
          }),
      );
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error fetching clients: ' + e.message);
      } else {
        toast.error('Error fetching clients');
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getClients();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer style={{marginTop: 50}} component={Paper}>
          <Table sx={{minWidth: 700}} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>Up to date plan?</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                ?.sort((a, b) => {
                  const aPremium = a.premium.Premium;
                  const bPremium = b.premium.Premium;
                  const aExpired =
                    !!aPremium &&
                    moment(aPremium.expirationDate).isBefore(moment());
                  const bExpired =
                    !!bPremium &&
                    moment(bPremium.expirationDate).isBefore(moment());

                  if (b.upToDatePlan && !a.upToDatePlan) {
                    if (aPremium && !bPremium) {
                      if (!aExpired) {
                        return -3;
                      }
                      return -2;
                    } else {
                      return -1;
                    }
                  }
                  if (aPremium && !bPremium) {
                    if (!aExpired) {
                      return -2;
                    }
                    return -1;
                  }

                  if (aPremium && bPremium) {
                    if (!aExpired && bExpired) {
                      return -1;
                    }
                  }
                  return 0;
                })
                .map(client => (
                  <TableRow key={client.uid}>
                    <TableCell>
                      <Button
                        variant="text"
                        style={{textTransform: 'none'}}
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/users/${client.uid}`);
                        }}>
                        {`${client.name} ${client.surname || ''}`}
                      </Button>
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>
                      <ClientPremiumField client={client} />
                    </TableCell>
                    <TableCell align="center">
                      {client.upToDatePlan ? (
                        <DoneIcon style={{color: 'green'}} />
                      ) : (
                        <CloseIcon style={{color: 'red'}} />
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Button
                        onClick={async () => {
                          navigate(
                            `/plans/create?source={"user":"${client.uid}"}`,
                          );
                        }}
                        disabled={loading}
                        variant="contained"
                        color="primary"
                        style={{marginTop: 10}}>
                        Create plan
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ClientSummary;
