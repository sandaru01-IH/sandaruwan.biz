'use client';

import { useEffect, useRef } from 'react';
import { createCity, type CityLayer } from './city-renderer';

export default function CityScene({
  layer = 'form',
  paused = false,
  className = '',
}: {
  layer?: CityLayer;
  paused?: boolean;
  className?: string;
}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const city = useRef<ReturnType<typeof createCity> | null>(null);
  useEffect(() => {
    if (!canvas.current) return;
    city.current = createCity(canvas.current);
    return () => {
      city.current?.destroy();
      city.current = null;
    };
  }, []);
  useEffect(() => {
    city.current?.setLayer(layer);
  }, [layer]);
  useEffect(() => {
    city.current?.setPaused(paused);
  }, [paused]);
  return (
    <div className={`city-scene ${className}`}>
      <svg className="city-fallback" viewBox="0 0 600 500" aria-hidden="true">
        <path fill="#7d8c65" d="M40 300 300 145 560 300 300 455Z" />
        <path fill="#c0c4a6" d="M185 245 290 185 395 245 290 308Z" />
        <path fill="#e1dfcc" d="M185 245V145L290 85V185Z" />
        <path fill="#cbcbb6" d="M290 185V85L395 145V245Z" />
        <path fill="#f5f0de" d="M185 145 290 85 395 145 290 205Z" />
      </svg>
      <canvas
        ref={canvas}
        tabIndex={0}
        role="img"
        aria-label={`Interactive illustrative city model, ${layer === 'form' ? 'urban form' : layer === 'green' ? 'green spaces' : 'data intensity'} layer. Drag to rotate, or use left and right arrow keys.`}
      />
      <div className="city-control">
        <button aria-label="Rotate city left" onClick={() => city.current?.rotate(-0.25)}>
          ↶
        </button>
        <span>DRAG TO EXPLORE</span>
        <button aria-label="Rotate city right" onClick={() => city.current?.rotate(0.25)}>
          ↷
        </button>
      </div>
    </div>
  );
}
