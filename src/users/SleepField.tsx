import {FormLabel, Typography} from '@mui/material';
import React from 'react';
import {useRecordContext} from 'react-admin';
import {Sleep} from '../types/Shared';

const SleepField: React.FC = () => {
  const record = useRecordContext();
  const value = record?.sleep as Sleep;

  const getReadable = () => {
    switch (value) {
      case Sleep.BETWEEN_FOUR_AND_SEVEN:
        return 'Between 4-7';
      case Sleep.LESS_THAN_FOUR:
        return 'Less than four';
      case Sleep.MORE_THAN_SEVEN:
        return 'More than seven';
    }
  };
  return (
    <>
      <FormLabel style={{fontSize: 12}}>
        How many hours of sleep do you get each night?
      </FormLabel>
      <Typography>{getReadable()}</Typography>
    </>
  );
};

export default SleepField;
