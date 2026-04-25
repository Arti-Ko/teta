"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.05 }
    );
    obs.observe(canvas);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let W = 0, H = 0;
    let t = 0;
    let entry = 0;
    let raf = 0;

    const N = 14;
    const bases = Array.from({ length: N }, (_, i) =>
      0.25 + 0.35 * Math.sin(i * 0.9 + 1) + 0.15 * Math.sin(i * 0.4)
    );

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = canvas.width = rect.width * dpr;
      H = canvas.height = rect.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const getPoints = () => bases.map((b, i) => {
      const v = Math.max(0.08, Math.min(0.92,
        b + 0.08 * Math.sin(t * 1.2 + i * 0.7) + 0.04 * Math.sin(t * 2.7 + i * 1.3)
      ));
      return { x: (i / (N - 1)) * W, y: H - v * H * 0.72 - H * 0.06 };
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.004;
      entry = Math.min(1, entry + 0.007);

      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const rgb = isDark ? "210,208,200" : "20,20,18";

      const pts = getPoints();
      const clipX = entry * W;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, clipX, H);
      ctx.clip();

      // Fill under curve
      const gradFill = ctx.createLinearGradient(0, H, 0, 0);
      gradFill.addColorStop(0,    `rgba(${rgb},0.7)`);  // низ — тёмнее
      gradFill.addColorStop(0.4,  `rgba(${rgb},0.3)`);  // быстрее спадает
      gradFill.addColorStop(1,    `rgba(${rgb},0)`);      // верх прозрачный

      // tension < 0.5 → less smooth (0 = straight lines, 0.5 = full bezier)
      const tension = 0.22;

      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1], c = pts[i];
        const dx = c.x - p.x;
        ctx.bezierCurveTo(p.x + dx * tension, p.y, c.x - dx * tension, c.y, c.x, c.y);
      }
      ctx.lineTo(pts[pts.length - 1].x, H);
      ctx.closePath();
      ctx.fillStyle = gradFill;
      ctx.fill();

      // Stroke
      const gradLine = ctx.createLinearGradient(0, H, 0, 0);
      gradLine.addColorStop(0, `rgba(${rgb},0.6)`);
      gradLine.addColorStop(0.45, `rgba(${rgb},0.22)`);
      gradLine.addColorStop(1, `rgba(${rgb},0)`);

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1], c = pts[i];
        const dx = c.x - p.x;
        ctx.bezierCurveTo(p.x + dx * tension, p.y, c.x - dx * tension, c.y, c.x, c.y);
      }
      ctx.strokeStyle = gradLine;
      ctx.lineWidth = 1.5 * dpr;
      ctx.lineJoin = "round";
      ctx.stroke();

      // Dots
      pts.forEach((p) => {
        const relY = 1 - p.y / H;
        const a = Math.max(0.05, 0.55 - relY * 0.52);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.fill();
      });

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [started]);

  return <canvas ref={canvasRef} className="hero-chart-canvas" />;
}
