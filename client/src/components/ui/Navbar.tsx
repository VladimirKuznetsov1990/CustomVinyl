import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React from 'react';
import { Link } from 'react-router-dom';
import { openModal } from '../../redux/slices/modal/modalSlice';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { logoutThunk } from '../../redux/slices/auth/authThunks';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

const scrollToElement = (elementId: string, offset: number = 0, duration: number = 1000): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const startingY = window.pageYOffset;
  const diff = elementPosition - startingY + offset;
  let start: number | null = null;

  window.requestAnimationFrame(function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
};

export default function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);

  const scrollToAbout = (): void => {
    scrollToElement('about', -240, 1000);
  };

  const scrollToOurWorks = (): void => {
    scrollToElement('our-works', 0, 2000);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        boxShadow: 'none',
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
              CustomVinyl
            </Typography>
            <Link to="/#about">
              <Button onClick={scrollToAbout} variant="text" sx={{ color: 'white' }}>
                О нас
              </Button>
            </Link>
            <Link to="/#our-works">
              <Button onClick={scrollToOurWorks} variant="text" sx={{ color: 'white' }}>
                Наши работы
              </Button>
            </Link>
            <Link to="/contacts">
              <Button variant="text" sx={{ color: 'white' }}>
                Контакты
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="text" sx={{ color: 'white' }}>
                FAQ
              </Button>
            </Link>
            <Link to="/order">
              <Button variant="text" sx={{ color: 'white' }}>
                Оформить заказ
              </Button>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ mr: 2 }}>
              Привет, {user.status === 'logged' ? user.userName : 'Гость'}
            </Typography>
            {user.status === 'guest' && (
              <>
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
              </>
            )}
            {user.status === 'logged' && (
              <>
                <Button
                  variant="text"
                  sx={{ color: 'white' }}
                  onClick={() => {
                    void dispatch(logoutThunk());
                  }}
                >
                  Выйти
                </Button>
                <Link to="/account">
                  <Button variant="text" sx={{ color: 'white' }}>
                    Личный кабинет
                  </Button>
                </Link>
                <Link to="/cart">
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
