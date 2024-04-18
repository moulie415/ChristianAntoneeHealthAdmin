import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Modal,
  Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {DatePicker} from '@mui/x-date-pickers';
import {Timestamp, collection, getDocs, query, where} from 'firebase/firestore';
import * as _ from 'lodash';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {useEditController, useRecordContext} from 'react-admin';
import {useFormContext} from 'react-hook-form';
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
import {saveSample} from '../helpers/api';
import {Profile} from '../types/Shared';

const dateFormatter = (date: number): string =>
  new Date(date).toLocaleDateString();

const MetricChart: React.FC<{
  title: string;
  source: string;
  suffix?: string;
  minValue: number;
  maxValue: number;
  entryDisabled?: boolean;
  updateCurrent?: boolean;
}> = ({
  title,
  source,
  suffix = '',
  minValue,
  maxValue,
  entryDisabled,
  updateCurrent,
}) => {
  const profile = useRecordContext<Profile>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{createdate: Timestamp; value: number}[]>(
    [],
  );
  const [value, setValue] = useState<number>();
  const [pastValue, setPastValue] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValue(undefined);
    setPastValue(false);
  };

  const [date, setDate] = useState(moment());

  const context = useFormContext();

  const {save} = useEditController();

  console.log(save);

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

  const [modalLoading, setModalLoading] = useState(false);

  const onSubmit = async () => {
    setModalLoading(true);
    try {
      if (value) {
        await saveSample(
          source,
          value,
          profile.uid,
          pastValue ? date.toDate() : new Date(),
        );
        if (!pastValue && updateCurrent) {
          context.setValue(source, value, {shouldDirty: true});
          if (save) {
            save({[source]: value});
          }
        }
        toast.success('Sample saved successfully');
      }
    } catch (e) {
      toast.error('Error submitting entry');
    }
    setModalLoading(false);
  };

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <Typography style={{}} variant="h6" gutterBottom>
          {title}
        </Typography>
        {!entryDisabled && (
          <Button
            onClick={handleOpen}
            variant="contained"
            endIcon={<AddIcon />}>
            Add entry
          </Button>
        )}
      </div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // width: 400,
            bgcolor: 'background.paper',
            borderRadius: '15px',
            boxShadow: 24,
            p: 4,
          }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            gutterBottom
            component="h2">
            {`Add ${title} entry (${suffix})`}
          </Typography>
          <div>
            <input
              style={{width: 200, height: 30}}
              type="number"
              value={value}
              onChange={event =>
                setValue(
                  event.target.value ? Number(event.target.value) : undefined,
                )
              }
            />
          </div>
          <FormControlLabel
            control={
              <Checkbox
                checked={pastValue}
                onChange={event => {
                  setPastValue(event.target.checked);
                }}
              />
            }
            label="Set past value"
          />
          <div>
            <DatePicker
              maxDate={moment()}
              format="DD/MM/YYYY"
              disabled={!pastValue}
              value={date}
              onChange={val => {
                if (val) {
                  setDate(val);
                }
              }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}>
            <Button
              onClick={onSubmit}
              disabled={!value || modalLoading}
              variant="contained">
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default MetricChart;
