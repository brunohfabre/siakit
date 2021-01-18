import React, { useRef, useEffect, CanvasHTMLAttributes } from 'react';

const Charts: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function setCanvas(): void {
    const ctx = canvasRef.current?.getContext('2d');

    if (
      ctx?.canvas &&
      canvasRef.current?.parentElement?.offsetWidth &&
      canvasRef.current?.parentElement?.offsetHeight
    ) {
      ctx.canvas.width = canvasRef.current?.parentElement?.offsetWidth;
      ctx.canvas.height = canvasRef.current?.parentElement?.offsetHeight;
    }

    ctx?.beginPath();
    ctx?.moveTo(100, 400);

    // ctx?.lineTo(200, 300);
    ctx?.bezierCurveTo(150, 400, 150, 300, 200, 300);

    // ctx?.lineTo(300, 350);
    ctx?.bezierCurveTo(250, 300, 250, 350, 300, 350);

    // ctx?.lineTo(400, 100);
    ctx?.bezierCurveTo(350, 350, 350, 100, 400, 100);

    // ctx?.lineTo(500, 300);
    ctx?.bezierCurveTo(450, 100, 450, 300, 500, 300);

    // ctx?.lineTo(600, 200);
    ctx?.bezierCurveTo(550, 300, 550, 200, 600, 200);

    // ctx?.lineTo(700, 250);
    ctx?.bezierCurveTo(650, 200, 650, 250, 700, 250);

    // ctx?.lineTo(800, 350);
    ctx?.bezierCurveTo(750, 250, 750, 350, 800, 350);

    // ctx?.lineTo(900, 400);
    ctx?.bezierCurveTo(850, 350, 850, 400, 900, 400);

    ctx?.moveTo(100, 0);
    ctx?.lineTo(100, 500);

    ctx?.moveTo(200, 0);
    ctx?.lineTo(200, 500);

    ctx?.moveTo(300, 0);
    ctx?.lineTo(300, 500);

    ctx?.moveTo(400, 0);
    ctx?.lineTo(400, 500);

    ctx?.moveTo(500, 0);
    ctx?.lineTo(500, 500);

    ctx?.moveTo(600, 0);
    ctx?.lineTo(600, 500);

    ctx?.moveTo(700, 0);
    ctx?.lineTo(700, 500);

    ctx?.moveTo(800, 0);
    ctx?.lineTo(800, 500);

    ctx?.moveTo(900, 0);
    ctx?.lineTo(900, 500);

    ctx?.moveTo(0, 100);
    ctx?.lineTo(1000, 100);

    ctx?.moveTo(0, 200);
    ctx?.lineTo(1000, 200);

    ctx?.moveTo(0, 300);
    ctx?.lineTo(1000, 300);

    ctx?.moveTo(0, 400);
    ctx?.lineTo(1000, 400);

    ctx?.stroke();

    console.log('set canvas');
  }

  useEffect(() => {
    setCanvas();
  }, []);

  return (
    <div style={{ width: 600, height: 300 }}>
      <canvas ref={canvasRef} style={{ backgroundColor: 'tomato' }} />
    </div>
  );
};

export default Charts;
