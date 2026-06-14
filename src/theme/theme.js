/* ============================================================
   TEMA Y TIPOGRAFÍA DEL SITIO
   ------------------------------------------------------------
   Un único lugar para los colores y las fuentes. Si quieres
   cambiar la paleta o la tipografía del portafolio completo,
   se hace desde aquí.
   ============================================================ */

// Paleta oscura del sitio. Dos acentos: cobre (principal) y cian (secundario).
export const TEMA = {
  bg: "#07090D",          // fondo general
  surface: "#0D1117",     // superficies (modales, tarjetas sólidas)
  surface2: "#121823",    // superficie un nivel más clara
  border: "#243042",      // borde visible
  borderSoft: "#1A2330",  // borde sutil
  text: "#E9EDF2",        // texto principal
  muted: "#93A0B4",       // texto secundario
  faint: "#5E6B7E",       // texto terciario / detalles

  accent: "#E8983E",                       // cobre — acento principal
  accentText: "#F3B566",                   // cobre legible sobre fondo oscuro
  accentSoft: "rgba(232,152,62,0.12)",     // cobre translúcido (fondos suaves)

  accent2: "#22D3EE",                      // cian — acento secundario
  accent2Text: "#67E8F9",                  // cian legible sobre fondo oscuro
  accent2Soft: "rgba(34,211,238,0.10)",    // cian translúcido

  ok: "#4ADE80",          // verde — estados positivos ("disponible", "en línea")

  // Capa de tarjeta translúcida reutilizable (da profundidad consistente)
  card: "rgba(15,20,28,0.72)",
  cardHover: "rgba(20,27,37,0.85)",

  // Sombras por nivel — profundidad en capas
  shadowSoft: "0 4px 20px rgba(0,0,0,0.28)",
  shadowMd: "0 14px 38px rgba(0,0,0,0.40)",
  shadowLg: "0 28px 70px rgba(0,0,0,0.50)",
};

// Familias tipográficas:
// DISPLAY = títulos (Space Grotesk) · SANS = cuerpo legible (Inter) · MONO = ficha técnica (JetBrains Mono)
export const DISPLAY = '"Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
export const SANS = '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
export const MONO = '"JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';
