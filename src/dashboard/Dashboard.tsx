import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import {FC, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {db} from '../App';
import CardWithIcon from '../common/CardWithIcon';
import UserIcon from '../common/UserIcon';
import * as api from '../helpers/api';

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
  const [premiumUserCount, setPremiumUserCount] = useState(0);
  const [premiumPlusUserCount, setPremiumPlusUserCount] = useState(0);
  const [freeUserCount, setFreeUserCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const users = collection(db, 'users');
        const snapshot = await getCountFromServer(users);
        const totalUsers = snapshot.data().count;
        setTotalUserCount(totalUsers);

        const premiumQuery = query(users, where('premium', '!=', false));
        const premiumDocs = await getDocs(premiumQuery);

        const premiumUsers = premiumDocs.docs.filter(doc => {
          const data = doc.data();
          const premium = data.premium?.['Premium'];
          const hasExpired =
            !!premium && moment(premium.expirationDate).isBefore(moment());
          return premium && !hasExpired;
        });

        setPremiumUserCount(premiumUsers.length);
        const premiumPlusUsers = premiumDocs.docs.filter(doc => {
          const data = doc.data();
          const premiumPlus = data.premium?.['Premium Plus'];
          const hasExpired =
            !!premiumPlus &&
            moment(premiumPlus.expirationDate).isBefore(moment());
          return premiumPlus && !hasExpired;
        });

        setPremiumPlusUserCount(premiumPlusUsers.length);

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
        const metrics = await api.getOverviewMetrics();
        const response = metrics.data as api.OverviewMetricsResponse;
        setOverviewMetrics(response.metrics);
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
            icon={UserIcon}
            title="Total users"
            subtitle={totalUserCount}
            loading={loading}
          />
        </div>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={UserIcon}
            title="Free users"
            subtitle={freeUserCount}
            loading={loading}
          />
        </div>
        <div style={{marginRight: '0.5em', flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={UserIcon}
            title="Premium users"
            subtitle={premiumUserCount}
            loading={loading}
          />
        </div>
        <div style={{flex: 1}}>
          <CardWithIcon
            to="/users"
            icon={PersonAddIcon}
            title="Premium Plus users"
            subtitle={premiumPlusUserCount}
            loading={loading}
          />
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
