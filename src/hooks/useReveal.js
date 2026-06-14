import { useState, useEffect, useRef } from "react";

/* ============================================================
   HOOKS Y UTILIDADES DE ANIMACIÓN
   ============================================================ */

// ¿El usuario pidió reducir el movimiento? (accesibilidad)
// Si es así, desactivamos animaciones en todo el sitio.
export const movReducido = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// useReveal: revela un elemento cuando entra en la pantalla (scroll).
// Devuelve [ref, visible]: pones la ref en el elemento y usas `visible`
// para animar su aparición. Respeta prefers-reduced-motion.
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (movReducido()) { setVisible(true); return; }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) { setVisible(true); observador.disconnect(); }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observador.observe(ref.current);
    return () => observador.disconnect();
  }, []);

  return [ref, visible];
}
