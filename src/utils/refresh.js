import { useEffect } from 'react';
export const refreshPage = () => {
  window.location.reload();
};

export const useRefreshTimer = (minutes) => {
  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log('Refreshing the page...');
        refreshPage();
      }, minutes * 60000);
    };
    resetTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [minutes]);
};
