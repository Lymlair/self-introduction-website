// src/components/DiceRoller.tsx
import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

const DiceRoller: React.FC<{
  setRandomVal: React.Dispatch<React.SetStateAction<number>>;
}> = ({ setRandomVal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isRolling, setIsRolling] = useState(false);
  const [value, setValue] = useState(1); // 当前显示的点数

  // 绘制骰子（支持旋转角度和缩放）
  const drawDice = (
    ctx: CanvasRenderingContext2D,
    size: number,
    val: number,
    angle: number = 0,
    scale: number = 1,
  ) => {
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size / 2) * 0.85 * scale;

    ctx.save();
    ctx.clearRect(0, 0, size, size);
    ctx.translate(centerX, centerY);
    ctx.rotate(angle);
    ctx.translate(-centerX, -centerY);

    // 绘制骰子主体（圆角矩形）
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    const rectX = centerX - radius;
    const rectY = centerY - radius;
    const rectSize = radius * 2;
    const borderRadius = rectSize * 0.15;
    ctx.beginPath();
    ctx.moveTo(rectX + borderRadius, rectY);
    ctx.lineTo(rectX + rectSize - borderRadius, rectY);
    ctx.quadraticCurveTo(
      rectX + rectSize,
      rectY,
      rectX + rectSize,
      rectY + borderRadius,
    );
    ctx.lineTo(rectX + rectSize, rectY + rectSize - borderRadius);
    ctx.quadraticCurveTo(
      rectX + rectSize,
      rectY + rectSize,
      rectX + rectSize - borderRadius,
      rectY + rectSize,
    );
    ctx.lineTo(rectX + borderRadius, rectY + rectSize);
    ctx.quadraticCurveTo(
      rectX,
      rectY + rectSize,
      rectX,
      rectY + rectSize - borderRadius,
    );
    ctx.lineTo(rectX, rectY + borderRadius);
    ctx.quadraticCurveTo(rectX, rectY, rectX + borderRadius, rectY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 添加高光
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.moveTo(rectX + borderRadius, rectY);
    ctx.lineTo(rectX + rectSize - borderRadius, rectY);
    ctx.quadraticCurveTo(
      rectX + rectSize,
      rectY,
      rectX + rectSize,
      rectY + borderRadius,
    );
    ctx.lineTo(rectX + rectSize, rectY + rectSize * 0.3);
    ctx.lineTo(rectX, rectY + rectSize * 0.3);
    ctx.lineTo(rectX, rectY + borderRadius);
    ctx.quadraticCurveTo(rectX, rectY, rectX + borderRadius, rectY);
    ctx.closePath();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fill();

    // 绘制点数
    const dotRadius = radius * 0.12;
    const dotColor = '#333';
    ctx.fillStyle = dotColor;
    ctx.shadowBlur = 0;

    const positions: Record<number, [number, number][]> = {
      1: [[centerX, centerY]],
      2: [
        [centerX - radius * 0.4, centerY - radius * 0.4],
        [centerX + radius * 0.4, centerY + radius * 0.4],
      ],
      3: [
        [centerX - radius * 0.4, centerY - radius * 0.4],
        [centerX, centerY],
        [centerX + radius * 0.4, centerY + radius * 0.4],
      ],
      4: [
        [centerX - radius * 0.4, centerY - radius * 0.4],
        [centerX + radius * 0.4, centerY - radius * 0.4],
        [centerX - radius * 0.4, centerY + radius * 0.4],
        [centerX + radius * 0.4, centerY + radius * 0.4],
      ],
      5: [
        [centerX - radius * 0.4, centerY - radius * 0.4],
        [centerX + radius * 0.4, centerY - radius * 0.4],
        [centerX, centerY],
        [centerX - radius * 0.4, centerY + radius * 0.4],
        [centerX + radius * 0.4, centerY + radius * 0.4],
      ],
      6: [
        [centerX - radius * 0.4, centerY - radius * 0.4],
        [centerX + radius * 0.4, centerY - radius * 0.4],
        [centerX - radius * 0.4, centerY],
        [centerX + radius * 0.4, centerY],
        [centerX - radius * 0.4, centerY + radius * 0.4],
        [centerX + radius * 0.4, centerY + radius * 0.4],
      ],
    };

    for (const [x, y] of positions[val]) {
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  // 动画：旋转 + 随机点数
  const startRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = canvas.width;

    const duration = 500; // 动画持续时间（ms）
    const startTime = performance.now();
    let frame: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // 缓动效果：先加速后减速
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const angle = easeOutCubic * Math.PI * 4; // 旋转两圈
      const scale = 1 + Math.sin(progress * Math.PI) * 0.1; // 轻微缩放弹跳

      // 随机显示点数（模拟转动）
      const randomVal = Math.floor(Math.random() * 6) + 1;
      drawDice(ctx, size, randomVal, angle, scale);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        // 动画结束，生成最终点数
        const finalVal = Math.floor(Math.random() * 6) + 1;
        setValue(finalVal);
        setRandomVal(finalVal);
        drawDice(ctx, size, finalVal, 0, 1);
        setIsRolling(false);
        cancelAnimationFrame(frame);
      }
    };

    frame = requestAnimationFrame(animate);
    animationRef.current = frame;
  };

  // 组件挂载和更新时绘制骰子
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = canvas.width;
    drawDice(ctx, size, value, 0, 1);
  }, [value]);

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.diceContainer}>
      <canvas
        ref={canvasRef}
        width={150}
        height={150}
        className={styles.canvas}
      />
      <Button
        type="primary"
        size="large"
        onClick={startRoll}
        disabled={isRolling}
        className={styles.rollBtn}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </Button>
    </div>
  );
};

export default DiceRoller;
