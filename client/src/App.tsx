import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRouter from './components/hocs/PrivateRouter';
import { checkUserThunk } from './redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import AccountPage from './components/pages/AccountPage';
import MainPage from './components/pages/MainPage';
import CartPage from './components/pages/CartPage';
import OrderPage from './components/pages/OrderPage';
import Layout from './components/Layout';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage/>,
        },
        {
          element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/" />,
          children: [
            {
              path: '/account',
              element: <AccountPage/>,
            },
            {
              path: '/cart',
              element: <CartPage />,
            },
            {
              path: '/order',
              element: <OrderPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
