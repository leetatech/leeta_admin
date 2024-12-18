import React, { Suspense, lazy, useState } from 'react';
import { createBrowserRouter, RouterProvider, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { type RootState } from '../state';
import routeNames from './RouteNames';
import SignIn from '../view/pages/auth/Signin';

// Import lazy-loaded components
const DashboardLayout = lazy(async () => await import('../view/wrappers/dashboard/DashboardLayout'));
const Dashboard = lazy(async () => await import('../view/pages/dashboard/Dashboard'));
const Orders = lazy(async () => await import('../view/pages/Orders'));
const Settings = lazy(async () => await import('../view/pages/Settings'));

const Router = () => {
  const { auth } = useSelector((state: RootState) => state);

  const routes = [
    { path: routeNames.signin, element: <SignIn /> },
    {
      path: routeNames.home,
      element: <DashboardLayout />,
      children: [
        { path: routeNames.dashboard, element: <Dashboard /> },
        { path: routeNames.orders, element: <Orders /> },
        {path: routeNames.settings, element: <Settings />}
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
