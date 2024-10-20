import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/layout';
import { lazyLoad } from './lib/route-utils';
import IndexPage from './pages';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      {
        path: '/about',
        lazy: lazyLoad('pages/about'),
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
