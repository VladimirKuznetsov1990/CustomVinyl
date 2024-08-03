import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  OutlinedInput,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Box,
  CardMedia,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getFormatVinylThunk } from '../../redux/slices/formatVinyl/formatVinylThunk';
import { addOrderThunk } from '../../redux/slices/order/orderThunk';

export default function OrderPage(): JSX.Element {
  const formatVinyls = useAppSelector((state) => state.format.data);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.auth.userStatus);

  useEffect(() => {
    void dispatch(getFormatVinylThunk());
  }, [dispatch]);


  // todo логика для добавления нового заказа 
  const [totalPrice, setTotalPrice] = useState(0)


  const [formDataOrder, setFormDataOrder] = useState({
    userId: 0,
    status: '',
    totalPrice: 0,
  });

  const OrderHandleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    void dispatch(addOrderThunk({ formDataOrder }));
    if (!user) {
      setFormDataOrder({
        userId: user.id,
        status: 'newOrder',
        totalPrice: totalPrice,
      });
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '80px',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: 'white', textAlign: 'center' }}
      >
        Оформление заказа
      </Typography>
      <Box sx={{ padding: '40px', border: '3px solid black' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <CardMedia
                component="img"
                image="/img/vin-middle.png"
                alt="Vinyl"
                sx={{ maxWidth: '100%', height: '500px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={OrderHandleSubmit}>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput id="outlined-adornment-amount" value="111" label="Amount" />
              </FormControl>
              {formatVinyls.map((el) => (
                <div key={el.id}>{el.format}</div>
              ))}
              <Button type="submit" variant="contained" color="primary">
                Отправить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
