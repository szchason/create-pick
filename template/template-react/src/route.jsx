import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from '@/components/Home';
import About from '@/components/About';

const RouteArr = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
];

function Routes() {
  return useRoutes(RouteArr);
}

export default Routes;
