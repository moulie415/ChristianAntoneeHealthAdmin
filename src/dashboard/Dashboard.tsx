import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {db} from '../App';
import CardWithIcon from '../common/CardWithIcon';
import UserIcon from '../common/UserIcon';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
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
          toast.error('Error fetching dashboard data: ' + e.message);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {loading ? null : (
        <div>
          <div style={{display: 'flex'}}>
            <div style={{marginRight: '0.5em', flex: 1}}>
              <CardWithIcon
                to="/users"
                icon={UserIcon}
                title="Total users"
                subtitle={totalUserCount}
              />
            </div>
            <div style={{marginRight: '0.5em', flex: 1}}>
              <CardWithIcon
                to="/users"
                icon={UserIcon}
                title="Free users"
                subtitle={freeUserCount}
              />
            </div>
            <div style={{marginRight: '0.5em', flex: 1}}>
              <CardWithIcon
                to="/users"
                icon={UserIcon}
                title="Premium users"
                subtitle={premiumUserCount}
              />
            </div>
            <div style={{flex: 1}}>
              <CardWithIcon
                to="/users"
                icon={PersonAddIcon}
                title="Premium Plus users"
                subtitle={premiumPlusUserCount}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
