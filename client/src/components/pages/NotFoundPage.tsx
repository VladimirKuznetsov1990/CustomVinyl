import { Container, Box } from '@mui/material';
import React from 'react';

export default function NotFoundPage(): JSX.Element {
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
      <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="90vh"
          sx={{ mb: { xs: 0, sm: 2 } }}
        >
          <Box
            component="img"
            src="/static/img/Vinyl-RE_RE.png"
            alt="Rotating"
            sx={{
              width: { xs: '300px', sm: '450px' },
              height: { xs: '300px', sm: '450px' },
              animation: 'rotate 10s linear infinite',
            }}
          />
        </Box>
      </Container>
    </Container>
  );
}
