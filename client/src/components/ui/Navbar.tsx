import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import { openModal } from '../../redux/slices/modal/modalSlice';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { logoutThunk } from '../../redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';


export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/candidates"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          {user.status === 'guest' && (
            <Box display="flex" alignItems="center">
              <Button
                variant="text"
                sx={{ color: 'white' }}
                onClick={() => dispatch(openModal({ modalType: 'login' }))}
              >
                Войти
              </Button>
              <Button
                variant="text"
                sx={{ color: 'white' }}
                onClick={() => dispatch(openModal({ modalType: 'signUp' }))}
              >
                Регистрация
              </Button>
              <SignUpModal />
              <LoginModal />
            </Box>
          )}
          <Typography>Привет, {user.status === 'logged' ? user.username : 'Гость'}</Typography>
          {user.status === 'logged' && (
            <>
              <Button
                variant="text"
                sx={{ color: 'black' }}
                onClick={() => {
                  void dispatch(logoutThunk());
                }}
              >
                Выйти
              </Button>
              <IconButton color="primary" aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
