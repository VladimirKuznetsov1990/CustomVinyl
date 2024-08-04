/* eslint-disable no-plusplus */
import React, { useEffect, useRef } from 'react';
import './SpinnerUi.scss';

type SpinnerUiProps = {
  id: string;
  labelColor: string;
  size: number;
};

export default function SpinnerUi ({ id, labelColor, size }: SpinnerUiProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const recordRadius: number = size / 2 - 5;
    const st: number = recordRadius + 5;
    const pen = canvas.getContext('2d');

    if (!pen) return;

    // Record
    pen.beginPath();
    pen.shadowBlur = 6;
    pen.shadowColor = 'black';
    pen.arc(st, st, recordRadius, 0, 2 * Math.PI, false);
    pen.fill();

    // Record label
    pen.shadowBlur = 0;
    pen.fillStyle = labelColor;
    pen.beginPath();
    pen.arc(st, st, recordRadius / 3, 0, 2 * Math.PI, false);
    pen.fill();

    // Record grooves
    const gradient = pen.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, '#000');
    gradient.addColorStop(0.5, '#555');
    gradient.addColorStop(1, '#000');
    pen.strokeStyle = gradient;

    const grooves = [
      {
        r: 1.2,
        begin: (2 * Math.PI) / 3,
        end: 0,
      },
      {
        r: 1.35,
        begin: Math.PI,
        end: Math.PI / 4,
      },
      {
        r: 1.6,
        begin: Math.PI / 2,
        end: 0,
      },
    ];

    for (let i = 0; i < grooves.length; i++) {
      const g = grooves[i];
      pen.beginPath();
      pen.arc(st, st, recordRadius / g.r, g.begin, g.end);
      pen.stroke();
    }

    // Cut the hole in the record
    pen.globalCompositeOperation = 'destination-out';
    pen.beginPath();
    pen.arc(st, st, recordRadius / 8, 0, 2 * Math.PI, false);
    pen.fill();
  }, [labelColor, size]);

  return (
    <div className="spinner" style={{ width: size, height: size }}>
      <canvas id={id} ref={canvasRef} width={size} height={size} />
    </div>
  );
};
