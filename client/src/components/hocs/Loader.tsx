import React from 'react';
import SpinnerUi from '../ui/SpinnerUi';

export default function Loader({ showSpinner, children }: { showSpinner: boolean; children: React.ReactNode }): React.ReactNode | null {
  if (showSpinner) {
    return <SpinnerUi />;
  }
  return children;
}