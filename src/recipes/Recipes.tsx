import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  FileField,
  FileInput,
  ImageField,
  ImageInput,
  List,
  ResourceProps,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
  required,
} from 'react-admin';
import RecipeCategoryChipField from '../common/RecipeCategoryChipField';
import {RecipeCategory} from '../types/Shared';

export const RecipesList = (props: ResourceProps) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <RecipeCategoryChipField />
      <BooleanField source="premium" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const RecipesShow = (props: ResourceProps) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <RecipeCategoryChipField />
      <ImageField label="Image" source="image.src" />
      <BooleanField source="premium" />
    </SimpleShowLayout>
  </Show>
);

export const recipeCategories: {id: RecipeCategory; name: string}[] = [
  {id: RecipeCategory.HIGH_PROTEIN, name: 'High protein'},
  {id: RecipeCategory.VEGETARIAN, name: 'Vegetarian'},
  {id: RecipeCategory.VEGAN, name: 'Vegan'},
  {id: RecipeCategory.LOW_CARB, name: 'Low carb'},
  {id: RecipeCategory.SMOOTHIE, name: 'Smoothie'},
  {id: RecipeCategory.FIVE_INGREDIENT, name: '5-ingredient'},
  {id: RecipeCategory.GLUTEN_FREE, name: 'Gluten free'},
];

export const RecipesCreate = (props: ResourceProps) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <SelectInput
        source="category"
        choices={recipeCategories}
        validate={required()}
      />
      <ImageInput
        source="image"
        label="Image"
        accept={{'image/*': ['.jpeg', '.png']}}
        validate={required()}>
        <ImageField source="src" title="title" />
      </ImageInput>
      <FileInput
        source="recipe"
        label="Recipe"
        accept={{'application/pdf': ['.pdf']}}
        validate={required()}>
        <FileField source="src" title="title" />
      </FileInput>
      <BooleanInput source="premium" />
    </SimpleForm>
  </Create>
);

export const RecipesEdit = (props: ResourceProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <SelectInput
        source="category"
        choices={recipeCategories}
        validate={required()}
      />
      <ImageInput
        source="image"
        label="Image"
        accept={{'image/*': ['.jpeg', '.png']}}
        validate={required()}>
        <ImageField source="src" title="title" />
      </ImageInput>
      <FileInput
        source="recipe"
        label="Recipe"
        accept={{'application/pdf': ['.pdf']}}
        validate={required()}>
        <FileField source="src" title="title" />
      </FileInput>
      <BooleanInput source="premium" />
    </SimpleForm>
  </Edit>
);
