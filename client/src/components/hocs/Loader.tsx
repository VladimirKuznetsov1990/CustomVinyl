import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme, Box } from '@mui/material';
import SpinnerUi from '../ui/SpinnerUi';

export default function Loader({
  showSpinner,
  children,
}: {
  showSpinner: boolean;
  children: React.ReactNode;
}): React.ReactNode | null {
  const [isLoading, setIsLoading] = useState(showSpinner);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (showSpinner) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [showSpinner]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Фон для спиннера
          zIndex: 1000, // Убедитесь, что спиннер находится поверх других элементов
        }}
      >
        <SpinnerUi id="record-canvas" labelColor="#00F1F2" size={isMobile ? 300 : 520} />
      </Box>
    );
  }
  return children;
}
