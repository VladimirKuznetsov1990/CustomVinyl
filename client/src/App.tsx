import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PrivateRouter from './components/hocs/PrivateRouter';
import { checkUserThunk } from './redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import AccountPage from './components/pages/AccountPage';
import MainPage from './components/pages/MainPage';
// import CartPage from './components/pages/CartPage';
import OrderPage from './components/pages/OrderPage';
import Layout from './components/Layout';
import ContactsPage from './components/pages/ContactsPage';
import FaqPage from './components/pages/FaqPage';
import LoginModal from './components/ui/LoginModal';
import SignUpModal from './components/ui/SignUpModal';
import AuthRequiredModal from './components/ui/AuthRequiredModal';
import NotFoundPage from './components/pages/NotFoundPage';
import OrderSuccessModal from './components/ui/OrderSuccessModal'; // Импортируйте новую модалку

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);

  useEffect(() => {
    void dispatch(checkUserThunk());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          element: <PrivateRouter isAllowed={user.status === 'logged'} redirect="/" />,
          children: [
            {
              path: '/account',
              element: <AccountPage />,
            },
            // {
            //   path: '/cart',
            //   element: <CartPage />,
            // },
          ],
        },
        {
          element: <Layout />,
          children: [
            {
              path: '/contacts',
              element: <ContactsPage />,
            },
            {
              path: '/faq',
              element: <FaqPage />,
            },
            {
              path: '/order',
              element: <OrderPage />,
            },
          ],
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <LoginModal />
      <SignUpModal />
      <AuthRequiredModal />
      <OrderSuccessModal /> {/* Добавьте новую модалку */}
    </>
  );
}

export default App;
