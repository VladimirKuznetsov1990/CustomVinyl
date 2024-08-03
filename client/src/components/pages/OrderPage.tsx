
import React, { useEffect } from 'react';
import { Container, Typography, OutlinedInput, FormControl, InputLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getFormatVinylThunk } from '../../redux/slices/formatVinyl/formatVinylThunk';


export default function OrderPage(): JSX.Element {

  const formatVinyls = useAppSelector((state) => state.format.data);
  const dispatch = useAppDispatch();
  console.log(formatVinyls);

  useEffect(() :void => {
    void dispatch(getFormatVinylThunk());
  }, [dispatch]);
  


  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '80px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
        Оформление заказа
        {formatVinyls.map((el) => <div>{el.format}</div>)}
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
