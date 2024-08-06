import { Container, Box, Typography } from '@mui/material';
import React from 'react';

export default function NotFoundPage(): JSX.Element {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: '1px',
      }}
    >
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px', color: 'white'}}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="90vh"
        >
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Page Not Found
          </Typography>
          <Typography variant="body1" component="p">
            Sorry, the page you are looking for does not exist.
          </Typography>
        </Box>
      </Container>
    </Container>
  );
}
