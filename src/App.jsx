import React, { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowLeft,
  Menu, X, ChevronDown, MapPin, CircleCheck, Layers, Database, Wrench,
  Sparkles, Monitor, ExternalLink, FolderGit2, ArrowUp,
  Code2, Server, Settings2, BrainCircuit,
  BarChart3, BookOpen, MessageSquare, Bot, Workflow,
} from "lucide-react";

// Datos del portafolio y tema, separados en sus propios archivos para mantener todo ordenado
import { DATOS, CATEGORIAS } from "./data/portafolio";
import { TEMA, DISPLAY, SANS, MONO } from "./theme/theme";
import { useReveal, movReducido } from "./hooks/useReveal";
import Bienvenida from "./components/Bienvenida";

// Iconos Lucide para marcas sin logo en Simple Icons (clave -> componente)
const LUCIDE_TECH = { powerbi: BarChart3, gpt: MessageSquare, notebooklm: BookOpen, perplexity: Bot, n8n: Workflow };


/* ============================================================
   COMPONENTES Y UTILIDADES
   (hooks reutilizables están en src/hooks/useReveal.js)
   ============================================================ */

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Contador animado: "12+" → cuenta de 0 a 12 y conserva el sufijo
function Contador({ valor, visible }) {
  const m = String(valor).match(/^(\d+)(.*)$/);
  const fin = m ? parseInt(m[1], 10) : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (movReducido() || !m) { setN(fin); return; }
    let raf; const t0 = performance.now(); const dur = 1400;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.round(fin * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, fin]);
  if (!m) return <>{valor}</>;
  return <>{n}{m[2]}</>;
}

/* Foto con degradado de respaldo: si la imagen no carga,
   se muestra el degradado del proyecto en su lugar.
   `tinte` aplica un velo de marca (cobre/cian) para que las fotos
   se vean premium y coherentes con el tema oscuro, no "de stock". */
function Foto({ src, alt = "", gradiente = ["#121823", "#1A2330"], className = "", style = {}, tinte = true, children }) {
  const [falla, setFalla] = useState(false);
  return (
    <div
      className={`relative overflow-hidden zoomable ${className}`}
      style={{ background: `linear-gradient(135deg, ${gradiente[0]}, ${gradiente[1]})`, ...style }}
    >
      {!falla && src && (
        <img
          src={src} alt={alt} loading="lazy"
          onError={() => setFalla(true)}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: tinte ? "saturate(0.85) contrast(1.05) brightness(0.82)" : undefined }}
        />
      )}
      {/* Velo de marca: oscurece la base y aporta tinte cobre→cian */}
      {tinte && !falla && src && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(7,9,13,0.55), rgba(7,9,13,0.25) 45%, rgba(7,9,13,0.7))" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(232,152,62,0.18), transparent 50%, rgba(34,211,238,0.14))", mixBlendMode: "overlay" }}
          />
        </>
      )}
      {children}
    </div>
  );
}

/* Logo real de cada tecnología (Simple Icons CDN).
   Si el logo no existe o no carga, muestra una insignia con la inicial. */
function IconoTech({ t, slug, color, nombre, tam = 22, lucide: IconoLucide }) {
  const [falla, setFalla] = useState(false);
  const caja = tam + 14;
  // Icono Lucide directo (para marcas sin logo en Simple Icons: GPT, Power BI, NotebookLM…)
  if (IconoLucide) {
    return (
      <span
        className="flex items-center justify-center rounded-lg shrink-0"
        style={{ width: caja, height: caja, background: t.surface2, border: `1px solid ${t.borderSoft}`, color: t.accent2Text }}
        aria-hidden
      >
        <IconoLucide size={tam} />
      </span>
    );
  }
  if (!slug || falla) {
    return (
      <span
        className="flex items-center justify-center rounded-lg font-bold shrink-0"
        style={{
          width: caja, height: caja, fontFamily: MONO, fontSize: tam * 0.5,
          color: t.accentText, background: t.accentSoft, border: `1px solid ${t.borderSoft}`,
        }}
        aria-hidden
      >
        {nombre.charAt(0)}
      </span>
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-lg shrink-0"
      style={{ width: caja, height: caja, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
    >
      <img
        src={`https://cdn.simpleicons.org/${slug}/${color}`}
        width={tam} height={tam} alt={nombre} loading="lazy"
        onError={() => setFalla(true)}
      />
    </span>
  );
}

// Tarjeta con inclinación 3D y foco de luz que sigue al cursor
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    if (movReducido() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.transform =
      `perspective(900px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 5}deg) translateY(-4px)`;
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={`h-full ${className}`}
      style={{ transition: "transform 0.25s ease", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   ATMÓSFERA GLOBAL — aurora, grano de película y luz de cursor
   ============================================================ */

// Grano de película (SVG embebido, sin peticiones externas)
const GRANO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E";

function FondoGlobal({ t }) {
  const quieta = movReducido();
  return (
    <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Patrón de puntos técnico global — quita la sensación de vacío */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, #000 30%, rgba(0,0,0,0.4) 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 100% at 50% 0%, #000 30%, rgba(0,0,0,0.4) 70%, transparent 100%)",
        }}
      />
      {/* Constelación de nodos animada (canvas, ligero) */}
      <Constelacion t={t} />
      {/* Aurora cobre */}
      <div
        className="absolute rounded-full"
        style={{
          top: "-16%", left: "-12%", width: "58vw", height: "58vw", minWidth: 480, minHeight: 480,
          background: `radial-gradient(circle, rgba(232,152,62,0.18), transparent 62%)`,
          filter: "blur(70px)",
          animation: quieta ? "none" : "deriva1 22s ease-in-out infinite",
        }}
      />
      {/* Aurora cian */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: "-20%", right: "-14%", width: "52vw", height: "52vw", minWidth: 420, minHeight: 420,
          background: `radial-gradient(circle, rgba(34,211,238,0.14), transparent 62%)`,
          filter: "blur(70px)",
          animation: quieta ? "none" : "deriva2 28s ease-in-out infinite",
        }}
      />
      {/* Aurora central tenue */}
      <div
        className="absolute rounded-full"
        style={{
          top: "32%", left: "28%", width: "44vw", height: "44vw",
          background: `radial-gradient(circle, rgba(232,152,62,0.07), transparent 60%)`,
          filter: "blur(80px)",
          animation: quieta ? "none" : "deriva1 30s ease-in-out infinite reverse",
        }}
      />
      {/* Grano de película sobre todo */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url("${GRANO}")`, opacity: 0.05, mixBlendMode: "overlay" }}
      />
    </div>
  );
}

/* Constelación de nodos conectados — fondo tecnológico animado y ligero.
   Se pausa con prefers-reduced-motion y baja densidad en móvil. */
function Constelacion({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    if (movReducido()) return;
    // En móvil de gama media prioriza fluidez/batería: sin canvas animado
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, raf, nodos = [];
    const colores = ["232,152,62", "34,211,238"];

    const dimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Densidad adaptativa: menos nodos en pantallas chicas
      const objetivo = Math.min(Math.floor((w * h) / 26000), w < 640 ? 26 : 64);
      nodos = Array.from({ length: objetivo }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        c: colores[Math.random() < 0.62 ? 0 : 1],
      }));
    };

    const dibujar = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodos.length; i++) {
        const a = nodos[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        // Líneas a nodos cercanos
        for (let j = i + 1; j < nodos.length; j++) {
          const b = nodos[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(${a.c},${0.16 * (1 - dist / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        // Punto
        ctx.fillStyle = `rgba(${a.c},0.55)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(dibujar);
    };

    dimensionar();
    dibujar();
    window.addEventListener("resize", dimensionar);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", dimensionar); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.5 }}
    />
  );
}

// Halo que sigue al cursor por toda la página (solo con mouse)
function LuzCursor() {
  const ref = useRef(null);
  useEffect(() => {
    if (movReducido() || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = null;
    const f = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.background =
            `radial-gradient(560px circle at ${e.clientX}px ${e.clientY}px, rgba(232,152,62,0.055), transparent 70%)`;
        }
        raf = null;
      });
    };
    window.addEventListener("mousemove", f, { passive: true });
    return () => window.removeEventListener("mousemove", f);
  }, []);
  return <div ref={ref} aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
}

// Barra de progreso de lectura (parte superior)
function BarraProgreso({ t }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1));
    };
    window.addEventListener("scroll", f, { passive: true });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-0.5"
      style={{ zIndex: 70, width: `${p * 100}%`, background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`, transition: "width 0.1s linear" }}
    />
  );
}

// Botón flotante para volver arriba
function VolverArriba({ t }) {
  const [ver, setVer] = useState(false);
  useEffect(() => {
    const f = () => setVer(window.scrollY > 600);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
      style={{
        zIndex: 60, background: t.accent, color: "#14100A",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        opacity: ver ? 1 : 0, pointerEvents: ver ? "auto" : "none",
        transform: ver ? "translateY(0)" : "translateY(16px)",
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}

// Marquesina infinita de tecnologías, ahora con logos reales
function Marquesina({ t }) {
  const items = DATOS.tecnologias.flatMap((c) => c.items);
  const doble = [...items, ...items];
  const mascara = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";
  return (
    <Reveal>
      <div
        className="marquesina relative overflow-hidden py-4 mb-10 rounded-2xl"
        style={{ border: `1px solid ${t.borderSoft}`, background: t.card, maskImage: mascara, WebkitMaskImage: mascara }}
      >
        <div className="pista flex items-center gap-3 w-max" style={{ animation: movReducido() ? "none" : "marquesina 45s linear infinite" }}>
          {doble.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 shrink-0 px-4 py-2 rounded-xl"
              style={{ background: "rgba(7,9,13,0.5)", border: `1px solid ${t.borderSoft}` }}
            >
              <IconoTech t={t} slug={item.slug} color={item.color} nombre={item.nombre} lucide={LUCIDE_TECH[item.lucide]} tam={16} />
              <span style={{ fontFamily: MONO, fontSize: 12.5, color: t.text, fontWeight: 500, whiteSpace: "nowrap" }}>{item.nombre}</span>
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// Etiqueta monoespaciada estilo "ficha técnica" — firma visual del sitio
function Eyebrow({ t, children, color }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: color || t.accentText, textTransform: "uppercase" }}>
        {children}
      </span>
      <span className="flex-1 h-px" style={{ background: t.borderSoft, maxWidth: 64 }} />
    </div>
  );
}

/* Separador sutil entre secciones: línea con degradado central que se desvanece */
function SepSeccion({ t }) {
  return (
    <div
      aria-hidden
      className="absolute top-0 inset-x-0 h-px pointer-events-none"
      style={{
        background: `linear-gradient(90deg, transparent, ${t.borderSoft} 20%, ${t.border} 50%, ${t.borderSoft} 80%, transparent)`,
        maxWidth: "72rem", marginLeft: "auto", marginRight: "auto",
      }}
    />
  );
}

/* Cabecera de sección numerada — firma visual unificada.
   num: "01" · eyebrow: texto monoespaciado · titulo: H2 grande · acento cobre|cian */
function CabeceraSeccion({ t, num, eyebrow, titulo, descripcion, acento = "cobre", children }) {
  const col = acento === "cian" ? t.accent2Text : t.accentText;
  return (
    <div className="mb-10 md:mb-12">
      <Reveal>
        <div className="flex items-center gap-3 mb-5">
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: col, letterSpacing: "0.08em" }}>{num}</span>
          <span className="h-px w-7" style={{ background: col, opacity: 0.5 }} />
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", color: t.faint, textTransform: "uppercase" }}>{eyebrow}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2
            className="max-w-2xl"
            style={{ color: t.text, fontSize: "clamp(1.8rem, 3.6vw, 2.9rem)", lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.025em" }}
          >
            {titulo}
          </h2>
          {children}
        </div>
        {descripcion && (
          <p className="max-w-xl leading-relaxed mt-4" style={{ color: t.muted, fontSize: "1.02rem" }}>
            {descripcion}
          </p>
        )}
      </Reveal>
    </div>
  );
}

function Chip({ t, children }) {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-md"
      style={{ fontFamily: MONO, fontSize: 11, color: t.muted, background: t.surface2, border: `1px solid ${t.borderSoft}` }}
    >
      {children}
    </span>
  );
}

function Boton({ t, primario, icono: Icono, children, href, onClick, descarga }) {
  const base = "boton-base inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:-translate-y-0.5";
  const clase = primario ? base + " btn-brillo" : base + " boton-sec";
  const estilo = primario
    ? { background: t.accent, color: "#14100A", boxShadow: "0 4px 18px rgba(232,152,62,0.28)" }
    : { background: "rgba(13,17,23,0.5)", color: t.text, border: `1px solid ${t.border}` };
  const props = { className: clase, style: estilo, onClick };
  if (href !== undefined) {
    return (
      <a href={href} {...props} {...(descarga ? { download: true } : {})} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {Icono && <Icono size={16} strokeWidth={2} />}
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...props}>
      {Icono && <Icono size={16} strokeWidth={2} />}
      {children}
    </button>
  );
}

/* ============================================================
   NAVEGACIÓN
   ============================================================ */

const SECCIONES = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "tecnologias", label: "Tecnologías" },
  { id: "certificados", label: "Certificados" },
  { id: "proyectos", label: "Proyectos" },
  { id: "galeria", label: "Momentos" },
  { id: "contacto", label: "Contacto" },
];

function Nav({ t, irASeccion, enDetalle, volver, seccionActiva }) {
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const onScroll = () => setConFondo(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const click = (id) => { setAbierto(false); enDetalle ? volver(id) : irASeccion(id); };

  return (
    <header
      className="fixed top-0 left-0 right-0"
      style={{
        zIndex: 50,
        background: conFondo || abierto ? "rgba(7,9,13,0.82)" : "transparent",
        backdropFilter: conFondo || abierto ? "blur(14px)" : "none",
        borderBottom: `1px solid ${conFondo || abierto ? t.borderSoft : "transparent"}`,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <nav className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button type="button" onClick={() => click("inicio")} className="group flex items-center gap-2.5" style={{ color: t.text }}>
          <span
            className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-sm transition-transform duration-300 group-hover:rotate-12"
            style={{ background: `linear-gradient(135deg, ${t.accent}, #C77622)`, color: "#14100A", fontFamily: MONO }}
          >
            A
          </span>
          <span className="font-semibold text-sm tracking-tight hidden sm:block">{DATOS.nombre}</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {SECCIONES.map((s) => {
            const activa = !enDetalle && seccionActiva === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => click(s.id)}
                className="nav-link px-3 py-2 rounded-md text-sm transition-colors duration-200"
                style={{ color: activa ? t.accentText : t.muted, fontWeight: activa ? 600 : 400 }}
                onMouseEnter={(e) => { if (!activa) e.currentTarget.style.color = t.text; }}
                onMouseLeave={(e) => { if (!activa) e.currentTarget.style.color = t.muted; }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          aria-label="Menú"
          className="flex md:hidden w-9 h-9 rounded-lg items-center justify-center"
          style={{ border: `1px solid ${t.border}`, color: t.text }}
        >
          {abierto ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      {abierto && (
        <div className="md:hidden px-5 pt-2 pb-5 flex flex-col gap-1 menu-movil" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
          {SECCIONES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => click(s.id)}
              className="menu-item flex items-center justify-between text-left px-3.5 py-3.5 rounded-xl text-base font-medium transition-colors duration-150"
              style={{ color: t.text, animationDelay: `${i * 35}ms` }}
            >
              {s.label}
              <ArrowRight size={16} style={{ color: t.faint }} />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO — foto con anillo giratorio, orbes y contadores
   ============================================================ */

function Hero({ t, irASeccion }) {
  const [refStats, statsVisible] = useReveal();
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 md:pt-44 pb-16 md:pb-24 px-5 md:px-8">
      {/* Cuadrícula técnica que se desvanece */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 0%, #000 38%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 0%, #000 38%, transparent 100%)",
        }}
      />
      {/* Glow dual cobre (izq) + cian (der) detrás del hero */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-10%", left: "-5%", width: "45vw", height: "45vw", maxWidth: 620, maxHeight: 620,
          background: `radial-gradient(circle, ${t.accentSoft}, transparent 65%)`, filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "0%", right: "-8%", width: "40vw", height: "40vw", maxWidth: 540, maxHeight: 540,
          background: `radial-gradient(circle, rgba(34,211,238,0.08), transparent 65%)`, filter: "blur(40px)",
        }}
      />
      {/* Línea de luz superior que cruza el hero */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${t.accent}66, ${t.accent2}66, transparent)` }}
      />
      {/* Palabra técnica gigante de fondo — profundidad y carácter */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none hidden md:block"
        style={{
          top: "14%", left: "-2%", right: 0, textAlign: "left",
          fontFamily: MONO, fontWeight: 500,
          fontSize: "clamp(7rem, 20vw, 19rem)", lineHeight: 0.85,
          letterSpacing: "-0.04em",
          color: "transparent",
          WebkitTextStroke: `1px rgba(255,255,255,0.035)`,
          maskImage: "linear-gradient(180deg, #000 30%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 30%, transparent 95%)",
        }}
      >
        &lt;dev/&gt;
      </div>

      <div className="relative max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Columna de texto */}
        <div className="lg:col-span-7">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7"
              style={{ border: `1px solid ${t.border}`, background: "rgba(13,17,23,0.6)", backdropFilter: "blur(6px)" }}
            >
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: t.ok }} />
                <span className="relative inline-flex rounded-full w-2 h-2" style={{ background: t.ok }} />
              </span>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: t.muted }}>
                {DATOS.disponible.toUpperCase()}
              </span>
            </div>
          </Reveal>

          <h1
            className="relative mb-5"
            style={{ color: t.text, fontSize: "clamp(2.4rem, 7vw, 5rem)", lineHeight: 1.03, fontWeight: 700, letterSpacing: "-0.03em", overflowWrap: "break-word" }}
          >
            {/* Resplandor detrás del nombre para que salte */}
            <span
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: "-6%", top: "10%", width: "70%", height: "120%",
                background: `radial-gradient(60% 60% at 30% 50%, ${t.accentSoft}, transparent 70%)`,
                filter: "blur(28px)", zIndex: -1,
              }}
            />
            {DATOS.nombre.split(" ").map((palabra, i, arr) => (
              <span
                key={i}
                className="palabra inline-block"
                style={{
                  animationDelay: `${180 + i * 140}ms`,
                  // Apellido (\u00FAltima palabra) con gradiente cobre\u2192cian
                  ...(i === arr.length - 1
                    ? {
                        background: `linear-gradient(100deg, ${t.accent}, ${t.accent2})`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }
                    : {}),
                }}
              >
                {palabra}{i < arr.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </h1>

          <Reveal delay={140}>
            <div className="flex items-start gap-3 mb-6">
              <span className="h-px w-8 shrink-0 mt-2.5" style={{ background: `linear-gradient(90deg, ${t.accent}, transparent)` }} />
              <p style={{ fontFamily: MONO, fontSize: "clamp(0.78rem, 1.5vw, 0.92rem)", color: t.accentText, letterSpacing: "0.01em", lineHeight: 1.6 }}>
                {DATOS.titulo}
                {DATOS.tituloLinea2 && (
                  <>
                    <br />
                    <span style={{ color: t.muted }}>{DATOS.tituloLinea2}</span>
                  </>
                )}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="leading-relaxed max-w-xl mb-9" style={{ color: t.muted, fontSize: "clamp(1rem, 1.4vw, 1.18rem)" }}>
              {DATOS.descripcion}
            </p>
          </Reveal>

          {/* CTAs con jerarqu\u00EDa clara: 2 principales + redes compactas */}
          <Reveal delay={260}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <Boton t={t} primario icono={Download} href={DATOS.cvUrl} descarga>Descargar CV</Boton>
              <Boton t={t} icono={ArrowRight} onClick={() => irASeccion("proyectos")}>Ver proyectos</Boton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="flex items-center gap-2.5">
              {[
                { Icono: Github, href: DATOS.github, label: "GitHub" },
                { Icono: Linkedin, href: DATOS.linkedin, label: "LinkedIn" },
                { Icono: Mail, href: `mailto:${DATOS.email}`, label: "Email" },
              ].map(({ Icono, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="enlace-social w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ border: `1px solid ${t.border}`, background: "rgba(13,17,23,0.5)", color: t.muted }}
                >
                  <Icono size={17} />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Experiencia destacada — credibilidad inmediata */}
          <Reveal delay={380}>
            <div className="mt-9 pt-6" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.18em", color: t.faint, textTransform: "uppercase" }}>
                Experiencia
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                {DATOS.experiencia.map((e) => (
                  <span
                    key={e}
                    className="px-3 py-1.5 rounded-lg"
                    style={{ fontFamily: MONO, fontSize: 12, color: t.muted, fontWeight: 500, background: "rgba(13,17,23,0.5)", border: `1px solid ${t.borderSoft}`, whiteSpace: "nowrap" }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Columna de foto — reemplaza DATOS.fotos.perfil por tu foto real */}
        <Reveal delay={300} className="lg:col-span-5">
          <div className="relative max-w-xs sm:max-w-sm mx-auto lg:max-w-none">
            {/* Anillo de luz giratorio detrás de la foto */}
            <div
              aria-hidden
              className="absolute rounded-[1.75rem]"
              style={{
                inset: -12,
                background: `conic-gradient(from 0deg, ${t.accent}, transparent 22%, ${t.accent2}, transparent 58%, ${t.accent})`,
                filter: "blur(16px)", opacity: 0.45,
                animation: movReducido() ? "none" : "girar 11s linear infinite",
              }}
            />
            {/* Marco glass sutil */}
            <div
              aria-hidden
              className="absolute rounded-3xl"
              style={{ inset: -1, border: `1px solid rgba(255,255,255,0.06)` }}
            />
            <Foto
              src={DATOS.fotos.perfil}
              alt={`Foto de ${DATOS.nombre}`}
              gradiente={["#121823", "#2A1F10"]}
              tinte={false}
              className="rounded-3xl"
              style={{ aspectRatio: "1 / 1", boxShadow: t.shadowLg, border: `1px solid ${t.border}` }}
            >
              {/* Degradado inferior para fundir la foto con el tema oscuro */}
              <div
                className="absolute inset-x-0 bottom-0 pointer-events-none"
                style={{ height: "55%", background: "linear-gradient(transparent, rgba(7,9,13,0.55) 55%, rgba(7,9,13,0.92))" }}
              />
              {/* Brillo sutil de marca en una esquina */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(120% 80% at 100% 0%, ${t.accent2Soft}, transparent 45%)`, mixBlendMode: "screen" }}
              />
              <div className="absolute inset-x-0 bottom-0 px-4 py-3.5">
                <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.92)" }}>
                  {DATOS.ubicacion.toUpperCase()} · CONECTA SYSTEMS
                </span>
              </div>
            </Foto>
            {/* Insignia flotante inferior izquierda — producción (cobre) */}
            <div
              className="absolute flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bottom-[-12px] left-[-8px] sm:bottom-[-16px] sm:left-[-16px]"
              style={{
                background: t.surface, border: `1px solid ${t.border}`,
                boxShadow: t.shadowMd,
                animation: movReducido() ? "none" : "flotar 6s ease-in-out infinite",
              }}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: t.ok }} />
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: t.text }}>En producción real</span>
            </div>
            {/* Insignia flotante superior derecha — rol (cian) */}
            <div
              className="absolute hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
              style={{
                top: -14, right: -14, background: t.surface, border: `1px solid ${t.accent2Soft}`,
                boxShadow: t.shadowMd,
                animation: movReducido() ? "none" : "flotar 7.5s ease-in-out infinite reverse",
              }}
            >
              <Sparkles size={13} style={{ color: t.accent2Text }} />
              <span style={{ fontFamily: MONO, fontSize: 11, color: t.text }}>IA &amp; Automatización</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Indicadores con contador animado */}
      <div ref={refStats} className="relative max-w-5xl mx-auto mt-16 md:mt-20">
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{
            background: t.borderSoft, border: `1px solid ${t.borderSoft}`, boxShadow: t.shadowSoft,
            opacity: statsVisible ? 1 : 0, transform: statsVisible ? "translateY(0)" : "translateY(22px)",
            transition: "opacity 0.65s ease 120ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) 120ms",
          }}
        >
          {DATOS.indicadores.map((ind, i) => (
            <div
              key={ind.etiqueta}
              className="stat-cell relative p-6 md:p-7"
              style={{ background: "rgba(13,17,23,0.7)" }}
            >
              <div
                className="absolute top-0 left-0 h-px w-12"
                style={{ background: i % 2 === 0 ? t.accent : t.accent2 }}
              />
              <div
                className="mb-1.5"
                style={{ fontFamily: DISPLAY, fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 700, letterSpacing: "-0.02em", color: t.text }}
              >
                <Contador valor={ind.valor} visible={statsVisible} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: t.faint, letterSpacing: "0.04em", lineHeight: 1.5 }}>{ind.etiqueta}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

/* ============================================================
   SOBRE MÍ
   ============================================================ */

function SobreMi({ t }) {
  return (
    <section id="sobre-mi" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="01"
          eyebrow="Sobre mí"
          titulo="Construyo webs que funcionan y se ven bien"
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 items-stretch">
          {/* Foto — reemplaza DATOS.fotos.sobreMi por una foto tuya trabajando */}
          <Reveal delay={80} className="lg:col-span-2 flex">
            <div className="relative w-full">
              <div
                aria-hidden
                className="absolute rounded-2xl hidden lg:block"
                style={{ inset: 0, transform: "translate(-12px, 12px)", border: `1px solid ${t.accent2Soft}`, background: t.accentSoft }}
              />
              <Foto
                src={DATOS.fotos.sobreMi}
                alt="Espacio de trabajo"
                gradiente={["#121823", "#26190B"]}
                className="rounded-2xl h-full w-full"
                style={{ minHeight: 280, aspectRatio: "auto", border: `1px solid ${t.border}`, boxShadow: t.shadowMd }}
              >
                <div
                  className="absolute inset-x-0 bottom-0 px-4 py-3"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", color: "rgba(255,255,255,0.9)" }}>
                    // CÓDIGO QUE LLEGA A PRODUCCIÓN
                  </span>
                </div>
              </Foto>
            </div>
          </Reveal>

          <div className="lg:col-span-3 flex flex-col">
            <Reveal delay={120}>
              <p className="leading-relaxed mb-4" style={{ color: t.muted, fontSize: "1.05rem" }}>
                {DATOS.sobreMi.intro}
              </p>
              {DATOS.sobreMi.motivacion && (
                <p className="leading-relaxed mb-6" style={{ color: t.muted, fontSize: "1.05rem" }}>
                  {DATOS.sobreMi.motivacion}
                </p>
              )}
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4 flex-1">
              {DATOS.sobreMi.puntos.map((p, i) => (
                <Reveal key={p.titulo} delay={160 + i * 70}>
                  <div
                    className="tarjeta-suave group h-full p-5 rounded-2xl transition-all duration-300"
                    style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: i % 2 === 0 ? t.accentSoft : t.accent2Soft,
                          color: i % 2 === 0 ? t.accentText : t.accent2Text,
                        }}
                      >
                        <CircleCheck size={15} />
                      </span>
                      <h3 className="font-semibold text-sm" style={{ color: t.text }}>{p.titulo}</h3>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{p.texto}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Lema / mentalidad — cita destacada */}
        {DATOS.sobreMi.lema && (
          <Reveal delay={120}>
            <div
              className="relative mt-8 rounded-2xl overflow-hidden p-7 md:p-9"
              style={{ background: t.card, border: `1px solid ${t.border}` }}
            >
              {/* Acentos de luz a los lados */}
              <div aria-hidden className="absolute top-0 left-0 w-1 h-full" style={{ background: `linear-gradient(${t.accent}, ${t.accent2})` }} />
              <div
                aria-hidden
                className="absolute -right-10 -top-10 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }}
              />
              <div className="relative flex flex-col md:flex-row md:items-center gap-5">
                <div className="flex-1">
                  <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.18em", color: t.faint, textTransform: "uppercase" }}>
                    Mi mentalidad
                  </span>
                  <p
                    className="mt-2 mb-3"
                    style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.15, letterSpacing: "-0.02em" }}
                  >
                    <span style={{ color: t.text }}>Planifica como </span>
                    <span style={{ background: `linear-gradient(100deg, ${t.accent}, ${t.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Monje</span>
                    <span style={{ color: t.text }}>, ejecuta como </span>
                    <span style={{ background: `linear-gradient(100deg, ${t.accent2}, ${t.accent})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ninja</span>
                  </p>
                  <p className="leading-relaxed max-w-2xl" style={{ color: t.muted, fontSize: "0.97rem" }}>
                    {DATOS.sobreMi.lemaTexto}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   TECNOLOGÍAS — logos reales con nombre y propósito
   ============================================================ */

const ICONOS_CAT = { monitor: Code2, layers: Server, database: Database, wrench: Settings2, sparkles: BrainCircuit };

// Tarjeta de categoría colapsable (acordeón). Cerrada: muestra logos en fila.
// Abierta: muestra el detalle de cada tecnología.
function TarjetaCategoria({ t, cat, abierta, onToggle, delay }) {
  const Icono = ICONOS_CAT[cat.icono] || Layers;
  return (
    <Reveal delay={delay}>
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: abierta ? t.cardHover : t.card,
          border: `1px solid ${abierta ? t.border : t.borderSoft}`,
          boxShadow: abierta ? t.shadowMd : "none",
        }}
      >
        {/* Cabecera clicable */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={abierta}
          className="w-full text-left p-5 flex items-center gap-4 transition-colors duration-200"
        >
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
            style={{
              background: abierta ? "rgba(34,211,238,0.10)" : "rgba(255,255,255,0.04)",
              color: abierta ? t.accent2Text : t.muted,
              border: `1px solid ${abierta ? t.accent2Soft : t.borderSoft}`,
            }}
          >
            <Icono size={18} strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold" style={{ color: t.text, fontFamily: DISPLAY }}>{cat.categoria}</h3>
              <span style={{ fontFamily: MONO, fontSize: 11, color: t.faint }}>{String(cat.items.length).padStart(2, "0")}</span>
            </div>
            <p className="text-sm truncate" style={{ color: t.faint }}>{cat.descripcion}</p>
          </div>
          {/* Logos en miniatura (solo cuando está cerrada) */}
          <div className={`hidden sm:flex items-center gap-1 transition-all duration-300 ${abierta ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
            {cat.items.slice(0, 5).map((item) => (
              <IconoTech key={item.nombre} t={t} slug={item.slug} color={item.color} nombre={item.nombre} lucide={LUCIDE_TECH[item.lucide]} tam={14} />
            ))}
          </div>
          {/* Flecha indicadora */}
          <span
            className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: `1px solid ${t.border}`, color: t.muted, transform: abierta ? "rotate(180deg)" : "none", background: abierta ? t.accentSoft : "transparent" }}
          >
            <ChevronDown size={15} />
          </span>
        </button>

        {/* Contenido expandible */}
        <div
          className="grid transition-all duration-300 ease-out"
          style={{ gridTemplateRows: abierta ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 pt-1 grid sm:grid-cols-2 gap-x-6 gap-y-4" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
              {cat.items.map((item) => (
                <div key={item.nombre} className="flex items-start gap-3 pt-1">
                  <IconoTech t={t} slug={item.slug} color={item.color} nombre={item.nombre} lucide={LUCIDE_TECH[item.lucide]} />
                  <div className="min-w-0">
                    <div className="font-medium text-sm" style={{ color: t.text }}>{item.nombre}</div>
                    <div className="text-sm leading-snug" style={{ color: t.muted }}>{item.detalle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Tecnologias({ t }) {
  // Primera categoría abierta por defecto, el resto cerradas
  const [abierta, setAbierta] = useState(0);
  return (
    <section id="tecnologias" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="02"
          eyebrow="Stack tecnológico"
          titulo="Herramientas elegidas con criterio"
          descripcion="Cada tecnología de esta lista está en uso real en mis proyectos. No es una colección de logos: es el stack con el que entrego software."
          acento="cian"
        />

        <Marquesina t={t} />

        <div className="flex flex-col gap-3">
          {DATOS.tecnologias.map((cat, i) => (
            <TarjetaCategoria
              key={cat.categoria}
              t={t}
              cat={cat}
              abierta={abierta === i}
              onToggle={() => setAbierta(abierta === i ? -1 : i)}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CERTIFICADOS — SECCIÓN EN CONSTRUCCIÓN (temporal)
   La sección sigue visible y en la navegación, pero muestra un
   estado "En construcción" mientras se suben los certificados
   reales. El carrusel original (con DATOS.certificados y su modal)
   está en el historial de git, listo para reactivar.
   ============================================================ */

// Para reactivar: cuando los certificados estén listos, recupera el
// carrusel original desde el historial de git (commit anterior a
// "Certificados en construcción") y reemplaza este componente.
function Certificados({ t }) {
  return (
    <section id="certificados" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="03"
          eyebrow="Certificados"
          titulo="Formación que respalda la práctica"
        />

        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: `linear-gradient(160deg, ${t.surface} 0%, ${t.bg} 100%)`,
              border: `1px solid ${t.borderSoft}`,
              boxShadow: t.shadowMd,
            }}
          >
            {/* Resplandores de marca (cobre + cian) */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -left-20 w-96 h-96 rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(circle, ${t.accentSoft}, transparent 70%)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -right-16 w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }}
            />
            {/* Cuadrícula técnica muy sutil de fondo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  `linear-gradient(${t.text} 1px, transparent 1px), linear-gradient(90deg, ${t.text} 1px, transparent 1px)`,
                backgroundSize: "38px 38px",
              }}
            />

            <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              {/* Columna izquierda: mensaje */}
              <div className="text-center md:text-left order-2 md:order-1">
                <span
                  className="estado-vivo inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
                  style={{
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: "0.16em",
                    color: t.accentText,
                    background: t.accentSoft,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <span
                    className="punto-vivo w-1.5 h-1.5 rounded-full"
                    style={{ background: t.accent }}
                  />
                  EN CONSTRUCCIÓN
                </span>

                <h3
                  className="text-2xl md:text-[2rem] leading-tight font-bold mb-3"
                  style={{ fontFamily: DISPLAY, color: t.text }}
                >
                  Estoy preparando esta sección
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed mb-7 mx-auto md:mx-0 max-w-md"
                  style={{ color: t.muted }}
                >
                  Pronto verás aquí mis certificados y formación verificada.
                  Los estoy organizando para mostrarlos como se merecen.
                </p>

                {/* Chips de lo que viene (da contenido, no se ve vacío) */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {["Frontend", "React", "IA aplicada", "Automatización", "Datos"].map((tema) => (
                    <span
                      key={tema}
                      className="px-3 py-1.5 rounded-lg text-xs"
                      style={{
                        fontFamily: MONO,
                        color: t.muted,
                        background: t.surface2,
                        border: `1px solid ${t.borderSoft}`,
                      }}
                    >
                      {tema}
                    </span>
                  ))}
                </div>

                {/* Barra de progreso decorativa */}
                <div
                  className="mt-8 h-1.5 w-full max-w-xs mx-auto md:mx-0 rounded-full overflow-hidden"
                  style={{ background: t.borderSoft }}
                >
                  <div
                    className="barra-construccion h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})` }}
                  />
                </div>
              </div>

              {/* Columna derecha: ilustración de constructor (CSS ligero, sin lag) */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative" style={{ width: 240, height: 220 }}>
                  {/* Halo detrás */}
                  <div
                    aria-hidden
                    className="absolute inset-0 m-auto w-48 h-48 rounded-full opacity-50 blur-2xl"
                    style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }}
                  />

                  {/* Señal de obra balanceándose (cobre, rayada) */}
                  <div
                    className="senal-mece absolute left-1/2 -translate-x-1/2 z-10"
                    style={{ top: 0 }}
                  >
                    {/* Cuerda de la que cuelga */}
                    <div className="mx-auto w-px h-6" style={{ background: t.border }} />
                    <div
                      className="px-3 py-2 rounded-lg text-center"
                      style={{
                        background: t.accent,
                        color: "#14100A",
                        fontFamily: MONO, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                        boxShadow: t.shadowMd,
                        backgroundImage: "repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0 8px, transparent 8px 16px)",
                      }}
                    >
                      EN OBRA
                    </div>
                  </div>

                  {/* Casco de constructor */}
                  <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: 36 }}>
                    <div className="relative" style={{ width: 96, height: 60 }}>
                      {/* Cúpula del casco */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-3"
                        style={{
                          width: 72, height: 40,
                          borderTopLeftRadius: 40, borderTopRightRadius: 40,
                          background: `linear-gradient(160deg, ${t.accentText}, ${t.accent})`,
                          boxShadow: t.shadowMd,
                        }}
                      />
                      {/* Cresta central del casco */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-3"
                        style={{ width: 10, height: 38, borderRadius: 6, background: "rgba(0,0,0,0.18)" }}
                      />
                      {/* Ala / visera */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-1.5"
                        style={{ width: 96, height: 12, borderRadius: 8, background: t.accent, boxShadow: t.shadowSoft }}
                      />
                    </div>
                  </div>

                  {/* Llave inglesa que se mece (cian) */}
                  <div className="llave-mece absolute" style={{ bottom: 30, right: 22 }}>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: t.surface, border: `1px solid ${t.border}`, boxShadow: t.shadowSoft }}
                    >
                      <Wrench size={22} style={{ color: t.accent2Text }} />
                    </div>
                  </div>

                  {/* Conos de obra en la base */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex gap-3" style={{ bottom: 0 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div
                          style={{
                            width: 0, height: 0,
                            borderLeft: "9px solid transparent",
                            borderRight: "9px solid transparent",
                            borderBottom: `20px solid ${t.accent}`,
                          }}
                        />
                        <div className="w-6 h-1.5 rounded-sm -mt-px" style={{ background: t.accentText }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   PROYECTOS — filtros por pestaña y rejilla de 2 columnas:
   agrega proyectos al array y el diseño escala solo.
   ============================================================ */

// Color de acento por categoría de proyecto
const COLOR_CAT = {
  implementado: "ok",     // verde — ya en uso real
  negocio: "accent",      // cobre — solución de negocio
  personal: "accent2",    // cian — exploración personal
};

function EtiquetaCategoria({ t, categoria, codigo }) {
  const claveColor = COLOR_CAT[categoria] || "accent";
  const color = t[claveColor];
  const cat = CATEGORIAS.find((c) => c.id === categoria);
  const corto = categoria === "implementado" ? "CLIENTE REAL"
    : categoria === "negocio" ? "PARA TERCEROS" : "PERSONAL";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
      style={{ background: "rgba(7,9,13,0.6)", backdropFilter: "blur(6px)", border: `1px solid ${color}44` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: "rgba(255,255,255,0.92)" }}>{corto}</span>
    </span>
  );
}

// Miniatura del proyecto presentada como una "ventana de navegador":
// barra superior con semáforo + URL falsa, y debajo la captura.
// Esto hace que cada proyecto se lea como un producto real desplegado.
//   alta = versión grande para la portada de la página individual.
function MiniaturaProyecto({ t, p, alta = false }) {
  // URL de muestra para la barra del navegador (decorativa)
  const urlFalsa = `caverotech.com/${p.id}`;
  return (
    <div className={alta ? "" : "px-4 pt-4"}>
      <div
        className="relative overflow-hidden"
        style={
          alta
            ? {}
            : { borderRadius: 12, border: `1px solid ${t.borderSoft}`, boxShadow: t.shadowMd }
        }
      >
        {/* Barra del navegador */}
        <div
          className="flex items-center gap-2 px-3"
          style={{ height: alta ? 38 : 32, background: t.surface2, borderBottom: `1px solid ${t.borderSoft}` }}
        >
          {/* Semáforo */}
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
          </span>
          {/* Barra de dirección */}
          <span
            className="ml-2 flex-1 truncate rounded-md px-2.5 py-1"
            style={{ fontFamily: MONO, fontSize: 10, color: t.faint, background: t.bg, border: `1px solid ${t.borderSoft}` }}
          >
            {urlFalsa}
          </span>
        </div>

        {/* Captura del proyecto */}
        <Foto src={p.imagen} alt={p.nombre} gradiente={p.gradiente} tinte={false} className={alta ? "h-56 md:h-80" : "h-40 md:h-44"}>
          {/* Velo de marca del proyecto */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(155deg, ${p.gradiente[0]}CC 0%, ${p.gradiente[1]}55 55%, rgba(7,9,13,0.45) 100%)` }}
          />
          {/* Rejilla técnica sutil */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage: "radial-gradient(120% 100% at 0% 0%, #000, transparent 70%)",
              WebkitMaskImage: "radial-gradient(120% 100% at 0% 0%, #000, transparent 70%)",
            }}
          />
          {/* Etiqueta de categoría, abajo a la izquierda */}
          <div className="absolute bottom-2.5 left-2.5">
            <EtiquetaCategoria t={t} categoria={p.categoria} codigo={p.codigo} />
          </div>
        </Foto>
      </div>
    </div>
  );
}

// Tarjeta del mosaico "bento". `destacado` la hace grande (proyecto estrella):
// la imagen ocupa todo el bloque como fondo y el texto va encima, abajo.
function TarjetaBento({ t, p, abrir, delay, destacado }) {
  const color = t[COLOR_CAT[p.categoria]] || t.accent;
  return (
    <Reveal delay={delay} className="h-full">
      <button
        type="button"
        onClick={() => abrir(p.id)}
        className="bento-item group relative w-full h-full text-left rounded-2xl overflow-hidden transition-all duration-300"
        style={{ background: t.card, border: `1px solid ${t.borderSoft}`, minHeight: destacado ? 320 : 230 }}
      >
        {/* Imagen de fondo a sangre completa */}
        <div className="absolute inset-0">
          <Foto src={p.imagen} alt={p.nombre} gradiente={p.gradiente} tinte={false} className="w-full h-full">
            {/* Velo de marca + oscurecido para legibilidad del texto */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, ${p.gradiente[0]}AA 0%, ${p.gradiente[1]}33 40%, rgba(7,9,13,0.92) 100%)` }}
            />
            {/* Rejilla técnica sutil */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
                maskImage: "radial-gradient(120% 90% at 100% 0%, #000, transparent 65%)",
                WebkitMaskImage: "radial-gradient(120% 90% at 100% 0%, #000, transparent 65%)",
              }}
            />
          </Foto>
        </div>

        {/* Brillo que sigue al cursor */}
        <div className="foco absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: 2 }} />

        {/* Esquina superior: categoría + código */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <EtiquetaCategoria t={t} categoria={p.categoria} codigo={p.codigo} />
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.65)" }}>
            {p.codigo}
          </span>
        </div>

        {/* Contenido inferior */}
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 z-10">
          <h3
            className="font-bold mb-2 leading-tight"
            style={{ color: "#fff", fontFamily: DISPLAY, fontSize: destacado ? "1.7rem" : "1.2rem", letterSpacing: "-0.01em" }}
          >
            {p.nombre}
          </h3>
          <p
            className={`leading-relaxed mb-4 ${destacado ? "text-sm md:text-base max-w-xl" : "text-sm"}`}
            style={{
              color: "rgba(255,255,255,0.82)",
              // En las tarjetas pequeñas, recortamos a 2 líneas para mantener la altura uniforme
              ...(destacado ? {} : { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }),
            }}
          >
            {p.corto}
          </p>

          {/* Stack: en destacado se ven todos; en pequeño, los primeros 3 */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {(destacado ? p.stack : p.stack.slice(0, 3)).map((s) => (
              <span
                key={s}
                className="px-2 py-1 rounded-md"
                style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                {s}
              </span>
            ))}
            {!destacado && p.stack.length > 3 && (
              <span style={{ fontFamily: MONO, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>+{p.stack.length - 3}</span>
            )}
          </div>

          {/* Llamada a la acción */}
          <span
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#fff" }}
          >
            Ver caso completo
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 group-hover:translate-x-1"
              style={{ background: color, color: "#0A0A0A" }}
            >
              <ArrowRight size={14} />
            </span>
          </span>
        </div>

        {/* Línea de acento que aparece arriba en hover */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10"
          style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        />
      </button>
    </Reveal>
  );
}

function Proyectos({ t, abrir }) {
  const [filtro, setFiltro] = useState("todos");
  const pestanas = [
    { id: "todos", label: "Todos", n: DATOS.proyectos.length },
    ...CATEGORIAS.map((c) => ({
      id: c.id,
      label: c.titulo,
      n: DATOS.proyectos.filter((p) => p.categoria === c.id).length,
    })),
  ];
  const lista = (filtro === "todos" ? DATOS.proyectos : DATOS.proyectos.filter((p) => p.categoria === filtro))
    .slice()
    .sort((a, b) => (a.orden ?? 99) - (b.orden ?? 99));
  const nota = CATEGORIAS.find((c) => c.id === filtro)?.nota;

  return (
    <section id="proyectos" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="04"
          eyebrow="Proyectos"
          titulo="Problemas reales, soluciones en producción"
          descripcion="Cada proyecto incluye su caso completo: el problema, la solución, la arquitectura y las decisiones técnicas detrás."
          acento="cian"
        />

        {/* Pestañas de filtro */}
        <Reveal delay={60}>
          <div className="flex flex-wrap gap-2 mb-3">
            {pestanas.map((tab) => {
              const activa = filtro === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFiltro(tab.id)}
                  className="boton-base px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    background: activa ? t.accent : "rgba(13,17,23,0.6)",
                    color: activa ? "#14100A" : t.muted,
                    border: `1px solid ${activa ? t.accent : t.border}`,
                  }}
                >
                  {tab.label}
                  <span className="ml-1.5" style={{ fontFamily: MONO, fontSize: 11, opacity: 0.75 }}>{tab.n}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm mb-7" style={{ color: t.faint, minHeight: 20 }}>
            {nota || "Todo mi trabajo: clientes reales, proyectos aplicados y personales."}
          </p>
        </Reveal>

        {/* Mosaico "bento": el primer proyecto destaca grande, el resto en rejilla */}
        <div key={filtro} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 auto-rows-fr">
          {lista.map((p, i) => {
            // El primer proyecto de la lista es el destacado: ocupa 2 columnas.
            const destacado = i === 0 && lista.length > 1;
            return (
              <div key={p.id} className={destacado ? "md:col-span-2" : ""}>
                <TarjetaBento
                  t={t}
                  p={p}
                  abrir={abrir}
                  delay={Math.min(i, 5) * 70}
                  destacado={destacado}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PÁGINA INDIVIDUAL DE PROYECTO
   ============================================================ */

const GRUPOS_STACK = [
  ["frontend", "Frontend"],
  ["backend", "Backend"],
  ["baseDatos", "Base de datos"],
  ["herramientas", "Herramientas"],
  ["ia", "Inteligencia Artificial"],
];

function SeccionDetalle({ t, etiqueta, titulo, children }) {
  return (
    <Reveal className="mb-10">
      <Eyebrow t={t}>{etiqueta}</Eyebrow>
      {titulo && <h2 className="text-xl font-bold tracking-tight mb-3" style={{ color: t.text }}>{titulo}</h2>}
      {children}
    </Reveal>
  );
}

// Página de "historia" — para iniciativas no técnicas (ej. Kidsapiens).
// Layout distinto: narrativa + experiencias + aprendizajes, sin stack técnico.
function PaginaHistoria({ t, proyecto: p, volver }) {
  const d = p.detalle;
  return (
    <main className="pt-24 pb-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <button
            type="button"
            onClick={() => volver("proyectos")}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-transform duration-200 hover:-translate-x-1"
            style={{ color: t.muted }}
          >
            <ArrowLeft size={15} /> Volver a proyectos
          </button>
        </Reveal>

        <Reveal delay={60}>
          <div className="rounded-2xl overflow-hidden mb-8 relative" style={{ border: `1px solid ${t.borderSoft}`, boxShadow: t.shadowLg }}>
            <MiniaturaProyecto t={t} p={p} alta />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ background: t.accent2Soft, border: `1px solid ${t.accent2Soft}` }}>
            <Sparkles size={13} style={{ color: t.accent2Text }} />
            <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: t.accent2Text }}>DIVULGACIÓN · 2023</span>
          </div>
          <h1 className="mb-4" style={{ color: t.text, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {p.nombre}
          </h1>
          <p className="leading-relaxed mb-12" style={{ color: t.muted, fontSize: "1.1rem" }}>{d.resumen}</p>
        </Reveal>

        {/* La historia */}
        <SeccionDetalle t={t} etiqueta="La historia" titulo="Cómo empezó">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.historia}</p>
        </SeccionDetalle>

        {/* Experiencias / sedes — línea de tiempo */}
        {d.experiencias?.length > 0 && (
          <SeccionDetalle t={t} etiqueta="Dónde lo llevé" titulo="Taller, charlas y exposiciones">
            <div className="space-y-3">
              {d.experiencias.map((e, i) => (
                <div key={i} className="tarjeta-suave flex gap-4 p-5 rounded-2xl" style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}>
                  <span
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: i % 2 ? t.accent2Soft : t.accentSoft, color: i % 2 ? t.accent2Text : t.accentText, fontFamily: MONO, fontWeight: 600, fontSize: 13 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm" style={{ color: t.text }}>{e.lugar}</h3>
                    <p style={{ fontFamily: MONO, fontSize: 11, color: t.accentText }} className="mb-1">{e.rol}</p>
                    <p className="text-sm leading-snug" style={{ color: t.muted }}>{e.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          </SeccionDetalle>
        )}

        {/* Aprendizajes */}
        {d.aprendizajes?.length > 0 && (
          <SeccionDetalle t={t} etiqueta="Qué me dejó" titulo="Lo que aprendí de todo esto">
            <div className="grid sm:grid-cols-3 gap-4">
              {d.aprendizajes.map((a, i) => (
                <div key={i} className="tarjeta-suave p-5 rounded-2xl h-full" style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: t.accentSoft, color: t.accentText }}>
                    <Sparkles size={15} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5" style={{ color: t.text }}>{a.titulo}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{a.texto}</p>
                </div>
              ))}
            </div>
          </SeccionDetalle>
        )}

        <SeccionDetalle t={t} etiqueta="Resultado" titulo="El impacto que tuvo">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.impacto}</p>
        </SeccionDetalle>

        <Reveal>
          <div className="flex flex-wrap gap-3 pt-2">
            <Boton t={t} primario icono={ArrowLeft} onClick={() => volver("proyectos")}>Más proyectos</Boton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

function PaginaProyecto({ t, proyecto: p, volver }) {
  const d = p.detalle;
  if (p.tipo === "historia") return <PaginaHistoria t={t} proyecto={p} volver={volver} />;
  return (
    <main className="pt-24 pb-20 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <button
            type="button"
            onClick={() => volver("proyectos")}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-transform duration-200 hover:-translate-x-1"
            style={{ color: t.muted }}
          >
            <ArrowLeft size={15} /> Volver a proyectos
          </button>
        </Reveal>

        <Reveal delay={60}>
          <div className="rounded-xl overflow-hidden mb-8" style={{ border: `1px solid ${t.borderSoft}`, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}>
            <MiniaturaProyecto t={t} p={p} alta />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mb-3" style={{ color: t.text, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            {p.nombre}
          </h1>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {p.stack.map((s) => <Chip key={s} t={t}>{s}</Chip>)}
          </div>
          <div className="flex flex-wrap gap-3 mb-12">
            <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver demo</Boton>
            <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>
          </div>
        </Reveal>

        <SeccionDetalle t={t} etiqueta="Resumen ejecutivo">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.resumen}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Problema" titulo="¿Qué necesidad existía?">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.problemaLargo}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Solución" titulo="¿Cómo se resolvió?">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.solucion}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Arquitectura" titulo="Enfoque técnico">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.arquitectura}</p>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Stack tecnológico">
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${t.borderSoft}` }}>
            {GRUPOS_STACK.map(([clave, titulo], i) =>
              d.stackDetalle[clave]?.length ? (
                <div
                  key={clave}
                  className="p-4 md:p-5 grid md:grid-cols-3 gap-1 md:gap-4"
                  style={{ background: i % 2 ? t.surface2 : "rgba(13,17,23,0.65)", borderTop: i ? `1px solid ${t.borderSoft}` : "none" }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: t.accentText }} className="uppercase pt-0.5">
                    {titulo}
                  </span>
                  <ul className="space-y-1.5 md:col-span-2">
                    {d.stackDetalle[clave].map((item) => (
                      <li key={item} className="text-sm leading-snug" style={{ color: t.muted }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Decisiones técnicas" titulo="Criterio detrás del código">
          <div className="space-y-4">
            {d.decisiones.map((dec) => (
              <div key={dec.titulo} className="tarjeta-suave p-5 rounded-2xl" style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}>
                <h3 className="font-semibold text-sm mb-1.5" style={{ color: t.text }}>{dec.titulo}</h3>
                <p className="text-sm leading-relaxed" style={{ color: t.muted }}>{dec.texto}</p>
              </div>
            ))}
          </div>
        </SeccionDetalle>

        <SeccionDetalle t={t} etiqueta="Resultado" titulo="Impacto del proyecto">
          <p className="leading-relaxed" style={{ color: t.muted, fontSize: 15 }}>{d.impacto}</p>
        </SeccionDetalle>

        <Reveal>
          <div className="flex flex-wrap gap-3 pt-2">
            <Boton t={t} primario icono={ExternalLink} href={d.demo}>Ver demo</Boton>
            <Boton t={t} icono={FolderGit2} href={d.repo}>Código en GitHub</Boton>
            <Boton t={t} icono={ArrowLeft} onClick={() => volver("proyectos")}>Más proyectos</Boton>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

/* ============================================================
   GALERÍA — collage masonry de momentos y recuerdos
   ============================================================ */

// Para reactivar: cuando tengas las fotos, recupera el muro masonry
// original (el .map sobre DATOS.galeria con FotoGaleria y su lightbox)
// desde el historial de git y reemplaza este componente.
function Galeria({ t }) {
  // Las polaroids de la ilustración: rotación, tema (cobre/cian) y un emoji.
  const polaroids = [
    { rot: -8, color: t.accent, emoji: "📸", x: "8%", delay: "0s" },
    { rot: 6, color: t.accent2, emoji: "🎤", x: "38%", delay: "0.3s" },
    { rot: -4, color: t.accent, emoji: "🤝", x: "66%", delay: "0.6s" },
  ];

  return (
    <section id="galeria" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="05"
          eyebrow="Mi panel"
          titulo="El muro de mis recuerdos"
        />

        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              background: `linear-gradient(160deg, ${t.surface} 0%, ${t.bg} 100%)`,
              border: `1px solid ${t.borderSoft}`,
              boxShadow: t.shadowMd,
            }}
          >
            {/* Resplandores de marca */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-20 w-96 h-96 rounded-full opacity-40 blur-3xl"
              style={{ background: `radial-gradient(circle, ${t.accentSoft}, transparent 70%)` }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-16 w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }}
            />
            {/* Textura de puntos del corcho/muro */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />

            <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
              {/* Columna izquierda: mensaje */}
              <div className="text-center md:text-left order-2 md:order-1">
                <span
                  className="estado-vivo inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
                  style={{
                    fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.16em",
                    color: t.accent2Text, background: t.accent2Soft, border: `1px solid ${t.border}`,
                  }}
                >
                  <span className="punto-vivo w-1.5 h-1.5 rounded-full" style={{ background: t.accent2 }} />
                  EN CONSTRUCCIÓN
                </span>

                <h3
                  className="text-2xl md:text-[2rem] leading-tight font-bold mb-3"
                  style={{ fontFamily: DISPLAY, color: t.text }}
                >
                  Este muro pronto cobrará vida
                </h3>
                <p
                  className="text-sm md:text-base leading-relaxed mb-7 mx-auto md:mx-0 max-w-md"
                  style={{ color: t.muted }}
                >
                  Estoy reuniendo las fotos de mis talleres, charlas y momentos
                  detrás del código. Muy pronto las verás clavadas aquí.
                </p>

                {/* Chips de lo que vendrá */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {["Talleres", "Charlas", "Equipo", "Detrás del código"].map((tema) => (
                    <span
                      key={tema}
                      className="px-3 py-1.5 rounded-lg text-xs"
                      style={{
                        fontFamily: MONO, color: t.muted,
                        background: t.surface2, border: `1px solid ${t.borderSoft}`,
                      }}
                    >
                      {tema}
                    </span>
                  ))}
                </div>

                {/* Barra de progreso decorativa */}
                <div
                  className="mt-8 h-1.5 w-full max-w-xs mx-auto md:mx-0 rounded-full overflow-hidden"
                  style={{ background: t.borderSoft }}
                >
                  <div
                    className="barra-construccion h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${t.accent2}, ${t.accent})` }}
                  />
                </div>
              </div>

              {/* Columna derecha: polaroids "clavándose" (CSS, temática de fotos) */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="relative" style={{ width: 280, height: 230 }}>
                  {polaroids.map((p, i) => (
                    <div
                      key={i}
                      className="polaroid-flota absolute"
                      style={{
                        left: p.x,
                        top: `${i * 14}px`,
                        ["--rot"]: `${p.rot}deg`,
                        animationDelay: p.delay,
                      }}
                    >
                      {/* Chincheta */}
                      <span
                        aria-hidden
                        className="absolute left-1/2 -translate-x-1/2 -top-2 w-3.5 h-3.5 rounded-full z-10"
                        style={{ background: p.color, boxShadow: "0 2px 5px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.3)" }}
                      />
                      {/* Marco polaroid */}
                      <div
                        className="rounded-md flex items-center justify-center"
                        style={{ width: 92, height: 110, background: "#F4F1EA", padding: "8px 8px 18px", boxShadow: t.shadowLg, border: "1px solid rgba(0,0,0,0.08)" }}
                      >
                        <div
                          className="w-full h-full rounded-sm flex items-center justify-center text-2xl"
                          style={{ background: `linear-gradient(160deg, ${t.surface2}, ${t.surface})` }}
                        >
                          {p.emoji}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACTO Y FOOTER
   ============================================================ */

function Contacto({ t }) {
  const canales = [
    { icono: Mail, etiqueta: "Email", valor: DATOS.email, href: `mailto:${DATOS.email}` },
    { icono: Github, etiqueta: "GitHub", valor: "Ver repositorios", href: DATOS.github },
    { icono: Linkedin, etiqueta: "LinkedIn", valor: "Perfil profesional", href: DATOS.linkedin },
  ];
  return (
    <section id="contacto" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-center"
          style={{ background: t.card, border: `1px solid ${t.border}`, boxShadow: t.shadowMd }}
        >
          {/* Borde superior de luz cobre→cian */}
          <div
            aria-hidden
            className="absolute top-0 inset-x-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, ${t.accent2}, transparent)` }}
          />
          {/* Cuadrícula de puntos animada (detalle característico) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, #000, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, #000, transparent 75%)",
            }}
          />
          {/* Haz de luz que barre en diagonal (escáner) */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ opacity: movReducido() ? 0 : 1 }}
          >
            <div
              className="absolute"
              style={{
                top: "-50%", left: "-30%", width: "40%", height: "200%",
                background: `linear-gradient(90deg, transparent, ${t.accent2}1F, transparent)`,
                transform: "rotate(18deg)",
                animation: movReducido() ? "none" : "barrido 7s ease-in-out infinite",
              }}
            />
          </div>
          {/* Glow cobre */}
          <div
            aria-hidden
            className="absolute pointer-events-none rounded-full"
            style={{
              top: -140, left: "38%", marginLeft: -200, width: 400, height: 260,
              background: "radial-gradient(ellipse, rgba(232,152,62,0.16), transparent 70%)",
              animation: movReducido() ? "none" : "flotar 10s ease-in-out infinite",
            }}
          />
          {/* Glow cian */}
          <div
            aria-hidden
            className="absolute pointer-events-none rounded-full"
            style={{
              top: -120, right: "30%", width: 340, height: 230,
              background: "radial-gradient(ellipse, rgba(34,211,238,0.12), transparent 70%)",
              animation: movReducido() ? "none" : "flotar 12s ease-in-out infinite reverse",
            }}
          />
          <Reveal>
            {/* Robot animado (Lottie) — detalle con carácter */}
            <div className="relative inline-block mb-4">
              <div className="avatar-saluda mx-auto" style={{ width: 200, height: 150 }}>
                <DotLottieReact
                  src="/robot.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-2.5 mb-5">
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: t.accentText, letterSpacing: "0.08em" }}>06</span>
              <span className="h-px w-6" style={{ background: t.accentText, opacity: 0.6 }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", color: t.accent2Text }}>CONTACTO</span>
            </div>
            <h2
              className="max-w-2xl mx-auto mb-4"
              style={{ color: t.text, fontSize: "clamp(1.7rem, 3.6vw, 2.7rem)", lineHeight: 1.12, fontWeight: 700, letterSpacing: "-0.025em" }}
            >
              ¿Buscas un desarrollador web que cuide cada detalle?
            </h2>
            <p className="max-w-xl mx-auto leading-relaxed mb-9" style={{ color: t.muted, fontSize: "1.05rem" }}>
              Estoy abierto a oportunidades como desarrollador web / frontend, presenciales o remotas. También sumo automatización e IA cuando el proyecto lo necesita. Respondo rápido y con gusto conversamos sobre cómo puedo aportar a tu equipo.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative flex flex-col sm:flex-row justify-center gap-3 mb-9">
              {canales.map((c, i) => (
                <a
                  key={c.etiqueta}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="canal-contacto group flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all duration-300"
                  style={{ background: t.surface2, border: `1px solid ${t.borderSoft}` }}
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: i % 2 === 0 ? t.accentSoft : t.accent2Soft,
                      color: i % 2 === 0 ? t.accentText : t.accent2Text,
                    }}
                  >
                    <c.icono size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs" style={{ fontFamily: MONO, color: t.faint }}>{c.etiqueta}</span>
                    <span className="block text-sm font-medium" style={{ color: t.text, wordBreak: "break-word" }}>{c.valor}</span>
                  </span>
                </a>
              ))}
            </div>
            <Boton t={t} primario icono={Mail} href={`mailto:${DATOS.email}`}>Escríbeme ahora</Boton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }) {
  const redes = [
    { Icono: Github, href: DATOS.github, label: "GitHub" },
    { Icono: Linkedin, href: DATOS.linkedin, label: "LinkedIn" },
    { Icono: Mail, href: `mailto:${DATOS.email}`, label: "Email" },
  ];
  return (
    <footer className="relative py-10 px-5 md:px-8" style={{ borderTop: `1px solid ${t.borderSoft}` }}>
      {/* Acento de luz superior */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${t.accent}44, ${t.accent2}44, transparent)`, maxWidth: "40rem", margin: "0 auto" }}
      />
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-sm" style={{ color: t.muted }}>
            © {new Date().getFullYear()} {DATOS.nombre}
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: 11, color: t.faint }}>
            <MapPin size={12} /> {DATOS.ubicacion} · Hecho con React y criterio
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {redes.map(({ Icono, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="enlace-social w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${t.border}`, background: "rgba(13,17,23,0.5)", color: t.muted }}
            >
              <Icono size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const t = TEMA;
  // ¿Mostrar la pantalla de bienvenida antes del portafolio?
  // (mientras elegimos cuál de las 3 intros usar, está en modo selector)
  const [mostrarIntro, setMostrarIntro] = useState(true);
  // vista: { pagina: 'seccion', id } | { pagina: 'proyecto', id }
  const [vista, setVista] = useState({ pagina: "seccion", id: "inicio" });

  // Navegar a una sección = mostrar SOLO esa sección (estilo app), y subir arriba
  const irASeccion = (id) => {
    setVista({ pagina: "seccion", id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const abrirProyecto = (id) => {
    setVista({ pagina: "proyecto", id });
    window.scrollTo({ top: 0 });
  };

  const volver = (seccion) => {
    irASeccion(seccion || "proyectos");
  };

  const proyectoActivo = vista.pagina === "proyecto" ? DATOS.proyectos.find((p) => p.id === vista.id) : null;
  const seccionActiva = vista.pagina === "seccion" ? vista.id : null;

  // Mapa de secciones → componente. "inicio" muestra Hero + Sobre mí (portada).
  const render = {
    inicio: (
      <>
        <Hero t={t} irASeccion={irASeccion} />
      </>
    ),
    "sobre-mi": <SobreMi t={t} />,
    tecnologias: <Tecnologias t={t} />,
    certificados: <Certificados t={t} />,
    proyectos: <Proyectos t={t} abrir={abrirProyecto} />,
    galeria: <Galeria t={t} />,
    contacto: <Contacto t={t} />,
  };

  // Mientras dure la bienvenida, mostramos solo la intro.
  if (mostrarIntro) {
    return <Bienvenida onTerminar={() => setMostrarIntro(false)} />;
  }

  return (
    <div className="portafolio-entra" style={{ background: t.bg, color: t.text, fontFamily: SANS, minHeight: "100vh" }}>
      <style>{`
        /* Aparición suave del portafolio tras la intro (evita el salto en seco) */
        .portafolio-entra { animation: portafolioEntra 0.6s ease both; }
        @keyframes portafolioEntra { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .portafolio-entra { animation: none; } }
        html { scroll-behavior: smooth; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; overflow-x: hidden; }
        h1, h2, h3, h4 { font-family: ${DISPLAY}; }
        @keyframes flotar { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -16px); } }
        @keyframes deriva1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(70px, 50px) scale(1.18); } }
        @keyframes deriva2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-60px, -40px) scale(1.12); } }
        @keyframes girar { to { transform: rotate(360deg); } }
        @keyframes barrido { 0% { transform: translateX(0) rotate(18deg); } 50% { transform: translateX(900%) rotate(18deg); } 100% { transform: translateX(0) rotate(18deg); } }
        @keyframes marquesina { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes aparecerPalabra { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalEntrada { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .palabra { display: inline-block; animation: aparecerPalabra 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes seccionEntra { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .seccion-entra { animation: seccionEntra 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
        /* Robot que espera en Contacto: flotación sutil */
        @keyframes flotarAvatar { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .avatar-saluda { animation: flotarAvatar 4.5s ease-in-out infinite; }
        .modal-entrada { animation: modalEntrada 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .marquesina:hover .pista { animation-play-state: paused; }
        .btn-brillo { position: relative; overflow: hidden; }
        .btn-brillo::after {
          content: ""; position: absolute; top: 0; left: -130%; width: 55%; height: 100%;
          background: linear-gradient(105deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-18deg); transition: left 0.55s ease;
        }
        .btn-brillo:hover::after { left: 150%; }
        .enlace-social:hover { transform: translateY(-2px); border-color: ${t.accent} !important; color: ${t.accentText} !important; background: ${t.accentSoft} !important; }
        .enlace-social:active { transform: translateY(0) scale(0.94); }
        .tarjeta-suave { will-change: transform; }
        .tarjeta-suave:hover { transform: translateY(-4px); border-color: ${t.border} !important; background: ${t.cardHover} !important; box-shadow: ${t.shadowMd}; }
        .canal-contacto:hover { transform: translateY(-3px); border-color: ${t.border} !important; box-shadow: ${t.shadowSoft}; }
        .flecha-carrusel:hover { transform: translateY(-2px); border-color: ${t.accent} !important; color: ${t.accentText} !important; background: ${t.accentSoft} !important; }
        .flecha-carrusel:active { transform: translateY(0) scale(0.92); }
        /* Mosaico bento de proyectos: elevación e imagen con zoom al pasar el mouse */
        .bento-item { will-change: transform; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease; }
        .bento-item:hover { transform: translateY(-5px); border-color: ${t.border} !important; box-shadow: ${t.shadowLg}; }
        .bento-item:active { transform: translateY(-2px) scale(0.995); }
        .bento-item .zoomable img { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
        .bento-item:hover .zoomable img { transform: scale(1.06); }
        .tarjeta-certificado:hover { border-color: ${t.accent2} !important; box-shadow: ${t.shadowMd}; }
        .tarjeta-certificado:active { transform: translateY(0) scale(0.98); }
        /* Sección "En construcción": punto vivo, barra, polaroids y constructor */
        .punto-vivo { animation: latido 1.6s ease-in-out infinite; }
        .senal-mece { animation: senalMece 3.5s ease-in-out infinite; transform-origin: top center; }
        @keyframes senalMece { 0%,100% { transform: translateX(-50%) rotate(-4deg); } 50% { transform: translateX(-50%) rotate(4deg); } }
        .llave-mece { animation: llaveMece 2.6s ease-in-out infinite; transform-origin: center; }
        @keyframes llaveMece { 0%,100% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } }
        .polaroid-flota { transform: rotate(var(--rot)); animation: polaroidFlota 4s ease-in-out infinite; }
        @keyframes polaroidFlota {
          0%,100% { transform: rotate(var(--rot)) translateY(0); }
          50% { transform: rotate(var(--rot)) translateY(-9px); }
        }
        @keyframes latido { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 ${t.accent}66; } 50% { opacity: 0.6; box-shadow: 0 0 0 5px transparent; } }
        .barra-construccion { width: 40%; animation: progresoVaiven 2.4s ease-in-out infinite; }
        @keyframes progresoVaiven {
          0% { margin-left: 0; width: 25%; }
          50% { margin-left: 60%; width: 40%; }
          100% { margin-left: 0; width: 25%; }
        }
        .zoomable img { transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
        .group:hover .zoomable img, .zoomable:hover img { transform: scale(1.07); }
        .foco { background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${t.accentSoft}, transparent 65%); }
        .sin-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .sin-scroll::-webkit-scrollbar { display: none; }
        /* Feedback de presión en botones (también en táctil) */
        .boton-base:active { transform: translateY(0) scale(0.97); }
        .boton-sec:hover { border-color: ${t.accent} !important; color: ${t.accentText} !important; background: ${t.accentSoft} !important; }
        /* Menú móvil: entrada y feedback */
        .menu-movil { animation: aparecerMenu 0.22s ease both; }
        @keyframes aparecerMenu { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .menu-item { animation: aparecerPalabra 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        .menu-item:active { background: ${t.accentSoft}; transform: scale(0.98); }
        /* Subrayado animado para los enlaces del nav */
        .nav-link { position: relative; }
        .nav-link::after {
          content: ""; position: absolute; left: 12px; right: 12px; bottom: 5px; height: 1.5px;
          background: linear-gradient(90deg, ${t.accent}, ${t.accent2});
          transform: scaleX(0); transform-origin: left; transition: transform 0.28s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link:hover::after { transform: scaleX(1); }
        /* Pulso sutil del punto "disponible" ya animado; aquí el punto de marca */
        @keyframes pulsoBorde { 0%,100% { box-shadow: 0 4px 18px rgba(232,152,62,0.28); } 50% { box-shadow: 0 6px 26px rgba(232,152,62,0.42); } }
        /* Scrollbar de marca (Chromium/Edge) */
        @media (pointer: fine) {
          *::-webkit-scrollbar { width: 11px; height: 11px; }
          *::-webkit-scrollbar-track { background: ${t.bg}; }
          *::-webkit-scrollbar-thumb { background: ${t.surface2}; border: 3px solid ${t.bg}; border-radius: 99px; }
          *::-webkit-scrollbar-thumb:hover { background: ${t.border}; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        ::selection { background: ${t.accent}; color: #14100A; }
        a:focus-visible, button:focus-visible { outline: 2px solid ${t.accent}; outline-offset: 2px; border-radius: 6px; }
      `}</style>

      <FondoGlobal t={t} />
      <LuzCursor />
      <BarraProgreso t={t} />

      <Nav
        t={t}
        irASeccion={irASeccion}
        enDetalle={vista.pagina === "proyecto"}
        volver={volver}
        seccionActiva={seccionActiva}
      />

      <div className="relative" style={{ zIndex: 2, minHeight: "70vh" }}>
        {proyectoActivo ? (
          <PaginaProyecto t={t} proyecto={proyectoActivo} volver={volver} />
        ) : (
          <main key={seccionActiva} className="seccion-entra">
            {render[seccionActiva] || render.inicio}
          </main>
        )}
        <Footer t={t} />
      </div>

      <VolverArriba t={t} />
    </div>
  );
}
