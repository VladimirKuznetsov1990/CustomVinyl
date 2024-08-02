import React from 'react';
import { styled, keyframes } from '@mui/material/styles';

// Анимация вращения
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Стили для пластинки
const VinylRecord = styled('div')({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
  position: 'relative',
  animation: `${spin} 2s linear infinite`,
});

// Стили для центра пластинки
const VinylCenter = styled('div')({
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

// Стили для контейнера спиннера
const SpinnerContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

export default function SpinnerUi(): JSX.Element {
  return (
    <SpinnerContainer>
      <VinylRecord>
        <VinylCenter />
      </VinylRecord>
    </SpinnerContainer>
  );
}
  