import {TableCell, TableRow} from '@mui/material';
import React from 'react';
import {useRecordContext} from 'react-admin';
import {capitalizeFirstLetter} from '../helpers/capitalizeFirstLetter';

const StressField: React.FC = () => {
  const record = useRecordContext();
  const value = record?.stressLevel;
  return (
    <TableRow>
      <TableCell>How would you describe your current stress levels?</TableCell>
      <TableCell>{capitalizeFirstLetter(value)}</TableCell>
    </TableRow>
  );
};

export default StressField;
