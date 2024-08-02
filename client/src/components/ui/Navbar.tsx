import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import { Link } from 'react-router-dom';
import { openModal } from '../../redux/slices/modal/modalSlice';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { logoutThunk } from '../../redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);
  console.log(user.status);

  const scrollToAbout = (): void => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', boxShadow: 'none', position: 'absolute', zIndex: 1000,  }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
          <Typography>Привет, {user.status === 'logged' ? user.userName : 'Гость'}</Typography>
          {user.status === 'logged' && (
            <Box display="flex" alignItems="center">
              <Button
                variant="text"
                sx={{ color: 'white' }}
                onClick={() => {
                  void dispatch(logoutThunk());
                }}
              >
                Выйти
              </Button>
              <Link to="/#about">
                <Button onClick={scrollToAbout} variant="text" sx={{ color: 'white' }}>
                  О нас
                </Button>
              </Link>
              <Link to="/account">
                <Button variant="text" sx={{ color: 'white' }}>
                  Оформить заказ
                </Button>
              </Link>
              <Link to="/order">
                <Button variant="text" sx={{ color: 'white' }}>
                  Личный кабинет
                </Button>
              </Link>
              <Link to="/cart">
                <IconButton color="warning" aria-label="add to shopping cart">
                  <AddShoppingCartIcon />
                </IconButton>
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
