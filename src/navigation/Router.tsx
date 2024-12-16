import React, { Suspense, lazy, useState } from 'react';
import { createBrowserRouter, RouterProvider, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { type RootState } from '../state';
import routeNames from './RouteNames';
import SignIn from '../view/pages/auth/Signin';

// Import lazy-loaded components
const Dashboard = lazy(async () => await import('../view/wrappers/dashboard/Dashboard'));

const Router = () => {
  const { auth } = useSelector((state: RootState) => state);

  const routes = [
    {
      path: routeNames.home,
      element: <Dashboard />,
      children: [{ path: routeNames.dashboard, element: <Dashboard /> }],
    },
    {
      path: routeNames.noWhere,
      element: <>Error</>,
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
