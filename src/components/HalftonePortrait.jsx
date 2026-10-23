import { useEffect, useRef } from "react";

export default function HalftonePortrait({ src, alt }) {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
    strength: 0,
    burstX: -1000,
    burstY: -1000,
    burst: 0,
  });

  useEffect(() => {
    const image = imageRef.current;
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!image || !canvas || !host || !context) {
      console.error("Halftone portrait could not initialize its canvas.");
      return undefined;
    }

    const sample = document.createElement("canvas");
    const sampleContext = sample.getContext("2d", { willReadFrequently: true });
    const reveal = document.createElement("canvas");
    const revealContext = reveal.getContext("2d");
    if (!sampleContext || !revealContext) {
      console.error("Halftone portrait could not initialize its canvas layers.");
      return undefined;
    }

    const pointer = pointerRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pixels;
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = 0;
    let alive = true;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sample.width = Math.max(1, Math.round(width));
      sample.height = Math.max(1, Math.round(height));
      reveal.width = sample.width;
      reveal.height = sample.height;

      if (!image.complete || !image.naturalWidth) return;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) * 0.38;
      sampleContext.clearRect(0, 0, width, height);
      sampleContext.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      try {
        pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
      } catch (error) {
        console.error("Halftone portrait could not read image pixels:", error);
        pixels = null;
      }
      render();
      canvas.classList.add("halftone-ready");
    };

    const render = (now = performance.now()) => {
      if (!pixels || !alive) return;
      const delta = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0;
      lastTime = now;
      const strengthTarget = pointer.active ? 1 : 0;
      pointer.strength += (strengthTarget - pointer.strength) * (reduceMotion ? 1 : Math.min(1, delta * 7));
      pointer.burst = Math.max(0, pointer.burst - (reduceMotion ? 1 : delta * 0.85));

      context.clearRect(0, 0, width, height);
      const cellSize = 5;
      for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
          const px = Math.min(sample.width - 1, Math.floor(x + cellSize / 2));
          const py = Math.min(sample.height - 1, Math.floor(y + cellSize / 2));
          const index = (py * sample.width + px) * 4;
          const alpha = pixels[index + 3] / 255;
          if (alpha < 0.08) continue;

          const red = pixels[index] / 255;
          const green = pixels[index + 1] / 255;
          const blue = pixels[index + 2] / 255;
          const luminance = red * 0.2126 + green * 0.7152 + blue * 0.0722;
          const darkness = 1 - luminance;
          const dot = cellSize * (0.12 + darkness * 0.28);
          const inkRed = Math.round(136 + darkness * 104);
          const inkGreen = Math.round(11 + darkness * 24);
          const inkBlue = Math.round(31 + darkness * 42);

          context.beginPath();
          context.arc(x + cellSize / 2, y + cellSize / 2, dot, 0, Math.PI * 2);
          context.fillStyle = `rgba(${inkRed}, ${inkGreen}, ${inkBlue}, ${alpha * (0.58 + darkness * 0.38)})`;
          context.fill();
        }
      }

      const hoverRadius = Math.min(82, Math.max(42, Math.min(width, height) * 0.2));
      const burstProgress = 1 - pointer.burst;
      const burstRadius = hoverRadius * (1 + burstProgress * 0.55);
      const radius = Math.max(hoverRadius, burstRadius);
      const revealAlpha = Math.max(pointer.strength, pointer.burst) * 0.5;
      if (revealAlpha > 0.01) {
        const revealX = pointer.burst > 0 ? pointer.burstX : pointer.x;
        const revealY = pointer.burst > 0 ? pointer.burstY : pointer.y;
        revealContext.clearRect(0, 0, width, height);
        revealContext.drawImage(sample, 0, 0);
        revealContext.globalCompositeOperation = "destination-in";
        const gradient = revealContext.createRadialGradient(
          revealX,
          revealY,
          radius * 0.5,
          revealX,
          revealY,
          radius,
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${revealAlpha})`);
        gradient.addColorStop(0.68, `rgba(255, 255, 255, ${revealAlpha * 0.7})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        revealContext.fillStyle = gradient;
        revealContext.fillRect(0, 0, width, height);
        revealContext.globalCompositeOperation = "source-over";
        context.drawImage(reveal, 0, 0);
      }

      if (
        !reduceMotion
        && (Math.abs(pointer.strength - strengthTarget) > 0.01 || pointer.burst > 0)
      ) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const scheduleRender = () => {
      if (!frame && alive) frame = requestAnimationFrame(render);
    };
    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      scheduleRender();
    };
    const onPointerLeave = () => {
      pointer.active = false;
      scheduleRender();
    };
    const onClick = (event) => {
      const rect = host.getBoundingClientRect();
      pointer.burstX = event.clientX - rect.left;
      pointer.burstY = event.clientY - rect.top;
      pointer.burst = 1;
      scheduleRender();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    image.addEventListener("load", resize);
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("click", onClick);
    resize();

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      image.removeEventListener("load", resize);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("click", onClick);
    };
  }, [src]);

  return (
    <div className="halftone-portrait">
      <img ref={imageRef} src={src} alt={alt} className="hero-portrait-image" />
      <canvas ref={canvasRef} className="halftone-overlay" aria-hidden="true" />
    </div>
  );
}
