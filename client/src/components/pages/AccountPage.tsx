import { Container, Typography, Grid, Box, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import OrderCard from '../ui/OrderCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getOrdersThunk } from '../../redux/slices/order/orderThunk';

export default function AccountPage(): JSX.Element {
  const orders = useAppSelector((state) => state.order.data);
  const user = useAppSelector((state) => state.auth.userStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getOrdersThunk());
  }, [dispatch]);

  // Фильтрация заказов в зависимости от роли пользователя
  const filteredOrders = user.roleId === 1 ? orders : orders.filter(order => order.userId === user.id);

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '40px',
      }}
    >
      <Box sx={{ marginTop: '100px' }}>
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: '#333', // Темный фон для контраста
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: '20px',
              backgroundColor: '#444',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
              Ваши заказы
            </Typography>
            <Box sx={{ marginBottom: '20px', color: 'white' }}>
              <Typography variant="body1" gutterBottom>
                Добро пожаловать на страницу заказов. Здесь вы можете просмотреть и управлять своими
                заказами.
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '20px', color: 'white' }}>
              <Grid container spacing={3}>
                {filteredOrders.map((el) => (
                  <Grid item xs={12} key={el.id}>
                    <OrderCard order={el} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Container>
  );
}
