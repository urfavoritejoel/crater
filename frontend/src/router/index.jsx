import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Profile from '../components/Profile/Profile';
import PageView from '../components/Pages/PageView';
import Layout from './Layout';
import Splash from '../components/Splash';
import NewPostForm from '../components/Posts/NewPostFormModal';
import NotFound from '../components/NotFound/NotFound';
import { EditThemeForm, NewThemeForm } from '../components/Themes';

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
        path: "posts/new",
        element: <NewPostForm />,
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
