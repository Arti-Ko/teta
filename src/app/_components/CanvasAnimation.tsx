'use client';
import { useEffect } from 'react';

export default function CanvasAnimation() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/canvas-init.js';
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="canvasbox">
      <canvas
        id="heroCanvas"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      />
    </div>
  );
}
