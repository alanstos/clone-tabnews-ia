"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Carregado sob demanda: a biblioteca fica fora do JS inicial da página e só
// é baixada depois da hidratação, sem atrasar a interatividade.
const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

// Dispara uma rajada única de confete quando a página carrega.
export default function ConfettiOnLoad() {
  const [size, setSize] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Respeita quem pediu menos animação no sistema: nem baixa a biblioteca.
    // Sem setState aqui: `size` continua null e o componente não renderiza nada.
    if (done || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    // Ao terminar (done = true), o efeito é refeito e o listener removido.
    return () => window.removeEventListener("resize", update);
  }, [done]);

  if (!size || done) return null;

  return (
    <Confetti
      width={size.width}
      height={size.height}
      numberOfPieces={300}
      recycle={false}
      onConfettiComplete={() => setDone(true)}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}
