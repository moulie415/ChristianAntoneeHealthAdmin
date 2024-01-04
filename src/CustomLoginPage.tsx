// LoginPage.js
import {Login, LoginComponent, LoginForm} from 'react-admin';
import StyledFirebaseAuth from 'react-firebaseui/dist/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import ForgotPasswordButton from './CustomForgotPassword';
import {FacebookAuthProvider, GoogleAuthProvider} from 'firebase/auth';

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '#/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    FacebookAuthProvider.PROVIDER_ID,
  ],
};

const SignInScreen = () => (
  // @ts-ignore
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const CustomLoginForm: LoginComponent = props => (
  <div>
    <div style={{fontFamily: 'monospace', marginLeft: '15px'}}>
      <p>Username: test@example.com</p>
      <p>Password: password</p>
    </div>
    <LoginForm {...props} />
    <ForgotPasswordButton {...props} />
    <SignInScreen />
  </div>
);

const CustomLoginPage: LoginComponent = props => (
  <Login {...props}>
    <CustomLoginForm {...props} />
  </Login>
);

export default CustomLoginPage;
