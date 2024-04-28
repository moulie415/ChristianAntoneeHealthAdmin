import {TableCell, TableRow} from '@mui/material';
import React from 'react';
import {useRecordContext} from 'react-admin';
import {CurrentExercise} from '../types/Shared';

const CurrentExerciseField: React.FC = () => {
  const record = useRecordContext();
  const value = record?.currentExercise as CurrentExercise;

  const getReadable = () => {
    switch (value) {
      case CurrentExercise.NOT_AT_ALL:
        return 'Not at all';
      case CurrentExercise.ONE_TWO_MONTH:
        return '1-2x per month';
      case CurrentExercise.ONE_TWO_WEEK:
        return '1-2x per week';
      case CurrentExercise.THREE_FOUR_WEEK:
        return '3-4x per week';
    }
  };
  return (
    <TableRow>
      <TableCell>
        In the last 12 months how often have you engaged in regular exercise?
      </TableCell>
      <TableCell>{getReadable()}</TableCell>
    </TableRow>
  );
};

export default CurrentExerciseField;
