import React from 'react';
import { Container, Typography, Box, Paper, Grid, CardMedia } from '@mui/material';

export default function ContactsPage(): JSX.Element {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '20px',
        backgroundImage: `url(/static/img/fon.gif)`,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100%'
      }}
    >
      <Box sx={{ marginTop: '100px' }}>
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            borderRadius: '8px',
            border: 'solid 2px #00FEFC'
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: '10px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white', textAlign: 'center' }}>
              Контакты:
            </Typography>
            <hr style={{ border: '1px solid white', margin: '20px 0' }} /> 
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
                  image="/static/img/map.png"
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
