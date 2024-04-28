import {TableCell, TableRow} from '@mui/material';
import React from 'react';
import {useRecordContext} from 'react-admin';

const FitnessRatingField: React.FC = () => {
  const record = useRecordContext();
  const value = record?.fitnessRating;

  return (
    <TableRow>
      <TableCell>How would you rate your fitness on a scale of 1-10?</TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};

export default FitnessRatingField;
