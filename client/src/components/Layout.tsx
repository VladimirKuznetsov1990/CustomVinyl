import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './ui/Navbar';
import Loader from './hocs/Loader';
import { useAppSelector } from '../hooks/reduxHooks';

export default function Layout(): JSX.Element {
  const user = useAppSelector((store) => store.auth.userStatus);
  console.log(user.status);

  return (
    <Loader showSpinner={user.status === 'fetching'}>
      <Container style={{ padding: '0', margin: '0', maxWidth: 'none' }}>
        <>
          <Navbar />
          <Outlet />
        </>
      </Container>
    </Loader>
  );
}
