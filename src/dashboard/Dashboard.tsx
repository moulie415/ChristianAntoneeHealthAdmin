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
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import {FC, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {db} from '../App';
import CardWithIcon from '../common/CardWithIcon';
import * as api from '../helpers/api';
import {Profile} from '../types/Shared';
import { useQuery } from '@tanstack/react-query';

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
  const [loading, setLoading] = useState(false);

  const [overviewMetricsLoading, setOverviewMetricsLoading] = useState(false);
  const [overviewMetrics, setOverviewMetrics] = useState<api.OverviewMetric[]>(
    [],
  );
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [premiumUsers, setPremiumUsers] = useState<Profile[]>([]);
  const [premiumPlusUsers, setPremiumPlusUsers] = useState<Profile[]>([]);
  const [freeUserCount, setFreeUserCount] = useState(0);


  const {} = useQuery()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const users = collection(db, 'users');
        const q = query(users, where('signUpDate', '!=', null));
        const snapshot = await getCountFromServer(q);
        const totalUsers = snapshot.data().count;
        setTotalUserCount(totalUsers);

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
          .map(user => user.data());

        setPremiumUsers(premiumUsers as Profile[]);
        const premiumPlusUsers = premiumDocs.docs
          .filter(doc => {
            const data = doc.data();
            const premiumPlus = data.premium?.['Premium Plus'];
            const hasExpired =
              !!premiumPlus &&
              moment(premiumPlus.expirationDate).isBefore(moment());
            return premiumPlus && !hasExpired;
          })
          .map(user => user.data());

        setPremiumPlusUsers(premiumPlusUsers as Profile[]);

        const freeUserCount =
          totalUsers - premiumUsers.length - premiumPlusUsers.length;

        setFreeUserCount(freeUserCount);
        setLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          toast.error('Error fetching user data: ' + e.message);
        }
      }
    };

    const fetchOverviewMetrics = async () => {
      try {
        setOverviewMetricsLoading(true);
        const {data} = await api.getOverviewMetrics();
        setOverviewMetrics(data.metrics);
        setOverviewMetricsLoading(false);
      } catch (e) {
        if (e instanceof Error) {
          toast.error('Error fetching overview metrics: ' + e.message);
        }
      }
    };
    fetchData();
    fetchOverviewMetrics();
  }, []);

  return (
    <div>
      <div style={{display: 'flex'}}>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={PeopleIcon}
            title="Total users"
            subtitle={totalUserCount}
            loading={loading}
          />
        </div>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={PeopleIcon}
            title="Free users"
            subtitle={freeUserCount}
            loading={loading}
          />
        </div>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={PeopleIcon}
            title="Premium users"
            subtitle={premiumUsers.length}
            loading={loading}>
            <UserList linkParam="premium=true" users={premiumUsers} />
          </CardWithIcon>
        </div>
        <div style={{flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={GroupAddIcon}
            title="Premium Plus users"
            subtitle={premiumPlusUsers.length}
            loading={loading}>
            <UserList linkParam="premiumPlus=true" users={premiumPlusUsers} />
          </CardWithIcon>
        </div>
      </div>
      <div style={{display: 'flex', marginTop: 10}}>
        {relevantMetrics.map(metric => {
          const overviewMetric = overviewMetrics.find(m => m.id === metric.id);

          return (
            <div key={metric.id} style={{marginRight: '0.5em', flex: 0.25}}>
              <CardWithIcon
                icon={metric.icon}
                title={metric.description}
                subtitle={overviewMetric?.value || 0}
                loading={overviewMetricsLoading}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
