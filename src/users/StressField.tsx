import {FormLabel, Typography} from '@mui/material';
import React from 'react';
import {useRecordContext} from 'react-admin';
import {capitalizeFirstLetter} from '../helpers/capitalizeFirstLetter';

const StressField: React.FC = () => {
  const record = useRecordContext();
  const value = record?.stressLevel;
  return (
    <>
      <FormLabel style={{fontSize: 12}}>
        How would you describe your current stress levels?
      </FormLabel>
      <Typography>{capitalizeFirstLetter(value)}</Typography>
    </>
  );
};

export default StressField;
