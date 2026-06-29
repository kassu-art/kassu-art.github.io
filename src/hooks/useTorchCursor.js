import { useCallback, useState } from 'react';

export function useTorchCursor() {
  const [torch, setTorch] = useState({ visible: false, x: 0, y: 0 });
  const [mask, setMask] = useState({ mx: '-200%', my: '-200%' });

  const handleMapMouseMove = useCallback(event => {
    if (window.innerWidth <= 768) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const mx = `${((event.clientX - rect.left) / rect.width * 100).toFixed(1)}%`;
    const my = `${((event.clientY - rect.top) / rect.height * 100).toFixed(1)}%`;

    setMask({ mx, my });
    setTorch({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  }, []);

  const handleMapMouseLeave = useCallback(() => {
    setMask({ mx: '-200%', my: '-200%' });
    setTorch(prev => ({
      ...prev,
      visible: false,
    }));
  }, []);

  return {
    torch,
    mask,
    handleMapMouseMove,
    handleMapMouseLeave,
  };
}
