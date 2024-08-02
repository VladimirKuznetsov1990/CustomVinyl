import React from 'react';
import { Container, Typography} from '@mui/material';

export default function OrderPage(): JSX.Element {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '80px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
        Оформление заказа
      </Typography>
    </Container>
  );
}
