import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Materials from './pages/Materials';
import Attendance from './pages/Attendance';
import Results from './pages/Results';
import NoticeBoard from './pages/NoticeBoard';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Help from './pages/Help';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'courses', element: <Courses /> },
      { path: 'materials', element: <Materials /> },
      { path: 'attendance', element: <Attendance /> },
      { path: 'results', element: <Results /> },
      { path: 'notice-board', element: <NoticeBoard /> },
      { path: 'messages', element: <Messages /> },
      { path: 'settings', element: <Settings /> },
      { path: 'help', element: <Help /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
