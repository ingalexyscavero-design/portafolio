import React, { useState, useEffect, useRef } from "react";
import { TEMA, DISPLAY, MONO } from "../theme/theme";
import { movReducido } from "../hooks/useReveal";
import { DATOS } from "../data/portafolio";

/* ============================================================
   BIENVENIDA / INTRO DEL PORTAFOLIO  ("Boot / Terminal")
   ------------------------------------------------------------
   Pantalla de presentación que aparece ANTES del portafolio:
   el sitio "arranca" como un sistema (consola que escribe sola +
   barra de progreso) y termina revelando el nombre con un acorde.

   El sonido requiere un clic previo (los navegadores bloquean el
   audio automático), por eso primero se muestra el botón "Entrar".

   Uso en App.jsx:
     {mostrarIntro && <Bienvenida onTerminar={() => setMostrarIntro(false)} />}
   ============================================================ */

const t = TEMA;

/* ------------------------------------------------------------
   Mini-motor de sonido (Web Audio API). Genera tonos sintéticos
   sutiles sin archivos. Debe crearse tras un clic del usuario.
   ------------------------------------------------------------ */
function crearAudio() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Beep corto para cada línea de la terminal.
    const beep = (freq = 660, dur = 0.07, vol = 0.05, tipo = "sine") => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = tipo;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    };

    // Nota cálida y refinada: onda sine + filtro + cola larga (sensación de reverb).
    const nota = (freq, retardo = 0, dur = 1.8, vol = 0.07) => {
      const inicio = ctx.currentTime + retardo;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filtro = ctx.createBiquadFilter();
      osc.type = "sine";
      osc.frequency.value = freq;
      filtro.type = "lowpass";
      filtro.frequency.value = 2600;            // suaviza los agudos
      gain.gain.setValueAtTime(0, inicio);
      gain.gain.linearRampToValueAtTime(vol, inicio + 0.06);        // ataque suave
      gain.gain.exponentialRampToValueAtTime(0.0001, inicio + dur); // cola larga
      osc.connect(filtro).connect(gain).connect(ctx.destination);
      osc.start(inicio);
      osc.stop(inicio + dur);
    };

    // Acorde elegante para el revelado del nombre: Sol mayor con 9ª (G–B–D–A),
    // notas que entran en arpegio suave. Suena cálido y sofisticado.
    const acorde = () => {
      const acordeHz = [196, 392, 493.88, 587.33, 880]; // G2, G4, B4, D5, A5
      acordeHz.forEach((f, i) => {
        const grave = i === 0;
        nota(f, i * 0.14, grave ? 2.6 : 2.0, grave ? 0.05 : 0.06);
      });
    };

    return { beep, acorde };
  } catch {
    return { beep: () => {}, acorde: () => {} };
  }
}

export default function Bienvenida({ onTerminar }) {
  const lineas = [
    "$ inicializando caverotech.com …",
    "✓ cargando interfaz            [ ok ]",
    "✓ compilando proyectos         [ ok ]",
    "✓ verificando certificados     [ ok ]",
    "✓ estableciendo conexión       [ ok ]",
    "› bienvenido.",
  ];
  const [arrancado, setArrancado] = useState(false); // ¿ya pulsó "Entrar"?
  const [visibles, setVisibles] = useState(0);   // cuántas líneas se ven
  const [progreso, setProgreso] = useState(0);   // 0–100
  const [fase, setFase] = useState("boot");      // boot → revelar → salir
  const audio = useRef(null);

  // Arranca la secuencia (tras el clic, con el audio ya desbloqueado).
  const iniciar = () => {
    audio.current = crearAudio();
    setArrancado(true);
  };

  useEffect(() => {
    if (!arrancado) return;
    if (movReducido()) { onTerminar(); return; }
    const timers = [];
    const paso = 620;     // ritmo del tipeo (ms por línea)
    const inicio = 500;   // pausa antes de la primera línea

    lineas.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibles(i + 1);
        if (i === lineas.length - 1) audio.current?.beep(880, 0.12, 0.06, "sine");
        else audio.current?.beep(520 + i * 40, 0.06, 0.045, "square");
      }, inicio + i * paso));
    });

    // Barra de progreso (en paralelo, pausada)
    const tProg = setInterval(() => setProgreso((p) => (p >= 100 ? 100 : p + 2)), 95);
    timers.push(tProg);

    // Revelar el nombre (con el acorde) y luego salir hacia el portafolio.
    const finBoot = inicio + lineas.length * paso + 600;
    timers.push(setTimeout(() => { setFase("revelar"); audio.current?.acorde(); }, finBoot));
    timers.push(setTimeout(() => setFase("salir"), finBoot + 2600));
    timers.push(setTimeout(onTerminar, finBoot + 3400));

    return () => { timers.forEach(clearTimeout); clearInterval(tProg); };
  }, [arrancado]);

  // -----------------------------------------------------------
  // PANTALLA INICIAL — botón "Entrar" (desbloquea el audio)
  // -----------------------------------------------------------
  if (!arrancado) {
    return (
      <div className="fixed inset-0 flex items-center justify-center px-5 entrada-fade" style={{ background: `radial-gradient(ellipse 90% 70% at 50% 35%, ${t.surface}, ${t.bg} 70%)`, zIndex: 200 }}>
        <EstilosBienvenida />
        {/* Resplandores de marca */}
        <div aria-hidden className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-30 luz-deriva-a" style={{ background: `radial-gradient(circle, ${t.accentSoft}, transparent 70%)` }} />
        <div aria-hidden className="absolute -bottom-28 right-1/4 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25 luz-deriva-b" style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }} />
        {/* Cuadrícula técnica sutil de fondo */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(${t.text} 1px, transparent 1px), linear-gradient(90deg, ${t.text} 1px, transparent 1px)`,
            backgroundSize: "46px 46px",
            maskImage: "radial-gradient(ellipse 70% 70% at 50% 45%, #000, transparent 78%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 45%, #000, transparent 78%)",
          }}
        />

        {/* Tarjeta de presentación */}
        <div
          className="tarjeta-intro relative w-full max-w-sm rounded-3xl px-8 pt-10 pb-8 text-center"
          style={{ background: t.card, border: `1px solid ${t.border}`, boxShadow: t.shadowLg, backdropFilter: "blur(10px)" }}
        >
          {/* Línea de luz superior cobre→cian */}
          <div aria-hidden className="absolute top-0 inset-x-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, ${t.accent2}, transparent)` }} />

          {/* Encabezado tipo sistema */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="punto-online w-1.5 h-1.5 rounded-full" style={{ background: t.ok }} />
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.26em", color: t.faint }}>CAVEROTECH.COM</span>
          </div>

          {/* Monograma con doble anillo y resplandor */}
          <div className="relative mx-auto mb-7" style={{ width: 104, height: 104 }}>
            <div aria-hidden className="absolute inset-0 rounded-full blur-xl opacity-60" style={{ background: `radial-gradient(circle, ${t.accentSoft}, ${t.accent2Soft} 60%, transparent 75%)` }} />
            <div
              aria-hidden
              className="aro-marca absolute inset-0 rounded-full"
              style={{ border: "1.5px solid transparent", background: `linear-gradient(135deg, ${t.accent}, ${t.accent2}) border-box`, WebkitMask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: 1.5 }}
            />
            <div className="absolute inset-[7px] rounded-full flex items-center justify-center" style={{ background: t.surface, border: `1px solid ${t.borderSoft}`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "2.1rem", letterSpacing: "-0.04em", background: `linear-gradient(135deg, ${t.accentText}, ${t.accent2Text})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                AC
              </span>
            </div>
          </div>

          {/* Nombre + rol */}
          <h2 className="mb-2" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(1.7rem, 5vw, 2.2rem)", color: t.text, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
            {DATOS.nombre}
          </h2>
          <p style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.26em", color: t.accent2Text }}>
            DESARROLLADOR WEB · FRONTEND
          </p>

          {/* Divisoria con punto central */}
          <div className="flex items-center gap-3 my-8">
            <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.borderSoft})` }} />
            <span className="w-1 h-1 rounded-full" style={{ background: t.accent }} />
            <span className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${t.borderSoft}, transparent)` }} />
          </div>

          {/* Botón principal */}
          <button
            type="button"
            onClick={iniciar}
            className="boton-entrar group relative inline-flex items-center justify-center gap-3 w-full px-8 py-4 rounded-full font-semibold transition-all duration-300 overflow-hidden"
            style={{ background: t.accent, color: "#14100A", fontFamily: DISPLAY, fontSize: 15.5, boxShadow: `0 10px 34px ${t.accent}44` }}
          >
            <span aria-hidden className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: "rgba(20,16,10,0.16)" }}>
              <span style={{ width: 0, height: 0, borderLeft: "7px solid #14100A", borderTop: "5px solid transparent", borderBottom: "5px solid transparent", marginLeft: 2 }} />
            </span>
            Entrar al portafolio
            <span aria-hidden className="brillo-btn absolute inset-0" />
          </button>

          {/* Pie con metadatos */}
          <div className="flex items-center justify-center gap-4 mt-7" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", color: t.faint }}>
            <span>ICA · PERÚ</span>
            <span className="w-1 h-1 rounded-full" style={{ background: t.borderSoft }} />
            <span>PORTAFOLIO ’26</span>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------
  // SECUENCIA — terminal "arrancando" y revelado del nombre
  // -----------------------------------------------------------
  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-6"
      style={{ background: t.bg, zIndex: 200, transition: "opacity 0.9s ease", opacity: fase === "salir" ? 0 : 1 }}
    >
      <EstilosBienvenida />
      <div aria-hidden className="absolute -top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: `radial-gradient(circle, ${t.accentSoft}, transparent 70%)` }} />
      <div aria-hidden className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-25" style={{ background: `radial-gradient(circle, ${t.accent2Soft}, transparent 70%)` }} />

      {fase === "boot" ? (
        <div className="w-full max-w-lg">
          {/* Ventana de terminal */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${t.border}`, boxShadow: t.shadowLg, background: t.surface }}>
            <div className="flex items-center gap-2 px-3 h-9" style={{ background: t.surface2, borderBottom: `1px solid ${t.borderSoft}` }}>
              <span className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
              </span>
              <span className="ml-2" style={{ fontFamily: MONO, fontSize: 11, color: t.faint }}>caverotech — bash</span>
            </div>
            <div className="p-5 space-y-1.5" style={{ minHeight: 200 }}>
              {lineas.slice(0, visibles).map((l, i) => (
                <p key={i} className="linea-term" style={{ fontFamily: MONO, fontSize: 13, color: l.startsWith("›") ? t.accent2Text : l.startsWith("✓") ? t.ok : t.muted }}>
                  {l}
                  {i === visibles - 1 && <span className="cursor-term" style={{ color: t.accent }}>▌</span>}
                </p>
              ))}
            </div>
          </div>
          {/* Barra de progreso */}
          <div className="mt-5 h-1 rounded-full overflow-hidden" style={{ background: t.borderSoft }}>
            <div className="h-full rounded-full" style={{ width: `${progreso}%`, background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`, transition: "width 0.1s linear" }} />
          </div>
          <p className="mt-2 text-right" style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint }}>{progreso}%</p>
        </div>
      ) : (
        // Revelado del nombre
        <div className="text-center revelar-nombre">
          <h1 style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(2.2rem, 8vw, 4.5rem)", letterSpacing: "-0.03em", color: t.text, lineHeight: 1 }}>
            {DATOS.nombre}
          </h1>
          <p className="mt-3" style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.3em", color: t.accentText }}>PORTAFOLIO</p>
        </div>
      )}
    </div>
  );
}

/* Animaciones de la intro (escritura de terminal, cursor y revelado). */
function EstilosBienvenida() {
  return (
    <style>{`
      .linea-term { animation: aparecerLinea 0.25s ease both; }
      @keyframes aparecerLinea { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
      .cursor-term { animation: parpadeo 1s step-end infinite; margin-left: 2px; }
      @keyframes parpadeo { 50% { opacity: 0; } }
      .revelar-nombre { animation: revelarNombre 1.8s cubic-bezier(0.22,1,0.36,1) both; }
      @keyframes revelarNombre { from { opacity: 0; filter: blur(18px); transform: scale(0.92); letter-spacing: 0.1em; } to { opacity: 1; filter: blur(0); transform: scale(1); letter-spacing: -0.03em; } }

      /* Pantalla "Entrar": fade del fondo + entrada con escala de la tarjeta */
      .entrada-fade { animation: entradaFade 0.6s ease both; }
      @keyframes entradaFade { from { opacity: 0; } to { opacity: 1; } }
      .tarjeta-intro { animation: subirTarjeta 0.8s cubic-bezier(0.22,1,0.36,1) both; }
      @keyframes subirTarjeta { from { opacity: 0; transform: translateY(22px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

      /* Aro de marca girando lentamente */
      .aro-marca { animation: girarAro 16s linear infinite; }
      @keyframes girarAro { to { transform: rotate(360deg); } }

      /* Punto "online" del encabezado, con pulso */
      .punto-online { animation: pulsoPunto 1.8s ease-in-out infinite; }
      @keyframes pulsoPunto { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 ${t.ok}66; } 50% { opacity: 0.6; box-shadow: 0 0 0 5px transparent; } }

      /* Luces de fondo que derivan suavemente */
      .luz-deriva-a { animation: derivaA 14s ease-in-out infinite; }
      .luz-deriva-b { animation: derivaB 16s ease-in-out infinite; }
      @keyframes derivaA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(40px, 30px); } }
      @keyframes derivaB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-36px, -28px); } }

      /* Botón Entrar */
      .boton-entrar:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 16px 46px ${t.accent}66; }
      .boton-entrar:active { transform: translateY(0) scale(0.98); }
      .brillo-btn { background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%); transform: translateX(-120%); }
      .boton-entrar:hover .brillo-btn { transform: translateX(120%); transition: transform 0.7s ease; }

      @media (prefers-reduced-motion: reduce) {
        .linea-term, .cursor-term, .revelar-nombre, .entrada-fade, .tarjeta-intro,
        .aro-marca, .punto-online, .luz-deriva-a, .luz-deriva-b { animation: none !important; }
      }
    `}</style>
  );
}
