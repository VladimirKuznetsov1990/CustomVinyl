import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const cartItems = [
  { id: '1', name: 'Пластинка 1', price: 1000, image: '/img/Vinyl_blue.png', format: 'LP' },
  { id: '2', name: 'Пластинка 2', price: 1500, image: '/img/Vinyl_red.png', format: 'EP' },
  { id: '3', name: 'Пластинка 3', price: 2000, image: '/img/Vinyl_green.png', format: 'Single' },
  { id: '4', name: 'Пластинка 4', price: 1000, image: '/img/Vinyl.png', format: 'Single' },
];

export default function CartPage(): JSX.Element {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '80px',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          backgroundColor: '#444',
          borderRadius: '8px',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'white', textAlign: 'center' }}
        >
          Корзина
        </Typography>
        <Box
          sx={{
            padding: '40px',
            border: '3px solid black',
            backgroundColor: 'white',
            borderRadius: '20px',
          }}
        >
          <Grid container spacing={2}>
            {cartItems.length === 0 ? (
              <Typography variant="h6" gutterBottom>
                Ваша корзина пуста.
              </Typography>
            ) : (
              cartItems.map((item) => (
                <Grid item xs={12} md={6} key={item.id}>
                  <Card sx={{ display: 'flex', mb: 2 }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ width: 150, height: 150 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                          {item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          {item.price} руб.
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                          Формат: {item.format}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
          {cartItems.length > 0 && (
            <Button variant="contained" color="primary" sx={{ mt: 2, width: '100%' }}>
              Оформить заказ
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
