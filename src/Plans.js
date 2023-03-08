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
                <ReferenceInput
                  source="exercise"
                  label="Exercise"
                  perPage={200}
                  reference="exercises">
                  <AutocompleteInput
                    validate={[required()]}
                    optionText="name"
                  />
                </ReferenceInput>
                <TextInput source="sets" label="Sets" />
                <TextInput source="reps" label="Reps" />

                <TextInput source="resistanceScale" label="Resistance scale" />
                <TextInput source="duration" label="Duration" />
                <TextInput source="restTime" label="Rest time" />
                <TextInput source="notes" label="Additional notes" multiline />
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
            <ReferenceInput source="test" label="Test" reference="tests">
              <AutocompleteInput optionText="name" />
            </ReferenceInput>
            <ArrayInput source="dates" label="Dates">
              <SimpleFormIterator inline>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Nutritional planning</Typography>
        <TextInput
          source="nutrition.preWorkout"
          label="Pre-workout"
          defaultValue=""
        />
        <TextInput
          source="nutrition.postWorkout"
          label="Post-workout"
          defaultValue=""
        />
        <TextInput
          source="nutrition.general"
          label="General recommendations"
          defaultValue=""
        />
        <Typography>Sleep hygiene</Typography>
        <TextInput
          source="sleep.general"
          label="General recommendations"
          multiline
          defaultValue=""
        />
        <ArrayInput
          defaultValue={[]}
          source="education"
          label="Educational resources">
          <SimpleFormIterator inline>
            <ReferenceInput label="Article" reference="education">
              <AutocompleteInput optionText="title" />
            </ReferenceInput>
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
                <ReferenceInput
                  source="exercise"
                  perPage={200}
                  label="Exercise"
                  reference="exercises">
                  <AutocompleteInput
                    validate={[required()]}
                    optionText="name"
                  />
                </ReferenceInput>
                <TextInput source="sets" label="Sets" />
                <TextInput source="reps" label="Reps" />

                <TextInput source="resistanceScale" label="Resistance scale" />
                <TextInput source="duration" label="Duration" />
                <TextInput source="restTime" label="Rest time" />
                <TextInput source="notes" label="Additional notes" multiline />
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
            <ReferenceInput source="test" label="Test" reference="tests">
              <AutocompleteInput validate={[required()]} optionText="name" />
            </ReferenceInput>
            <ArrayInput validate={[required()]} source="dates" label="Dates">
              <SimpleFormIterator>
                <DateInput label="Date" />
              </SimpleFormIterator>
            </ArrayInput>
          </SimpleFormIterator>
        </ArrayInput>
        <Typography>Nutritional planning</Typography>
        <TextInput
          source="nutrition.preWorkout"
          label="Pre-workout"
          defaultValue=""
        />
        <TextInput
          source="nutrition.postWorkout"
          label="Post-workout"
          defaultValue=""
        />
        <TextInput
          source="nutrition.general"
          label="General recommendations"
          defaultValue=""
        />
        <Typography>Sleep hygiene</Typography>
        <TextInput
          source="sleep.general"
          label="General recommendations"
          multiline
          defaultValue=""
        />
        <ArrayInput
          defaultValue={[]}
          source="education"
          label="Educational resources">
          <SimpleFormIterator inline>
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
        <DuplicatePlanButton loading={loading} setLoading={setLoading} />
      </SimpleForm>
    </Edit>
  );
};
