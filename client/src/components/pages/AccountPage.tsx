import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import React from 'react';

export default function AccountPage(): JSX.Element {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Ваши заказы
      </Typography>
      <Typography variant="body1" paragraph>
        Добро пожаловать на страницу заказов. Здесь вы можете просмотреть и управлять своими
        заказами.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Заказ #12345
              </Typography>
              <Typography variant="body2">Статус: В ожидании</Typography>
              <Typography variant="body2">Итого: 100.00 руб.</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Подробнее
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Заказ #67890
              </Typography>
              <Typography variant="body2">Статус: Доставлен</Typography>
              <Typography variant="body2">Итого: 200.00 руб.</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Подробнее
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Заказ #24680
              </Typography>
              <Typography variant="body2">Статус: Отменен</Typography>
              <Typography variant="body2">Итого: 150.00 руб.</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Подробнее
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
