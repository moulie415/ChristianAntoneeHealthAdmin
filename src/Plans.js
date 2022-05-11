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
  DateField,
} from 'react-admin';
import {doc, getDoc} from 'firebase/firestore';
import {db} from './App';
import {useFormState} from 'react-final-form';
import {toast} from 'react-toastify';
import {getFunctions, httpsCallable} from 'firebase/functions';
import {makeStyles} from '@material-ui/styles';
import DuplicatePlanButton from './DuplicatePlanButton';
import SendPlanButton from './SendPlanButton';

const useIteratorStyle = makeStyles(() => ({
  root: {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  line: {
    border: 0,
  },
  input: {
    width: 200,
    marginRight: 10,
  },
}));

const useDateIteratorStyle = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}));

export const PlansList = props => (
  <List
    {...props}
    bulkActionButtons={false}
    sort={{field: 'createdate', order: 'DESC'}}>
    <Datagrid>
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

const send = async uid => {
  const functions = getFunctions();
  const sendPlan = httpsCallable(functions, 'sendPlan');
  await sendPlan({value: uid});
};

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
  const iteratorClasses = useIteratorStyle();
  const dateIteratorClasses = useDateIteratorStyle();
  return (
    <Create {...props}>
      <SimpleForm>
        <UserInput setUser={setUser} />

        <ArrayInput source="workouts">
          <SimpleFormIterator>
            <TextInput source="name" label="Workout name" />
            <ArrayInput source="exercises" label="Exercises">
              <SimpleFormIterator classes={iteratorClasses}>
                <ReferenceInput
                  className={iteratorClasses.input}
                  source="exercise"
                  label="Exercise"
                  reference="exercises">
                  <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <TextInput
                  className={iteratorClasses.input}
                  source="sets"
                  label="Sets"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="reps"
                  label="Reps"
                />

                <TextInput
                  className={iteratorClasses.input}
                  source="resistanceScale"
                  label="Resistance scale"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="duration"
                  label="Duration"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="restTime"
                  label="Rest time"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="notes"
                  label="Additional notes"
                  multiline
                />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput source="dates" label="Dates">
              <SimpleFormIterator classes={dateIteratorClasses}>
                <DateInput label="Date" style={{width: 150}} />
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
              <SimpleFormIterator classes={dateIteratorClasses}>
                <DateInput label="Date" style={{width: 150}} />
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
        <SendPlanButton
          onClick={async () => {
            try {
              setLoading(true);
              await send(user);
              setSent(true);
              toast.success('Plan sent');
              setLoading(false);
            } catch (e) {
              setLoading(false);
              toast.error('Error sending plan');
            }
          }}
          sent={sent}
          loading={loading}
        />
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
  const iteratorClasses = useIteratorStyle();
  const dateIteratorClasses = useDateIteratorStyle();
  return (
    <Edit {...props}>
      <SimpleForm>
        <UserField setUser={setUser} />
        <ArrayInput {...props} source="workouts">
          <SimpleFormIterator>
            <TextInput source="name" label="Workout name" />
            <ArrayInput source="exercises" label="Exercises">
              <SimpleFormIterator classes={iteratorClasses}>
                <ReferenceInput
                  className={iteratorClasses.input}
                  source="exercise"
                  label="Exercise"
                  reference="exercises">
                  <AutocompleteInput optionText="name" />
                </ReferenceInput>
                <TextInput
                  className={iteratorClasses.input}
                  source="sets"
                  label="Sets"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="reps"
                  label="Reps"
                />

                <TextInput
                  className={iteratorClasses.input}
                  source="resistanceScale"
                  label="Resistance scale"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="duration"
                  label="Duration"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="restTime"
                  label="Rest time"
                />
                <TextInput
                  className={iteratorClasses.input}
                  source="notes"
                  label="Additional notes"
                  multiline
                />
              </SimpleFormIterator>
            </ArrayInput>
            <ArrayInput {...props} source="dates" label="Dates">
              <SimpleFormIterator classes={dateIteratorClasses}>
                <DateInput label="Date" style={{width: 150}} />
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
              <SimpleFormIterator classes={dateIteratorClasses}>
                <DateInput label="Date" style={{width: 150}} />
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
        <SendPlanButton
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
        />
        <DuplicatePlanButton
          loading={loading}
          setLoading={setLoading}
          history={props.history}
        />
      </SimpleForm>
    </Edit>
  );
};
