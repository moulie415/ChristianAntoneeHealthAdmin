import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import {
  Button,
  CircularProgress,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import {chunkArrayInGroups} from '../helpers/chunkArrayInGroups';
import {Plan, Profile} from '../types/Shared';

const getUserPremium = (user: Profile) =>
  user?.premium && Object.values(user?.premium)?.[0];

const PremiumField: React.FC<{user: any}> = ({user}) => {
  const userPremium = getUserPremium(user);
  const hasExpired =
    !!userPremium && moment(userPremium.expirationDate).isBefore(moment());
  return (
    <div>
      {userPremium ? (
        hasExpired ? (
          <span style={{color: 'red'}}>{`${
            userPremium.identifier
          } Expired ${moment(userPremium.expirationDate).format(
            'DD/MM/YY',
          )}`}</span>
        ) : (
          <span
            style={{color: 'green'}}>{`${userPremium.identifier} Active`}</span>
        )
      ) : (
        ''
      )}
    </div>
  );
};

type PremiumToggle = 'premium' | 'premiumPlus' | undefined;

const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const premiumPlusParam = searchParams.get('premiumPlus');
  const premiumParam = searchParams.get('premium');

  const marketingParam = searchParams.get('marketing');

  const [marketing, setMarketing] = useState<boolean | undefined>(
    marketingParam ? (marketingParam === 'true' ? true : false) : undefined,
  );
  const [emailFilter, setEmailFilter] = useState('');

  const tableRef = useRef<HTMLDivElement>(null);

  const [premiumToggle, setPremiumToggle] = useState<PremiumToggle>(
    premiumPlusParam ? 'premiumPlus' : premiumParam ? 'premium' : undefined,
  );

  useEffect(() => {
    const searchParams: {[key: string]: string} = {};
    if (marketing) {
      searchParams.marketing = 'true';
    } else if (marketing === false) {
      searchParams.marketing = 'false';
    } else {
      delete searchParams.marketing;
    }
    if (premiumToggle === 'premium') {
      searchParams.premium = 'true';
      delete searchParams.premiumPlus;
    } else if (premiumToggle === 'premiumPlus') {
      searchParams.premiumPlus = 'true';
      delete searchParams.premium;
    } else {
      delete searchParams.premiumPlus;
      delete searchParams.premium;
    }
    setSearchParams(searchParams);
  }, [marketing, premiumToggle, setSearchParams]);

  const cursor = useRef(100);
  const isAtEnd = useRef(false);

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const conditions = [];
      if (premiumToggle === 'premiumPlus' || premiumToggle === 'premium') {
        conditions.push(where('premium', '!=', false));
      }
      if (marketing !== undefined && marketing !== null) {
        conditions.push(where('marketing', '==', marketing));
      }
      const userQuery = query(
        collection(db, 'users'),
        ...conditions,
        orderBy(premiumToggle ? 'premium' : 'signUpDate', 'desc'),
        limit(cursor.current),
      );

      const c = await getDocs(userQuery);
      const userUids = c.docs
        .filter(doc => getUserPremium(doc.data() as Profile))
        .map(doc => doc.data().uid);
      const uidArrays = chunkArrayInGroups(userUids, 10);
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
      setLoading(false);
      return c.docs
        .filter(doc => {
          const user = doc.data() as Profile;
          const premium = getUserPremium(user);
          const hasExpired =
            !!premium && moment(premium.expirationDate).isBefore(moment());
          if (
            premiumToggle === 'premiumPlus' &&
            (premium?.identifier !== 'Premium Plus' || hasExpired)
          ) {
            return false;
          }
          if (
            premiumToggle === 'premium' &&
            (premium?.identifier !== 'Premium' || hasExpired)
          ) {
            return false;
          }
          return true;
        })
        .map(doc => {
          const data = doc.data();

          const userPlans = plans.filter(plan => plan.user === data.uid);
          const upToDatePlan = userPlans?.find(plan => {
            return plan?.workouts?.some(workout => {
              return workout.dates?.some(date =>
                moment(date).isSameOrAfter(moment(), 'day'),
              );
            });
          });
          return {...data, plans: userPlans, upToDatePlan};
        });
    } catch (e) {
      if (e instanceof Error) {
        toast.error('Error fetching users: ' + e.message);
      } else {
        toast.error('Error fetching users');
      }
    }
    setLoading(false);
  }, [marketing, premiumToggle]);

  useEffect(() => {
    const init = async () => {
      const users = await getUsers();
      if (users) {
        setUsers(users);
      }
    };
    init();
  }, [getUsers]);

  const navigate = useNavigate();

  const handlePremiumToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    toggle: PremiumToggle,
  ) => {
    setPremiumToggle(toggle);
  };

  const handleMarketingToggleChange = (
    _: React.MouseEvent<HTMLElement>,
    toggle: boolean,
  ) => {
    setMarketing(toggle);
  };

  const handleEmailFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailFilter(e.target.value);
  };

  const handleScroll = async () => {
    const table = tableRef.current;
    if (table) {
      const isAtBottom =
        table.scrollTop + table.clientHeight >= table.scrollHeight - 5;
      if (isAtBottom && !isAtEnd.current) {
        cursor.current = cursor.current + 100;

        const newUsers = await getUsers();
        if (newUsers && newUsers?.length > users.length) {
          setUsers(newUsers);
        } else {
          isAtEnd.current = true;
        }
      }
    }
  };

  return (
    <div>
      <div style={{marginBottom: 10, marginTop: 50}}>
        <ToggleButtonGroup
          style={{marginRight: 10}}
          disabled={loading}
          color="primary"
          value={premiumToggle}
          exclusive
          onChange={handlePremiumToggleChange}
          aria-label="Platform">
          <ToggleButton value="premium">Premium</ToggleButton>
          <ToggleButton value="premiumPlus">Premium Plus</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          color="primary"
          disabled={loading}
          value={marketing}
          exclusive
          onChange={handleMarketingToggleChange}
          aria-label="Platform">
          <ToggleButton value={true}>Marketing ON</ToggleButton>
          <ToggleButton value={false}>Marketing OFF</ToggleButton>
        </ToggleButtonGroup>
        <Input
          value={emailFilter}
          disabled={loading}
          style={{marginLeft: 20, width: 200}}
          placeholder="Filter via email"
          onChange={handleEmailFilterChange}
        />
      </div>
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
        <TableContainer
          onScroll={handleScroll}
          style={{height: '80vh'}}
          ref={tableRef}
          component={Paper}>
          <Table sx={{minWidth: 700}} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Premium</TableCell>
                <TableCell>Up to date plan?</TableCell>
                <TableCell>Marketing</TableCell>
                <TableCell>Sign up date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                ?.filter(
                  user =>
                    !emailFilter ||
                    user.email
                      .toLowerCase()
                      .includes(emailFilter.toLowerCase()),
                )
                ?.sort((a, b) => {
                  const aPremium = getUserPremium(a);
                  const bPremium = getUserPremium(b);
                  const aExpired =
                    !!aPremium &&
                    moment(aPremium.expirationDate).isBefore(moment());
                  const bExpired =
                    !!bPremium &&
                    moment(bPremium.expirationDate).isBefore(moment());

                  const aHasPremium = aPremium && !aExpired;
                  const bHasPremium = bPremium && !bExpired;

                  if (b.upToDatePlan && !a.upToDatePlan) {
                    if (aHasPremium && !bHasPremium) {
                      return -2;
                    } else {
                      return -1;
                    }
                  }
                  if (aHasPremium && !bHasPremium) {
                    return -1;
                  }

                  return 0;
                })
                .map(user => (
                  <TableRow key={user.uid}>
                    <TableCell>
                      <Button
                        variant="text"
                        style={{textTransform: 'none'}}
                        onClick={e => {
                          e.stopPropagation();
                          navigate(`/users/${user.uid}`);
                        }}>
                        {`${user.name} ${user.surname || ''}`}
                      </Button>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <PremiumField user={user} />
                    </TableCell>
                    <TableCell align="center">
                      {user.upToDatePlan ? (
                        <DoneIcon />
                      ) : getUserPremium(user) &&
                        moment(getUserPremium(user).expirationDate).isAfter(
                          moment(),
                        ) ? (
                        <CloseIcon style={{color: 'red'}} />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      {user.marketing ? <DoneIcon /> : <ClearIcon />}
                    </TableCell>
                    <TableCell>
                      {user.signUpDate
                        ? moment.unix(user.signUpDate).format('DD/MM/YYYY')
                        : ''}
                    </TableCell>
                    <TableCell>
                      {getUserPremium(user) &&
                        moment(getUserPremium(user).expirationDate).isAfter(
                          moment(),
                        ) && (
                          <Button
                            onClick={async () => {
                              navigate(
                                `/plans/create?source={"user":"${user.uid}"}`,
                              );
                            }}
                            disabled={loading}
                            variant="contained"
                            color="primary"
                            style={{marginTop: 10}}>
                            Create plan
                          </Button>
                        )}
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

export default UsersList;
