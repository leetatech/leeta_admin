import {lazy} from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import routeNames from './RouteNames';
import SignIn from '../view/pages/auth/Signin';
import { Navigate } from 'react-router-dom';

// Import lazy-loaded components
const DashboardLayout = lazy(async () => await import('../view/wrappers/dashboard/DashboardLayout'));
const Dashboard = lazy(async () => await import('../view/pages/Dashboard/Dashboard'));
const Orders = lazy(async () => await import('../view/pages/Orders/orders'));
const Vendors = lazy(async () => await import('../view/pages/Vendors/vendors'));
const Settings = lazy(async () => await import('../view/pages/Settings'));

const Router = () => {
  const routes = [
    { path: routeNames.signin, element: <SignIn /> },
    {
      path: routeNames.home,
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Navigate to={routeNames.dashboard} replace /> },
        { path: routeNames.dashboard, element: <Dashboard /> },
        { path: routeNames.orders, element: <Orders /> },
        { path: routeNames.vendors, element: <Vendors /> },
        { path: routeNames.settings, element: <Settings />},
      ],
    },
    {
      path: routeNames.noWhere,
      element: <>Page Not Found</>,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
