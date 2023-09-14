import Typography from '@mui/material/Typography';
import * as React from 'react';
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  ShowButton,
  ReferenceField,
  ReferenceInput,
  TextInput,
  EditButton,
  DeleteButton,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  NumberInput,
  DateTimeInput,
  required,
  DateField,
} from 'react-admin';
import {doc, getDoc} from 'firebase/firestore';
import {db} from './App';
import {useWatch} from 'react-hook-form';
import {toast} from 'react-toastify';
import {getFunctions, httpsCallable} from 'firebase/functions';
import DuplicatePlanButton from './DuplicatePlanButton';
import SendPlanButton from './SendPlanButton';
import MyAutoCompleteInput from './MyAutoCompleteInput';
import DuplicateExercisesButton from './DuplicateExercisesButton';

export const PlansList = props => (
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

export const PlansShow = props => {
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

const send = async uid => {
  const functions = getFunctions();
  const sendPlan = httpsCallable(functions, 'sendPlan');
  await sendPlan({value: uid});
};

const UserInput = ({setUser, ...props}) => {
  const user = useWatch({name: 'user'});
  React.useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);
  return (
    <MyAutoCompleteInput
      label="User"
      source="user"
      reference="users"
      validate={[required()]}
      optionText="name"
    />
  );
};

export const PlansCreate = props => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(false);

  return (
    <Create {...props}>
      <SimpleForm>
        <UserInput validate={[required()]} setUser={setUser} />

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
                <TextInput source="sets" validate={[required()]} label="Sets" />
                <TextInput source="reps" validate={[required()]} label="Reps" />
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
                <TextInput label="Instruction" multiline />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput validate={[required()]} source="dates" label="Dates">
              <SimpleFormIterator inline>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
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
        <TextInput
          source="nutrition.preWorkout"
          label="Pre-workout"
          defaultValue=""
          multiline
          style={{width: 400}}
        />
        <TextInput
          source="nutrition.postWorkout"
          label="Post-workout"
          defaultValue=""
          multiline
          style={{width: 400}}
        />
        <TextInput
          multiline
          style={{width: 400}}
          source="nutrition.general"
          label="General recommendations"
          defaultValue=""
        />
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

const UserField = ({setUser, ...props}) => {
  const user = useWatch({name: 'user'});
  React.useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);
  return (
    <ReferenceField label="User" source="user" reference="users" {...props}>
      <TextField source="name" />
    </ReferenceField>
  );
};

export const PlansEdit = props => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  // React.useEffect(() => {
  //   const checkIfSent = async () => {
  //     setLoading(true);
  //     if (user) {
  //       const sent = await isSent(user);
  //       setSent(sent);
  //       setLoading(false);
  //     }
  //   };
  //   checkIfSent();
  // }, [setSent, user]);

  return (
    <Edit {...props}>
      <SimpleForm>
        <UserField setUser={setUser} />
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

                <TextInput source="sets" validate={[required()]} label="Sets" />
                <TextInput source="reps" validate={[required()]} label="Reps" />
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
                <TextInput label="Instruction" multiline />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput
              {...props}
              validate={[required()]}
              source="dates"
              label="Dates">
              <SimpleFormIterator inline>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
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
        <TextInput
          source="nutrition.preWorkout"
          multiline
          label="Pre-workout"
          defaultValue=""
          style={{width: 400}}
        />
        <TextInput
          source="nutrition.postWorkout"
          multiline
          label="Post-workout"
          defaultValue=""
          style={{width: 400}}
        />
        <TextInput
          source="nutrition.general"
          multiline
          label="General recommendations"
          defaultValue=""
          style={{width: 400}}
        />
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
