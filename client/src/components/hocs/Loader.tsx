import React, { useState, useEffect } from 'react';
import SpinnerUi from '../ui/SpinnerUi';

export default function Loader({
  showSpinner,
  children,
}: {
  showSpinner: boolean;
  children: React.ReactNode;
}): React.ReactNode | null {
  const [isLoading, setIsLoading] = useState(showSpinner);

  useEffect(() => {
    if (showSpinner) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500); // 1-2 секунды
    }
  }, [showSpinner]);

  if (isLoading) {
    return (
      <div>
        <SpinnerUi id="record-canvas" labelColor="#00FF7F	" size={520} />
      </div>
    );
  }
  return children;
}
