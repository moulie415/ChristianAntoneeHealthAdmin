import * as React from 'react';
import {
  ExerciseList,
  ExerciseShow,
  ExerciseCreate,
  ExerciseEdit,
} from './exercises';
import {Admin, Resource} from 'react-admin';
import {FirebaseDataProvider, FirebaseAuthProvider} from 'react-admin-firebase';
import firebase from 'firebase/compat/app';
import {firebaseConfig} from './FIREBASE_CONFIG';
import CustomLoginPage from './CustomLoginPage';
import {TestCreate, TestEdit, TestList, TestShow} from './tests';
import {
  QuickRoutineCreate,
  QuickRoutineEdit,
  QuickRoutineList,
  QuickRoutineShow,
} from './quickRoutines';
import {
  EducationCreate,
  EducationEdit,
  EducationList,
  EducationShow,
} from './education';
import {SettingsEdit, SettingsList, SettingsShow} from './settings';
import {initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check';
import {
  PlanRequestCreate,
  PlanRequestEdit,
  PlanRequestList,
  PlanRequestShow,
} from './PlanRequests';
import {UserCreate, UserEdit, UserList, UserShow} from './users';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6Lft57sdAAAAAEQYT85mxqG4BsdFV4L6Gn3Ir9BY'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

const authProvider = FirebaseAuthProvider(firebaseConfig);
const dataProvider = FirebaseDataProvider(firebaseConfig, {
  logging: true,
  // rootRef: 'rootrefcollection/QQG2McwjR2Bohi9OwQzP',
  app: firebaseApp,
  // watch: ['posts'];
  // dontwatch: ['comments'];
  persistence: 'local',
  // disableMeta: true
  dontAddIdFieldToDoc: true,
  lazyLoading: {
    enabled: true,
  },
  firestoreCostsLogger: {
    enabled: true,
  },
});

class App extends React.Component {
  render() {
    return (
      <Admin
        loginPage={CustomLoginPage}
        dataProvider={dataProvider}
        authProvider={authProvider}>
        <Resource
          name="exercises"
          list={ExerciseList}
          show={ExerciseShow}
          create={ExerciseCreate}
          edit={ExerciseEdit}
        />
        <Resource
          name="tests"
          list={TestList}
          show={TestShow}
          create={TestCreate}
          edit={TestEdit}
        />
        <Resource
          name="quickRoutines"
          list={QuickRoutineList}
          show={QuickRoutineShow}
          create={QuickRoutineCreate}
          edit={QuickRoutineEdit}
          options={{label: 'Workouts'}}
        />
        <Resource
          name="education"
          list={EducationList}
          show={EducationShow}
          create={EducationCreate}
          edit={EducationEdit}
        />
        <Resource
          name="settings"
          list={SettingsList}
          show={SettingsShow}
          edit={SettingsEdit}
        />
        <Resource
          name="users"
          options={{label: 'Plan requests'}}
          list={PlanRequestList}
          show={PlanRequestShow}
          create={PlanRequestCreate}
          edit={PlanRequestEdit}
        />
        {/* <Resource
          name="users"
          // icon={UserIcon}
          list={UserList}
          show={UserShow}
          create={UserCreate}
          edit={UserEdit}
        /> */}
      </Admin>
    );
  }
}

export default App;
