import React from 'react';
import { Container, Typography, Box, Paper, Grid, CardMedia } from '@mui/material';

export default function ContactsPage(): JSX.Element {
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
            backgroundColor: '#333',
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
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
              Контакты:
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ marginBottom: '20px', color: 'white' }}>
                  <Typography variant="body1" gutterBottom>
                    Москва, ул. Орджоникидзе, 11 стр. 10 (м. Ленинский проспект)

                    
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    CustomVinyl
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    График работы: понедельник-пятница, с 10-00 до 19-00
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Оформляете заказы на сайте (КРУГЛОСУТОЧНО) или по телефону
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Тел. +7 (999) 999-99-99 (Пн-Пт с 10.00-19.00)
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    E-mail: info@customVinyl.ru
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    E-mail: info@customVinyl.pro
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <CardMedia
                  component="img"
                  image="/img/map.png"
                  alt="Карта магазина"
                  sx={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Container>
  );
}
