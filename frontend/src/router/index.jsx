import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Profile from '../components/Profile/Profile';
import PageView from '../components/Pages/PageView';
import Layout from './Layout';
import Splash from '../components/Splash';
import NewPostForm from '../components/Posts/NewPostFormModal';

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
        path: "pages/:pageId",
        element: <PageView />,
      },
      {
        path: "posts/new",
        element: <NewPostForm />,
      },
    ],
  },

]);
