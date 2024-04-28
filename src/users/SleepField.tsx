import {TableCell, TableRow} from '@mui/material';
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
    <TableRow>
      <TableCell>How many hours of sleep do you get each night?</TableCell>
      <TableCell>{getReadable()}</TableCell>
    </TableRow>
  );
};

export default SleepField;
