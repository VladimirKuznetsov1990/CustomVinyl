import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToAbout = (): void => {
    scrollToElement('about', -260, 1000);
  };

  const scrollToOurWorks = (): void => {
    scrollToElement('our-works', 0, 2000);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/#about" onClick={scrollToAbout}>
          <ListItemText primary="О нас" />
        </ListItem>
        <ListItem button component={Link} to="/#our-works" onClick={scrollToOurWorks}>
          <ListItemText primary="Наши работы" />
        </ListItem>
        <ListItem button component={Link} to="/contacts">
          <ListItemText primary="Контакты" />
        </ListItem>
        <ListItem button component={Link} to="/faq">
          <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem button component={Link} to="/order">
          <ListItemText primary="Оформить заказ" />
        </ListItem>
      </List>
    </Box>
  );

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
            {isMobile ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <>
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
              </>
            )}
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
                <Link to="/account">
                  <Button variant="text" sx={{ color: 'white' }}>
                    Личный кабинет
                  </Button>
                </Link>
                <Button
                  variant="text"
                  sx={{ color: 'white' }}
                  onClick={() => {
                    void dispatch(logoutThunk());
                  }}
                  >
                  Выйти
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </AppBar>
  );
}
