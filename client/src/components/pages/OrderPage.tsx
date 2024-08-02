import React from 'react';
import { Container, Typography, OutlinedInput, FormControl, InputLabel } from '@mui/material';

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
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          value="111"
          label="Amount"
        />
      </FormControl>
    </Container>
  );
}
