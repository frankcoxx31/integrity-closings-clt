import { useEffect, useState } from 'react';
import { businessConfig } from '../config/business';

interface LogoProps {
  className?: string;
  textClassName?: string;
}

export default function Logo({ 
  className = "h-12 w-auto", 
}: LogoProps) {
  const [imgSrc, setImgSrc] = useState<string>("/logo.jpg");

  useEffect(() => {
    const img = new Image();
    img.src = "/logo.jpg";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const w = canvas.width;
      const h = canvas.height;

      // logo.jpg's background is a gradient, not a flat color, so a single
      // reference color (e.g. the top-left pixel) can't match it everywhere.
      // Flood-fill transparency from the border inward instead, comparing
      // each pixel to its already-cleared neighbor so the fill follows the
      // gradient; it stops naturally at the hard edge of the logo artwork.
      const tolerance = 36;
      const visited = new Uint8Array(w * h);
      const queue: number[] = [];
      for (let x = 0; x < w; x++) { queue.push(x); queue.push((h - 1) * w + x); }
      for (let y = 0; y < h; y++) { queue.push(y * w); queue.push(y * w + (w - 1)); }
      for (const idx of queue) visited[idx] = 1;

      let qi = 0;
      while (qi < queue.length) {
        const idx = queue[qi++];
        const i = idx * 4;
        const r = data[i], g = data[i + 1], b = data[i + 2];
        data[i + 3] = 0;

        const x = idx % w;
        const y = Math.floor(idx / w);
        const neighbors = [];
        if (x > 0) neighbors.push(idx - 1);
        if (x < w - 1) neighbors.push(idx + 1);
        if (y > 0) neighbors.push(idx - w);
        if (y < h - 1) neighbors.push(idx + w);

        for (const n of neighbors) {
          if (visited[n]) continue;
          const ni = n * 4;
          const nr = data[ni], ng = data[ni + 1], nb = data[ni + 2];
          const dist = Math.sqrt((r - nr) ** 2 + (g - ng) ** 2 + (b - nb) ** 2);
          if (dist <= tolerance) {
            visited[n] = 1;
            queue.push(n);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setImgSrc(canvas.toDataURL('image/png'));
    };
  }, []);

  return (
    <img 
      src={imgSrc}
      alt={businessConfig.name}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
