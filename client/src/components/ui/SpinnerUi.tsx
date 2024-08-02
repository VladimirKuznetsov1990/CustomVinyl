import { Button, Spinner } from '@mui/material';
import { styled } from '@mui/material/styles';

const PositionedSpinner = styled('div')({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export default function SpinnerUi(): JSX.Element {
  return (
    <PositionedSpinner>
      <Button variant="contained" disabled>
        <Spinner size="small" thickness="medium" />
        <span className="visually-hidden">Loading...</span>
      </Button>
    </PositionedSpinner>
  );
}
