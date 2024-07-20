import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PeopleIcon from '@mui/icons-material/People';
import {
  Avatar,
  Box,
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {useQuery} from '@tanstack/react-query';
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import {FC, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import CardWithIcon from '../common/CardWithIcon';
import * as api from '../helpers/api';
import {Profile} from '../types/Shared';

const UserList: FC<{users: Profile[]; linkParam?: string}> = ({
  users,
  linkParam,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {users.slice(0, 10).map(user => {
        return (
          <ListItemButton
            key={user.uid}
            onClick={() => navigate(`/users/${user.uid}`)}>
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={`${user.name} ${user.surname || ''}`} />
          </ListItemButton>
        );
      })}
      {!!users.length && (
        <Button
          sx={{borderRadius: 0}}
          component={Link}
          to={`/users?${linkParam || ''}`}
          size="small"
          color="primary">
          <Box p={1} sx={{color: 'primary.main'}}>
            See all users
          </Box>
        </Button>
      )}
    </>
  );
};

interface OverMetricObject {
  id: string;
  description: string;
  icon: FC<any>;
}

const relevantMetrics: OverMetricObject[] = [
  {
    id: 'active_subscriptions',
    description: 'Active subscriptions',
    icon: AttachMoneyIcon,
  },
  {id: 'mrr', description: 'Monthly recurring revenue', icon: AttachMoneyIcon},
  {id: 'revenue', description: 'Revenue last 28 days', icon: AttachMoneyIcon},
];

const Dashboard = () => {
  const {data, isPending, error} = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const users = collection(db, 'users');
      const q = query(users, where('signUpDate', '!=', null));
      const snapshot = await getCountFromServer(q);
      const totalUsers = snapshot.data().count;

      const premiumQuery = query(users, where('premium', '!=', false));
      const premiumDocs = await getDocs(premiumQuery);

      const premiumUsers = premiumDocs.docs
        .filter(doc => {
          const data = doc.data();
          const premium = data.premium?.['Premium'];
          const hasExpired =
            !!premium && moment(premium.expirationDate).isBefore(moment());
          return premium && !hasExpired;
        })
        .map(user => user.data()) as Profile[];

      const premiumPlusUsers = premiumDocs.docs
        .filter(doc => {
          const data = doc.data();
          const premiumPlus = data.premium?.['Premium Plus'];
          const hasExpired =
            !!premiumPlus &&
            moment(premiumPlus.expirationDate).isBefore(moment());
          return premiumPlus && !hasExpired;
        })
        .map(user => user.data()) as Profile[];

      const freeUserCount =
        totalUsers - premiumUsers.length - premiumPlusUsers.length;

      return {totalUsers, freeUserCount, premiumPlusUsers, premiumUsers};
    },
  });

  const {
    data: overviewMetrics,
    isPending: isOverviewMetricsPending,
    error: overviewMetricsError,
  } = useQuery({
    queryKey: ['overviewMetrics'],
    queryFn: async () => {
      const {data} = await api.getOverviewMetrics();
      return data.metrics;
    },
  });

  useEffect(() => {
    const err = error || overviewMetricsError;
    if (err && err instanceof Error) {
      toast.error(err.message);
    }
  }, [error, overviewMetricsError]);

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={PeopleIcon}
            title="Total users"
            subtitle={data?.totalUsers}
            loading={isPending}
          />
        </div>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={PeopleIcon}
            title="Free users"
            subtitle={data?.freeUserCount}
            loading={isPending}
          />
        </div>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={PeopleIcon}
            title="Premium users"
            subtitle={data?.premiumUsers.length}
            loading={isPending}>
            <UserList
              linkParam="premium=true"
              users={data?.premiumUsers || []}
            />
          </CardWithIcon>
        </div>
        <div style={{flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={GroupAddIcon}
            title="Premium Plus users"
            subtitle={data?.premiumPlusUsers.length}
            loading={isPending}>
            <UserList
              linkParam="premiumPlus=true"
              users={data?.premiumPlusUsers || []}
            />
          </CardWithIcon>
        </div>
      </div>
      <div style={{display: 'flex', marginTop: 10}}>
        {relevantMetrics.map(metric => {
          const overviewMetric = overviewMetrics?.find(m => m.id === metric.id);

          return (
            <div key={metric.id} style={{marginRight: '0.5em', flex: 0.25}}>
              <CardWithIcon
                icon={metric.icon}
                title={metric.description}
                subtitle={overviewMetric?.value || 0}
                loading={isOverviewMetricsPending}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
