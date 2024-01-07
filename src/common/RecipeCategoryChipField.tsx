import {Chip} from '@mui/material';
import {useRecordContext} from 'react-admin';
import {recipeCategories} from '../recipes/Recipes';

const RecipeCategoryChipField = () => {
  const record = useRecordContext();
  const label = recipeCategories.find(c => c.id === record.category)?.name;
  return <Chip label={label} />;
};

export default RecipeCategoryChipField;
