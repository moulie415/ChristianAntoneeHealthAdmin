import {CircularProgress, Typography} from '@mui/material';
import {Timestamp, collection, getDocs, query, where} from 'firebase/firestore';
import * as _ from 'lodash';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {useRecordContext} from 'react-admin';
import {toast} from 'react-toastify';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {db} from '../App';
import colors from '../colors';
import {Profile} from '../types/Shared';

const dateFormatter = (date: number): string =>
  new Date(date).toLocaleDateString();

const MetricChart: React.FC<{
  title: string;
  source: string;
  suffix?: string;
  minValue: number;
  maxValue: number;
}> = ({title, source, suffix = '', minValue, maxValue}) => {
  const profile = useRecordContext<Profile>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{createdate: Timestamp; value: number}[]>(
    [],
  );

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const d = await getDocs(
          query(
            collection(db, 'users', profile.uid, source),

            where('createdate', '>=', moment().subtract(1, 'year').toDate()),
          ),
        );
        setData(
          d.docs.map(doc => doc.data()) as {
            value: number;
            createdate: Timestamp;
          }[],
        );
      } catch (e) {
        console.log(e);
        toast.error(`Error fetching ${title}`);
      }
      setLoading(false);
    };

    if (profile.uid) {
      getData();
    }
  }, [profile.uid, source, title]);

  if (loading) {
    return (
      <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
    );
  }

  const minDate = _.minBy(data, 'createdate');

  return (
    <>
      <Typography style={{marginTop: 10}} variant="h6" gutterBottom>
        {title}
      </Typography>
      <div style={{width: '100%', height: 250}}>
        <ResponsiveContainer>
          <AreaChart
            data={data?.map(sample => ({
              ...sample,
              date: sample.createdate.toDate().getTime(),
            }))}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colors.appBlue}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor={colors.appBlue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              name="Date"
              type="number"
              scale="time"
              domain={[
                minDate?.createdate.toDate().getTime() || new Date().getTime(),
                new Date().getTime(),
              ]}
              fontSize={12}
              tickFormatter={number => moment(number).format('DD/MM')}
            />
            <YAxis
              dataKey="value"
              name={title}
              unit={suffix}
              domain={[minValue, maxValue]}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              cursor={{strokeDasharray: '3 3'}}
              formatter={(value: any) => `${value}${suffix}`}
              labelFormatter={(label: any) => dateFormatter(label)}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default MetricChart;
