import {TableCell, TableRow} from '@mui/material';
import React from 'react';
import {useRecordContext} from 'react-admin';
import {DietaryPreference} from '../types/Shared';

const DietaryPreferenceField: React.FC = () => {
  const record = useRecordContext();
  const value = record?.dietaryPreference as DietaryPreference;

  const getReadable = () => {
    switch (value) {
      case DietaryPreference.GLUTEN_FREE:
        return 'Gluten free';
      case DietaryPreference.INTERMITTENT_FASTING:
        return 'Intermittent fasting';
      case DietaryPreference.KETOGENIC:
        return 'Ketogenic';
      case DietaryPreference.PALEO:
        return 'Paleo';
      case DietaryPreference.VEGAN:
        return 'Vegan';
      case DietaryPreference.VEGETARIAN:
        return 'Vegetarian';
      default:
        return value;
    }
  };
  return (
    <TableRow>
      <TableCell>How would you describe your dietary preferences?</TableCell>
      <TableCell>{getReadable()}</TableCell>
    </TableRow>
  );
};

export default DietaryPreferenceField;
