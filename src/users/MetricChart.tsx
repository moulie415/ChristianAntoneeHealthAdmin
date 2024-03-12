import {CircularProgress, Typography} from '@mui/material';
import * as _ from 'lodash';
import {useState} from 'react';
import {useGetList, useRecordContext} from 'react-admin';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
  const [page, setPage] = useState(1);
  const profile = useRecordContext<Profile>();
  const {data, isLoading} = useGetList<{
    createdate: Date;
    value: number;
    id: string;
  }>(`users/${profile.uid}/${source}`, {
    pagination: {perPage: 100, page},
    sort: {field: 'createdate', order: 'DESC'},
  });

  if (isLoading) {
    return (
      <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
    );
  }

  const minDate = _.minBy(data, 'createdate');

  console.log(minDate);

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
              date: sample.createdate.getTime(),
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
                minDate?.createdate.getTime() || new Date().getTime(),
                new Date().getTime(),
              ]}
              tickFormatter={dateFormatter}
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
