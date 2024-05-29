
import React from 'react';
import usePWAInstallPrompt from '../pwaInstallPrompt';

const InstallButton = () => {
  const { deferredPrompt, isInstallable, setDeferredPrompt, setIsInstallable } = usePWAInstallPrompt();

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('PWA was installed');
      } else {
        console.log('PWA installation was dismissed');
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  if (!isInstallable) {
    return null;
  }

  return (
    <button onClick={handleInstallClick} className='btn_install'>
      Install PWA
    </button>
  );
};

export default InstallButton;
