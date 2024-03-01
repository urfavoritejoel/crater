import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Profile from '../components/Profile';
import Layout from './Layout';
import Splash from '../components/Splash';
import NewThemeForm from '../components/Themes';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "themes/new",
        element: <NewThemeForm />,
      },
    ],
  },

]);
