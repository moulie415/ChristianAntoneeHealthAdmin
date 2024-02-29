import BookIcon from '@mui/icons-material/Book';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SettingsIcon from '@mui/icons-material/Settings';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TimerIcon from '@mui/icons-material/Timer';
import {ReCaptchaV3Provider, initializeAppCheck} from 'firebase/app-check';
import {User, getAuth, onAuthStateChanged} from 'firebase/auth';
import firebase from 'firebase/compat/app';
import {collection, getDocs, getFirestore, query} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';
import {getMessaging} from 'firebase/messaging/sw';
import {getStorage} from 'firebase/storage';
import {useEffect, useState} from 'react';
import {
  Admin,
  CustomRoutes,
  RaThemeOptions,
  Resource,
  defaultTheme,
} from 'react-admin';
import {FirebaseAuthProvider, FirebaseDataProvider} from 'react-admin-firebase';
import 'react-chat-elements/dist/main.css';
import {Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {firebaseConfig} from './FIREBASE_CONFIG';
import CustomLoginPage from './auth/CustomLoginPage';
import colors from './colors';
import MyLayout from './common/MyLayout';
import UserIcon from './common/UserIcon';
import ChatContextProvider from './context/ChatContextProvider';
import {
  EducationCreate,
  EducationEdit,
  EducationList,
  EducationShow,
} from './education/education';
import {
  ExerciseCreate,
  ExerciseEdit,
  ExerciseList,
  ExerciseShow,
} from './exercises/exercises';
import {FeedbackList, FeedbackShow} from './feedback/Feedback';
import Chat from './messaging/Chat';
import Messaging from './messaging/Messaging';
import {PlansCreate, PlansEdit, PlansList, PlansShow} from './plans/Plans';
import PremiumUsers from './premiumUsers/PremiumUsers';
import {
  QuickRoutineCreate,
  QuickRoutineEdit,
  QuickRoutineList,
  QuickRoutineShow,
} from './quickRoutines/quickRoutines';
import {
  RecipesCreate,
  RecipesEdit,
  RecipesList,
  RecipesShow,
} from './recipes/Recipes';
import {SettingsEdit, SettingsList, SettingsShow} from './settings/settings';
import {TestCreate, TestEdit, TestList, TestShow} from './tests/tests';
import {UsersEdit, UsersList, UsersShow} from './users/users';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const functions = getFunctions(firebaseApp);
export const storage = getStorage(firebaseApp);
export const messaging = getMessaging(firebaseApp);
export const auth = getAuth(firebaseApp);

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
const authProvider = FirebaseAuthProvider(firebaseConfig, {});

if (process.env.NODE_ENV !== 'development') {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(
      '6Lft57sdAAAAAEQYT85mxqG4BsdFV4L6Gn3Ir9BY',
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  });
}

const theme: RaThemeOptions = {
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    // primary: {
    //   main: colors.appBlue,
    // },
    secondary: {
      main: colors.appBlue,
    },
  },
};

const App = () => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          setLoading(true);
          const settingsQuery = query(collection(db, 'settings'));
          const settings = (await getDocs(settingsQuery)).docs[0]?.data();
          if (!settings.admins.includes(user.uid)) {
            await auth.signOut();
            document.location.href = '/';
          }
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      }
      setUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ChatContextProvider user={user}>
      <Admin
        loginPage={CustomLoginPage}
        layout={MyLayout}
        theme={theme}
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
        <Resource
          name="recipes"
          list={RecipesList}
          show={RecipesShow}
          edit={RecipesEdit}
          create={RecipesCreate}
          icon={RestaurantIcon}
        />
        <Resource
          options={{label: 'Feedback'}}
          name="feedback"
          list={FeedbackList}
          show={FeedbackShow}
          icon={ThumbUpIcon}
        />
        <CustomRoutes>
          <Route path="premium-users" element={<PremiumUsers />} />
          <Route path="messaging" element={<Messaging />} />
          <Route path="messaging/:id" element={<Chat />} />
        </CustomRoutes>
      </Admin>

      <ToastContainer />
    </ChatContextProvider>
  );
};

export default App;
