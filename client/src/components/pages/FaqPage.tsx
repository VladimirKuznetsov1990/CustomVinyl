import { Container, Box, Paper, Typography } from '@mui/material';
import React from 'react';

export default function FaqPage(): JSX.Element {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '1px',
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
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
              О нашем магазине:
            </Typography>
            <Box sx={{ marginBottom: '20px', color: 'white' }}>
              <Typography variant="body1" gutterBottom>
                В нашем магазине вы найдете уникальные виниловые пластинки, которые мы красим и наносим на них изображения по вашему заказу. Также мы предлагаем услугу записи ваших любимых треков на винил. Создайте свою идеальную коллекцию с нами!
              </Typography>
            </Box>

            <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'white' }}>
              Часто задаваемые вопросы:
            </Typography>
            <Box sx={{ marginBottom: '20px', color: 'white' }}>
              <Typography variant="body1" gutterBottom>
                <strong>Вопрос 1:</strong> Как я могу заказать виниловую пластинку с изображением?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ответ: Вы можете заказать виниловую пластинку с изображением через наш сайт. Просто выберите нужный размер и загрузите изображение, которое вы хотите нанести на пластинку.
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Вопрос 2:</strong> Можно ли записать свои треки на винил?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ответ: Да, мы предлагаем услугу записи ваших любимых треков на винил. Просто отправьте нам ваши аудиофайлы, и мы запишем их на виниловую пластинку.
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Вопрос 3:</strong> Как долго занимает изготовление виниловой пластинки?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ответ: Изготовление виниловой пластинки занимает от 7 до 14 дней в зависимости от сложности заказа.
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Вопрос 4:</strong> Можно ли вернуть виниловую пластинку, если она мне не понравится?
              </Typography>
              <Typography variant="body1" gutterBottom>
                Ответ: Да, вы можете вернуть виниловую пластинку в течение 14 дней с момента получения, если она вам не понравится. Пожалуйста, свяжитесь с нашей службой поддержки для получения инструкций по возврату.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Container>
  );
}
