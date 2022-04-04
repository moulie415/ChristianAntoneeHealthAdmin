import {Button, Typography} from '@material-ui/core';
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
} from 'react-admin';
import {doc, getDoc} from 'firebase/firestore';
import {db} from './App';
import {useFormState} from 'react-final-form';
import {toast} from 'react-toastify';

export const PlansList = props => (
  <List {...props} bulkActionButtons={false}>
    <Datagrid>
      <ReferenceField label="User" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
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

const isSent = async uid => {
  if (uid) {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().planStatus === 3) {
      return true;
    }
  }
  return false;
};

const send = async uid => {};

const UserInput = ({setUser, ...props}) => {
  const {values} = useFormState();
  React.useEffect(() => {
    if (values.user) {
      setUser(values.user);
    }
  }, [values, setUser]);
  return (
    <ReferenceInput
      label="User"
      source="user"
      reference="users"
      validate={[required()]}
      {...props}>
      <AutocompleteInput optionText="name" />
    </ReferenceInput>
  );
};

export const PlansCreate = props => {
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => {
    const checkIfSent = async () => {
      setLoading(true);
      if (user) {
        const sent = await isSent(user);
        setSent(sent);
        setLoading(false);
      }
    };
    checkIfSent();
  }, [setSent, user]);
  return (
    <Create {...props}>
      <SimpleForm>
        <UserInput setUser={setUser} />
        <ArrayInput source="workouts">
          <SimpleFormIterator>
            <TextInput source="name" label="Workout name" />
            <ArrayInput source="exercises" label="Exercises">
              <SimpleFormIterator>
                <ReferenceInput
                  source="exercise"
                  label="Exercise"
                  reference="exercises">
                  <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <NumberInput source="sets" label="Sets" />
                <NumberInput source="reps" label="Reps" />
                <NumberInput source="duration" label="Duration (secs)" />
                <NumberInput
                  source="resistanceScale"
                  label="Resistance scale"
                />
                <NumberInput source="restTime" label="Rest time (secs)" />
                <TextInput source="notes" label="Additional notes" multiline />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="dates" label="Dates">
              <SimpleFormIterator>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="tests" label="Tests">
          <SimpleFormIterator>
            <ReferenceInput source="test" label="Test" reference="tests">
              <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ArrayInput source="dates" label="Dates">
              <SimpleFormIterator>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Nutritional planning</Typography>
        <TextInput source="nutrition.preWorkout" label="Pre-workout" />
        <TextInput source="nutrition.postWorkout" label="Post-workout" />
        <TextInput source="nutrition.general" label="General recommendations" />
        <Typography>Sleep hygiene</Typography>
        <TextInput
          source="sleep.general"
          label="General recommendations"
          multiline
        />
        <ArrayInput source="education" label="Educational resources">
          <SimpleFormIterator>
            <ReferenceInput label="Article" reference="education">
              <AutocompleteInput optionText="title" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <Button
          onClick={async () => {
            try {
              await send(user);
              setSent(true);
              toast.success('Plan sent');
            } catch (e) {
              toast.error('Error sending plan');
            }
          }}
          disabled={sent || loading}
          variant="contained"
          color="primary">
          Send
        </Button>
      </SimpleForm>
    </Create>
  );
};

const UserField = ({setUser, ...props}) => {
  const {values} = useFormState();
  React.useEffect(() => {
    if (values.user) {
      setUser(values.user);
    }
  }, [values, setUser]);
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
  React.useEffect(() => {
    const checkIfSent = async () => {
      setLoading(true);
      if (user) {
        const sent = await isSent(user);
        setSent(sent);
        setLoading(false);
      }
    };
    checkIfSent();
  }, [setSent, user]);
  return (
    <Edit {...props}>
      <SimpleForm>
        <UserField setUser={setUser} />
        <ArrayInput source="workouts">
          <SimpleFormIterator>
            <TextInput source="name" label="Workout name" />
            <ArrayInput source="exercises" label="Exercises">
              <SimpleFormIterator>
                <ReferenceInput
                  source="exercise"
                  label="Exercise"
                  reference="exercises">
                  <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <NumberInput source="sets" label="Sets" />
                <NumberInput source="reps" label="Reps" />
                <NumberInput source="duration" label="Duration (secs)" />
                <NumberInput
                  source="resistanceScale"
                  label="Resistance scale"
                />
                <NumberInput source="restTime" label="Rest time (secs)" />
                <TextInput source="notes" label="Additional notes" multiline />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="dates" label="Dates">
              <SimpleFormIterator>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
        <ArrayInput source="tests" label="Tests">
          <SimpleFormIterator>
            <ReferenceInput source="test" label="Test" reference="tests">
              <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ArrayInput source="dates" label="Dates">
              <SimpleFormIterator>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Nutritional planning</Typography>
        <TextInput source="nutrition.preWorkout" label="Pre-workout" />
        <TextInput source="nutrition.postWorkout" label="Post-workout" />
        <TextInput source="nutrition.general" label="General recommendations" />
        <Typography>Sleep hygiene</Typography>
        <TextInput
          source="sleep.general"
          label="General recommendations"
          multiline
        />
        <ArrayInput source="education" label="Educational resources">
          <SimpleFormIterator>
            <ReferenceInput label="Article" reference="education">
              <AutocompleteInput optionText="title" />
            </ReferenceInput>
            color="primary"
          </SimpleFormIterator>
        </ArrayInput>
        <Button
          onClick={async () => {
            try {
              await send(user);
              toast.success('Plan sent');
              setSent(true);
            } catch (e) {
              toast.error('Error sending plan');
            }
          }}
          disabled={sent || loading}
          variant="contained"
          color="primary">
          Send
        </Button>
      </SimpleForm>
    </Edit>
  );
};
