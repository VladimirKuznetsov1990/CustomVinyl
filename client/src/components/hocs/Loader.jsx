import SpinnerUi from '../ui/SpinnerUi';

export default function Loader({ showSpinner, children }) {
  if (showSpinner) return <SpinnerUi />;
  return children;
}