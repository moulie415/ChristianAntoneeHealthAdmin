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
import {keepPreviousData, useQuery} from '@tanstack/react-query';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import {useEffect, useRef, useState} from 'react';
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

interface UserWithPlans extends Profile {
  plans?: Plan[];
  upToDatePlan?: Plan;
}

const UsersList = () => {
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

  const [cursor, setCursor] = useState(10);

  const {data, error, isPending, isFetching} = useQuery({
    queryKey: ['users', cursor, premiumToggle, marketing],
    queryFn: async () => {
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
        limit(cursor),
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
          const data = doc.data() as Profile;

          const userPlans = plans.filter(plan => plan.user === data.uid);
          const upToDatePlan = userPlans?.find(plan => {
            return plan?.workouts?.some(workout => {
              return workout.dates?.some(date =>
                moment(date).isSameOrAfter(moment(), 'day'),
              );
            });
          });
          return {...data, plans: userPlans, upToDatePlan} as UserWithPlans;
        });
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (error && error instanceof Error) {
      toast.error('Error fetching users: ' + error.message);
    }
  }, [error]);

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
      if (isAtBottom && !(cursor > (data?.length || 1))) {
        setCursor(cursor + 10);
      }
    }
  };

  return (
    <div>
      <div style={{marginBottom: 10, marginTop: 50}}>
        <ToggleButtonGroup
          style={{marginRight: 10}}
          disabled={isFetching}
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
          disabled={isFetching}
          value={marketing}
          exclusive
          onChange={handleMarketingToggleChange}
          aria-label="Platform">
          <ToggleButton value={true}>Marketing ON</ToggleButton>
          <ToggleButton value={false}>Marketing OFF</ToggleButton>
        </ToggleButtonGroup>
        <Input
          value={emailFilter}
          disabled={isFetching}
          style={{marginLeft: 20, width: 200}}
          placeholder="Filter via email"
          onChange={handleEmailFilterChange}
        />
      </div>
      {isPending ? (
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
              {data
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
                            disabled={isFetching}
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
