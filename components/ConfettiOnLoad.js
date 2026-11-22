"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

// Dispara uma rajada única de confete quando a página carrega.
export default function ConfettiOnLoad() {
  const [size, setSize] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!size || done) return null;

  return (
    <Confetti
      width={size.width}
      height={size.height}
      numberOfPieces={300}
      recycle={false}
      onConfettiComplete={() => setDone(true)}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000 }}
    />
  );
}
