import Typography from '@mui/material/Typography';
import {
  ArrayInput,
  Create,
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  Edit,
  EditButton,
  List,
  NumberInput,
  ReferenceField,
  ResourceProps,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleFormIterator,
  SimpleShowLayout,
  TextField,
  TextInput,
  required,
} from 'react-admin';
import MyAutoCompleteInput from '../common/MyAutoCompleteInput';
import DuplicateExercisesButton from '../exercises/DuplicateExercisesButton';
import DuplicatePlanButton from './DuplicatePlanButton';

export const PlansList = (props: ResourceProps) => (
  <List {...props} sort={{field: 'createdate', order: 'DESC'}}>
    <Datagrid bulkActionButtons={false}>
      <ReferenceField label="User" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdate" label="Create date" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false} />
    </Datagrid>
  </List>
);

export const PlansShow = (props: ResourceProps) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <ReferenceField label="User" source="user" reference="users">
          <TextField source="name" />
        </ReferenceField>
      </SimpleShowLayout>
    </Show>
  );
};

// const send = async uid => {
//   const functions = getFunctions();
//   const sendPlan = httpsCallable(functions, 'sendPlan');
//   await sendPlan({value: uid});
// };

export const PlansCreate = (props: ResourceProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <MyAutoCompleteInput
          label="User"
          source="user"
          reference="users"
          validate={[required()]}
          optionText="name"
        />

        <ArrayInput defaultValue={[]} validate={[required()]} source="workouts">
          <SimpleFormIterator>
            <TextInput
              source="name"
              validate={[required()]}
              label="Workout name"
            />
            <ArrayInput
              validate={[required()]}
              source="exercises"
              label="Exercises">
              <SimpleFormIterator inline>
                <MyAutoCompleteInput
                  validate={[required()]}
                  style={{width: 350}}
                  optionText="name"
                  source="exercise"
                  label="Exercise"
                  reference="exercises"
                />
                {/* <TextInput source="sets" label="Sets" />
                <TextInput source="reps" label="Reps" /> */}
                <NumberInput
                  source="time"
                  validate={[required()]}
                  label="Time to complete (seconds)"
                />
                <TextInput
                  source="resistanceScale"
                  label="Resistance scale"
                  defaultValue=""
                />
                <TextInput source="weight" label="Weight" defaultValue="" />
                <TextInput source="duration" label="Duration" defaultValue="" />
                <TextInput
                  source="restTime"
                  label="Rest time"
                  defaultValue=""
                />
                <TextInput
                  source="notes"
                  label="Additional notes"
                  multiline
                  defaultValue=""
                />
              </SimpleFormIterator>
            </ArrayInput>
            <DuplicateExercisesButton source="exercises" />
            <ArrayInput label="Instructions" source="steps" defaultValue={[]}>
              <SimpleFormIterator>
                <TextInput label="Instruction" multiline source="" />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput validate={[required()]} source="dates" label="Dates">
              <SimpleFormIterator inline>
                <DateInput label="Date" source="" />
              </SimpleFormIterator>
            </ArrayInput>
            <SelectInput
              source="level"
              validate={required()}
              choices={[
                {id: 'beginner', name: 'Beginner'},
                {id: 'intermediate', name: 'Intermediate'},
                {id: 'advanced', name: 'Advanced'},
              ]}
            />
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput defaultValue={[]} source="tests" label="Tests">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              optionText="name"
              label="Test"
              reference="tests"
              style={{width: 350}}
            />
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Nutritional planning</Typography>

        <Typography variant="subtitle2">General recommendations</Typography>
        <TextInput
          source="nutrition.general"
          multiline
          label="General recommendations"
          defaultValue=""
          style={{width: 400}}
        />
        <ArrayInput
          defaultValue={[]}
          source="nutrition.generalRecipes"
          label="General recommendation recipes">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              optionText="name"
              label="Recipe"
              reference="recipes"
              style={{width: 350}}
            />
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Sleep hygiene</Typography>
        <TextInput
          source="sleep.general"
          label="General recommendations"
          multiline
          style={{width: 400}}
          defaultValue=""
        />
        <ArrayInput
          defaultValue={[]}
          source="education"
          label="Educational resources">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              label="Article"
              reference="education"
              optionText="title"
              style={{width: 350}}
            />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export const PlansEdit = (props: ResourceProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceField label="User" source="user" reference="users" {...props}>
          <TextField source="name" />
        </ReferenceField>
        <ArrayInput {...props} validate={[required()]} source="workouts">
          <SimpleFormIterator>
            <TextInput
              validate={[required()]}
              source="name"
              label="Workout name"
            />
            <ArrayInput
              validate={[required()]}
              source="exercises"
              label="Exercises">
              <SimpleFormIterator inline>
                <MyAutoCompleteInput
                  source="exercise"
                  label="Exercise"
                  reference="exercises"
                  validate={[required()]}
                  style={{width: 350}}
                  optionText="name"
                />

                {/* <TextInput source="sets" label="Sets" />
                <TextInput source="reps" label="Reps" /> */}
                <NumberInput
                  source="time"
                  validate={[required()]}
                  label="Time to complete (seconds)"
                />
                <TextInput
                  source="resistanceScale"
                  label="Resistance scale"
                  defaultValue=""
                />
                <TextInput source="weight" label="Weight" defaultValue="" />
                <TextInput source="duration" label="Duration" defaultValue="" />
                <TextInput
                  source="restTime"
                  label="Rest time"
                  defaultValue=""
                />
                <TextInput
                  source="notes"
                  multiline
                  label="Additional notes"
                  defaultValue=""
                />
              </SimpleFormIterator>
            </ArrayInput>
            <DuplicateExercisesButton source="exercises" />
            <ArrayInput label="Instructions" source="steps" defaultValue={[]}>
              <SimpleFormIterator>
                <TextInput label="Instruction" multiline source="" />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput
              {...props}
              validate={[required()]}
              source="dates"
              label="Dates">
              <SimpleFormIterator inline>
                <DateInput label="Date" source="" />
              </SimpleFormIterator>
            </ArrayInput>
            <SelectInput
              source="level"
              validate={required()}
              defaultValue="beginner"
              choices={[
                {id: 'beginner', name: 'Beginner'},
                {id: 'intermediate', name: 'Intermediate'},
                {id: 'advanced', name: 'Advanced'},
              ]}
            />
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput defaultValue={[]} source="tests" label="Tests">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              optionText="name"
              label="Test"
              reference="tests"
              style={{width: 350}}
            />
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Nutritional planning</Typography>

        <Typography variant="subtitle2">General recommendations</Typography>
        <TextInput
          source="nutrition.general"
          multiline
          label="General recommendations"
          defaultValue=""
          style={{width: 400}}
        />
        <ArrayInput
          defaultValue={[]}
          source="nutrition.generalRecipes"
          label="General recommendation recipes">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              optionText="name"
              label="Recipe"
              reference="recipes"
              style={{width: 350}}
            />
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Sleep hygiene</Typography>
        <TextInput
          source="sleep.general"
          label="General recommendations"
          multiline
          defaultValue=""
          style={{width: 400}}
        />
        <ArrayInput
          defaultValue={[]}
          source="education"
          label="Educational resources">
          <SimpleFormIterator inline>
            <MyAutoCompleteInput
              optionText="title"
              label="Education"
              reference="education"
              style={{width: 350}}
            />
          </SimpleFormIterator>
        </ArrayInput>
        {/* <SendPlanButton
          onClick={async () => {
            try {
              setLoading(true);
              await send(user);
              toast.success('Plan sent');
              setSent(true);
              setLoading(false);
            } catch (e) {
              setLoading(false);
              toast.error('Error sending plan');
            }
          }}
          sent={sent}
          loading={loading}
        /> */}
        <DuplicatePlanButton />
      </SimpleForm>
    </Edit>
  );
};
