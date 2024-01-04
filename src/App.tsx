import BookIcon from '@mui/icons-material/Book';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import TimerIcon from '@mui/icons-material/Timer';
import firebase from 'firebase/compat/app';
import {ReCaptchaV3Provider, initializeAppCheck} from 'firebase/app-check';
import {getFirestore} from 'firebase/firestore';
import * as React from 'react';
import {Admin, CustomRoutes, Resource} from 'react-admin';
import {FirebaseAuthProvider, FirebaseDataProvider} from 'react-admin-firebase';
import {Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoginPage from './CustomLoginPage';
import {firebaseConfig} from './FIREBASE_CONFIG';
import MyLayout from './MyLayout';
import {PlansCreate, PlansEdit, PlansList, PlansShow} from './Plans';
import PremiumUsers from './PremiumUsers';
import UserIcon from './UserIcon';
import {
  EducationCreate,
  EducationEdit,
  EducationList,
  EducationShow,
} from './education';
import {
  ExerciseCreate,
  ExerciseEdit,
  ExerciseList,
  ExerciseShow,
} from './exercises';
import {
  QuickRoutineCreate,
  QuickRoutineEdit,
  QuickRoutineList,
  QuickRoutineShow,
} from './quickRoutines';
import {SettingsEdit, SettingsList, SettingsShow} from './settings';
import {TestCreate, TestEdit, TestList, TestShow} from './tests';
import {UsersEdit, UsersList, UsersShow} from './users';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider('6Lft57sdAAAAAEQYT85mxqG4BsdFV4L6Gn3Ir9BY'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

const authProvider = FirebaseAuthProvider(firebaseConfig, {});
const dataProvider = FirebaseDataProvider(firebaseConfig, {
  logging: process.env.NODE_ENV === 'development',
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
    enabled: process.env.NODE_ENV === 'development',
  },
});

class App extends React.Component {
  render() {
    // if (__VERSION__ === process.env.REACT_APP_VERSION || __DEV__) {
    return (
      <>
        <Admin
          loginPage={CustomLoginPage}
          layout={MyLayout}
          dataProvider={dataProvider}
          authProvider={authProvider}>
          <Resource
            name="exercises"
            list={ExerciseList}
            show={ExerciseShow}
            create={ExerciseCreate}
            edit={ExerciseEdit}
            icon={FitnessCenterIcon}
          />
          <Resource
            name="tests"
            list={TestList}
            show={TestShow}
            create={TestCreate}
            edit={TestEdit}
            icon={TimerIcon}
          />
          <Resource
            name="quickRoutines"
            list={QuickRoutineList}
            show={QuickRoutineShow}
            create={QuickRoutineCreate}
            edit={QuickRoutineEdit}
            options={{label: 'Workouts'}}
            icon={FitnessCenterIcon}
          />
          <Resource
            name="education"
            list={EducationList}
            show={EducationShow}
            create={EducationCreate}
            edit={EducationEdit}
            icon={BookIcon}
          />
          <Resource
            name="settings"
            list={SettingsList}
            show={SettingsShow}
            edit={SettingsEdit}
            icon={SettingsIcon}
          />
          <Resource
            name="users"
            list={UsersList}
            show={UsersShow}
            icon={UserIcon}
            edit={UsersEdit}
          />
          <Resource
            name="plans"
            list={PlansList}
            show={PlansShow}
            edit={PlansEdit}
            create={PlansCreate}
            icon={EventAvailableIcon}
          />
          <CustomRoutes>
            <Route path="premium-users" element={<PremiumUsers />} />
          </CustomRoutes>
        </Admin>

        <ToastContainer />
      </>
    );
  }
  //   return (
  //     <div
  //       style={{
  //         width: 600,
  //         maxWidth: '100%',
  //         padding: 20,
  //         paddingTop: 100,
  //         margin: 'auto',
  //         fontSize: 30,
  //         fontFamily: 'Arial',
  //       }}>
  //       You're not running the latest version of the CA Health admin, if you're
  //       on Windows please try Ctrl+F5, Shift+F5 or Ctrl+Shift+R, if you're on a
  //       Mac please try Shift+Command+R.
  //     </div>
  //   );
  // }
}

export default App;
