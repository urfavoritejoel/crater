import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Profile from '../components/Profile';
import PageView from '../components/Pages/PageView';
import Layout from './Layout';
import Splash from '../components/Splash';
import NotFound from '../components/NotFound';
import EditThemeForm from '../components/Themes/EditThemeForm';
import NewThemeForm from '../components/Themes/NewThemeForm';

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
        path: "users/:userId/page",
        element: <PageView />,
      },
      {
        path: "themes/new",
        element: <NewThemeForm />,
      },
      {
        path: "themes/:themeId",
        element: <EditThemeForm />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

]);
