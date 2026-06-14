import React, { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Github, Linkedin, Mail, Download, ArrowRight, ArrowLeft, ArrowUpRight,
  Menu, X, ChevronLeft, ChevronRight, ChevronDown, MapPin, CircleCheck, Layers, Database, Wrench,
  Sparkles, Monitor, Award, ExternalLink, FolderGit2, ArrowUp,
  Code2, Server, Settings2, BrainCircuit,
  BarChart3, BookOpen, MessageSquare, Bot, Workflow,
} from "lucide-react";

// Iconos Lucide para marcas sin logo en Simple Icons (clave -> componente)
const LUCIDE_TECH = { powerbi: BarChart3, gpt: MessageSquare, notebooklm: BookOpen, perplexity: Bot, n8n: Workflow };

/* ============================================================
   DATOS DEL PORTAFOLIO — edita todo desde aquí.
   Nada más abajo necesita tocarse para cambiar contenido.
   ============================================================ */

const DATOS = {
  nombre: "Alexys Cavero",
  titulo: "Desarrollador Web Junior · Frontend",
  tituloLinea2: "Automatización e IA · Estudiante de Ingeniería de Sistemas",
  descripcion:
    "Diseño y construyo sitios y aplicaciones web modernas, rápidas y a medida. Me enfoco en el frontend y la experiencia de usuario, y complemento con automatización de procesos e IA para entregar soluciones completas, listas para producción.",
  ubicacion: "Ica, Perú",
  disponible: "Disponible para oportunidades",
  email: "ing.alexyscavero@gmail.com",
  github: "https://github.com/ingalexyscavero-design",
  linkedin: "https://www.linkedin.com/in/alexyscavero/",
  cvUrl: "/Alexys-Cavero-CV-2026.pdf",       // ← PDF en public/

  /* FOTOS — placeholders de Unsplash (licencia libre).
     Reemplázalas por tus fotos reales y capturas de tus proyectos.
     Si una URL falla, el sitio muestra automáticamente un degradado. */
  fotos: {
    // Imágenes tecnológicas oscuras (Unsplash). Reemplázalas por las tuyas reales cuando las tengas.
    perfil: "/Foto-2026.jpeg",   // ← TU FOTO profesional real
    sobreMi: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1100&q=80",      // ← tu espacio de trabajo (ahora: código en pantalla)
  },

  indicadores: [
    { valor: "9+", etiqueta: "proyectos construidos" },
    { valor: "12+", etiqueta: "tecnologías en uso activo" },
    { valor: "100%", etiqueta: "proyectos nacidos de necesidades reales" },
  ],

  // Experiencia destacada — da credibilidad inmediata en el hero
  experiencia: ["Indra", "Minsait", "Conecta Systems", "Academia Barnard", "Rafo Calderón"],

  sobreMi: {
    intro:
      "Me especializo en desarrollo web frontend: construyo sitios y aplicaciones con React, rápidas, responsive y cuidadas en el detalle visual. Junto a un compañero impulso Conecta Systems, una marca propia bajo la que entregamos webs a medida y automatizamos procesos para clientes y negocios locales, trabajando por temporadas según los proyectos. Me importa tanto que el producto funcione como que se vea y se sienta bien para quien lo usa.",
    // Lado humano: por qué la carrera y qué me mueve
    motivacion:
      "Elegí Ingeniería de Sistemas porque me fascina convertir problemas reales en soluciones que funcionan. No me apasiona el código por el código: me apasiona ver cómo una idea bien construida le ahorra horas a un negocio, ordena el caos de alguien o acerca la tecnología a quien creía que no era para él.",
    // Frase/mentalidad personal
    lema: "Planifica como Monje, ejecuta como Ninja",
    lemaTexto:
      "Primero pienso con calma y estrategia; después ejecuto con foco y precisión. Claridad antes de actuar, decisión al hacerlo.",
    puntos: [
      {
        titulo: "Desarrollo web frontend",
        texto: "Interfaces modernas con React, Vite y Tailwind: rápidas, responsive y con foco en la experiencia de usuario. Es donde más disfruto y donde mejor trabajo.",
      },
      {
        titulo: "Diseño y experiencia de usuario",
        texto: "Cuido la estética, la jerarquía visual y los detalles. Una web no solo debe funcionar: debe verse profesional y sentirse fácil de usar.",
      },
      {
        titulo: "Automatización con IA",
        texto: "Integro Claude, GPT y Gemini en flujos reales: generación de contenido, tareas programadas y asistentes que ahorran horas de trabajo manual. Mi valor agregado.",
      },
      {
        titulo: "Del problema a la solución",
        texto: "Cada proyecto parte de una necesidad concreta. Primero entiendo qué se necesita; después diseño y construyo la web que lo resuelve, lista para producción.",
      },
    ],
  },

  tecnologias: [
    {
      categoria: "Frontend",
      icono: "monitor",
      descripcion: "Interfaces rápidas, responsive y cuidadas al detalle.",
      items: [
        { nombre: "React", slug: "react", color: "61DAFB", detalle: "Mi herramienta principal: componentes y SPAs reales en producción." },
        { nombre: "JavaScript (ES6+)", slug: "javascript", color: "F7DF1E", detalle: "La base de todo: lógica, interactividad y manejo del DOM." },
        { nombre: "TypeScript", slug: "typescript", color: "3178C6", detalle: "Tipado para detectar errores antes de llegar al usuario." },
        { nombre: "HTML5", slug: "html5", color: "E34F26", detalle: "Estructura semántica y accesible en cada proyecto." },
        { nombre: "CSS3", slug: "css", color: "663399", detalle: "Flexbox, grid y diseño responsive desde cero." },
        { nombre: "Tailwind CSS", slug: "tailwindcss", color: "38BDF8", detalle: "Diseño consistente y rápido sin CSS muerto." },
        { nombre: "Vite", slug: "vite", color: "9499FF", detalle: "Builds instantáneos y experiencia de desarrollo moderna." },
      ],
    },
    {
      categoria: "Diseño y UI",
      icono: "monitor",
      descripcion: "Que la web no solo funcione: que se vea y se sienta bien.",
      items: [
        { nombre: "Figma", slug: "figma", color: "F24E1E", detalle: "Diseño y maquetación de interfaces antes de construir." },
        { nombre: "Diseño Responsive", slug: "", color: "", detalle: "Experiencia impecable en móvil, tablet y escritorio." },
        { nombre: "UI / UX", slug: "", color: "", detalle: "Jerarquía visual, usabilidad y atención al detalle." },
      ],
    },
    {
      categoria: "Backend (de apoyo)",
      icono: "layers",
      descripcion: "Lo suficiente para conectar mis webs de punta a punta.",
      items: [
        { nombre: "Node.js", slug: "nodedotjs", color: "5FA04E", detalle: "Funciones serverless y automatizaciones programadas." },
        { nombre: "APIs REST", slug: "", color: "", detalle: "Consumo e integración de APIs en mis aplicaciones web." },
        { nombre: "Java · Spring Boot", slug: "spring", color: "6DB33F", detalle: "Bases del backend empresarial vistas en la universidad." },
      ],
    },
    {
      categoria: "Base de datos",
      icono: "database",
      descripcion: "Modelado y consultas pensadas para crecer.",
      items: [
        { nombre: "SQL Server", slug: "microsoftsqlserver", color: "CC2927", detalle: "Procedimientos almacenados y trazabilidad en sistemas empresariales." },
        { nombre: "PostgreSQL · Supabase", slug: "postgresql", color: "4169E1", detalle: "Backend-as-a-service con auth y realtime para productos ágiles." },
        { nombre: "MySQL", slug: "mysql", color: "4479A1", detalle: "Diseño relacional y normalización desde cero." },
      ],
    },
    {
      categoria: "Herramientas",
      icono: "wrench",
      descripcion: "Flujo de trabajo profesional de punta a punta.",
      items: [
        { nombre: "Git · GitHub", slug: "github", color: "E9EDF2", detalle: "Control de versiones y trabajo colaborativo." },
        { nombre: "Netlify", slug: "netlify", color: "00C7B7", detalle: "CI/CD, funciones serverless y Blobs en producción." },
        { nombre: "Docker", slug: "docker", color: "2496ED", detalle: "Entornos reproducibles para desarrollo y despliegue." },
        { nombre: "Power BI", lucide: "powerbi", detalle: "Dashboards y modelado para inteligencia de negocio." },
      ],
    },
    {
      categoria: "IA y Automatización",
      icono: "sparkles",
      descripcion: "La IA como multiplicador, no como adorno.",
      items: [
        { nombre: "Claude", slug: "claude", color: "D97757", detalle: "Par de programación y motor de generación de documentos y código." },
        { nombre: "GPT", lucide: "gpt", detalle: "Generación de contenido y razonamiento vía API." },
        { nombre: "Gemini", slug: "googlegemini", color: "8E75FF", detalle: "Pipelines de contenido automatizado y multimodal de Google." },
        { nombre: "Perplexity", lucide: "perplexity", detalle: "Investigación con fuentes citadas y búsqueda aumentada." },
        { nombre: "NotebookLM", lucide: "notebooklm", detalle: "Investigación y síntesis de documentación técnica." },
        { nombre: "n8n", slug: "n8n", color: "EA4B71", detalle: "Orquestación de flujos sin reinventar integraciones." },
      ],
    },
  ],

  /* CERTIFICADOS — contenido de ejemplo. Reemplaza cada campo con tus datos reales.
     enlace = link de Google Drive del certificado (de ejemplo por ahora). */
  certificados: [
    {
      codigo: "CERT-01",
      imagen: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=800&q=80", // ← reemplazar con imagen real del certificado
      nombre: "Desarrollo Web Full Stack",
      institucion: "Institución de ejemplo",
      fecha: "2025",
      descripcion: "Construcción de aplicaciones web modernas de extremo a extremo con React, Node.js y bases de datos. (Ejemplo)",
      temas: "React, Node.js, APIs REST, despliegue",
      porque: "Para consolidar una base sólida full stack y poder entregar productos completos, no solo interfaces.",
      sector: "Desarrollo web · Producto digital",
      enlace: "https://drive.google.com/file/d/EJEMPLO-01/view",
    },
    {
      codigo: "CERT-02",
      imagen: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80", // ← reemplazar con imagen real del certificado
      nombre: "Bases de Datos con SQL Server",
      institucion: "Institución de ejemplo",
      fecha: "2025",
      descripcion: "Diseño relacional, consultas avanzadas y procedimientos almacenados sobre SQL Server. (Ejemplo)",
      temas: "Modelado relacional, T-SQL, stored procedures",
      porque: "Porque casi todo sistema empresarial real vive sobre una base de datos bien diseñada.",
      sector: "Datos · Sistemas empresariales",
      enlace: "https://drive.google.com/file/d/EJEMPLO-02/view",
    },
    {
      codigo: "CERT-03",
      imagen: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", // ← reemplazar con imagen real del certificado
      nombre: "Inteligencia Artificial Aplicada",
      institucion: "Institución de ejemplo",
      fecha: "2024",
      descripcion: "Integración de modelos de lenguaje (LLMs) en productos reales y automatización de flujos. (Ejemplo)",
      temas: "LLMs, prompt engineering, automatización",
      porque: "Para usar la IA como multiplicador real en mis proyectos, no como adorno.",
      sector: "IA · Automatización",
      enlace: "https://drive.google.com/file/d/EJEMPLO-03/view",
    },
    {
      codigo: "CERT-04",
      imagen: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80", // ← reemplazar con imagen real del certificado
      nombre: "Scrum Foundation",
      institucion: "Institución de ejemplo",
      fecha: "2024",
      descripcion: "Fundamentos de gestión ágil de proyectos de software con marco Scrum. (Ejemplo)",
      temas: "Scrum, roles, sprints, gestión ágil",
      porque: "Para trabajar de forma ordenada en equipo y entregar valor por iteraciones, no de golpe.",
      sector: "Gestión de proyectos · Metodologías ágiles",
      enlace: "https://drive.google.com/file/d/EJEMPLO-04/view",
    },
  ],

  /* GALERÍA — collage de momentos y recuerdos.
     Coloca tus fotos en public/galeria/ y cambia la ruta `src`.
     `alto` controla el tamaño en el mosaico: "alto" | "medio" | "bajo".
     Mientras no tengas las fotos, se usan imágenes de ejemplo. */
  galeria: [
    { src: "/galeria/kidsapiens-1.jpg", respaldo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80", titulo: "Kidsapiens · IA para niños", lugar: "Colegio J. C. Mariátegui · 2023", alto: "alto", gradiente: ["#155E75", "#0E7490"] },
    { src: "/galeria/antonia-moreno-1.jpg", respaldo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80", titulo: "Charla de IA", lugar: "Antonia Moreno de Cáceres", alto: "medio", gradiente: ["#7C2D12", "#A16207"] },
    { src: "/galeria/san-francisco-1.jpg", respaldo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80", titulo: "IA y robótica básica", lugar: "San Francisco College", alto: "medio", gradiente: ["#312E81", "#6D28D9"] },
    { src: "/galeria/kidsapiens-2.jpg", respaldo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80", titulo: "Sesión sabatina", lugar: "Kidsapiens · 2023", alto: "bajo", gradiente: ["#155E75", "#0E7490"] },
    { src: "/galeria/indra-1.jpg", respaldo: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80", titulo: "Transformación digital", lugar: "Indra · Minsait · 2025", alto: "medio", gradiente: ["#0C4A6E", "#0E7490"] },
    { src: "/galeria/conecta-1.jpg", respaldo: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", titulo: "Conecta Systems", lugar: "Trabajo con clientes", alto: "alto", gradiente: ["#1E3A8A", "#3730A3"] },
  ],

  /* PROYECTOS
     categoria: "implementado" | "negocio" | "personal"
     orden: (opcional) controla el orden de aparición dentro de su categoría
     Los enlaces demo/repo son placeholders. */
  proyectos: [
    {
      id: "memorias-de-noel",
      codigo: "PRJ-01",
      categoria: "negocio",
      nombre: "Memorias de Noel",
      corto: "Plataforma web para una campaña benéfica navideña con muro interactivo de notas y gestión de voluntarios.",
      problema: "La campaña coordinaba donaciones y voluntarios por WhatsApp, sin orden ni visibilidad.",
      resultado: "Usada en una campaña real: centralizó inscripciones y dio identidad pública al proyecto.",
      stack: ["React", "Supabase", "Netlify", "Tailwind"],
      gradiente: ["#7F1D1D", "#B45309"],
      imagen: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80", // plataforma web / equipo (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación web para una campaña navideña de caridad: un muro estilo corcho donde los participantes dejan notas, más un flujo de registro de voluntarios. Diseñada, construida y desplegada en producción para una campaña real.",
        problemaLargo:
          "La organización gestionaba todo por mensajes sueltos: no había un lugar único para inscribirse como voluntario, registrar aportes ni mostrar el avance de la campaña al público.",
        solucion:
          "Una SPA con un muro interactivo de notas adhesivas (cada nota es un mensaje o compromiso), formulario de voluntarios con validación y panel de datos respaldado por Supabase. Despliegue automatizado en Netlify.",
        arquitectura:
          "Frontend React + Vite consumiendo Supabase como backend (PostgreSQL + API autogenerada). Sin servidor propio: la infraestructura serverless mantiene el costo en cero para la ONG.",
        stackDetalle: {
          frontend: ["React + Vite — SPA ligera de carga rápida", "Tailwind CSS — estética de corcho y notas con utilidades"],
          backend: ["Supabase — auth, API REST y realtime sin backend propio"],
          baseDatos: ["PostgreSQL (Supabase) — notas, voluntarios y aportes"],
          herramientas: ["Netlify — despliegue continuo desde Git", "GitHub — control de versiones"],
          ia: ["Claude — aceleración del desarrollo y revisión de código"],
        },
        decisiones: [
          {
            titulo: "Supabase en lugar de backend propio",
            texto: "Para una ONG sin presupuesto, un backend dedicado era inviable. Supabase dio base de datos, API y seguridad por fila con costo cero y tiempo de desarrollo mínimo.",
          },
          {
            titulo: "UI temática sin sacrificar usabilidad",
            texto: "El muro de corcho aporta identidad, pero los flujos críticos (inscribirse, donar) se mantienen como formularios simples y directos.",
          },
        ],
        impacto:
          "La campaña tuvo por primera vez un canal digital propio: inscripciones ordenadas, visibilidad pública y una base reutilizable para futuras ediciones.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "vistony-ruta-nazca",
      codigo: "PRJ-02",
      categoria: "negocio",
      nombre: "Vistony · Ruta Nazca",
      corto: "App móvil de ventas en campo con 286 clientes geocodificados, ruta optimizada por GPS y registro diario de avance.",
      problema: "Un vendedor de lubricantes recorría su ruta sin mapa, sin orden de visitas y llevando las ventas en papel.",
      resultado: "Usada a diario en campo: ruta ordenada por cercanía, catálogo digital y carga de ventas desde Excel.",
      stack: ["JavaScript", "Leaflet", "Geolocalización", "Excel"],
      gradiente: ["#0C4A6E", "#0E7490"],
      imagen: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80", // mapa / ruta GPS (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación móvil (archivo único HTML, sin instalación) para un vendedor de lubricantes que cubre la ruta de Nazca: mapa con 286 clientes geocodificados, orden de visitas por GPS, catálogo de productos y seguimiento de avance diario.",
        problemaLargo:
          "El vendedor manejaba su cartera en cuadernos: direcciones imprecisas, visitas desordenadas que alargaban la jornada y cero trazabilidad de qué cliente compró qué.",
        solucion:
          "Una app que funciona offline-first en el celular: geocodifiqué los 286 clientes, ordené la ruta por proximidad GPS en tiempo real y agregué catálogo, marcado de visitas y carga de ventas históricas desde Excel.",
        arquitectura:
          "Un único archivo HTML con JavaScript vanilla: cero dependencias de servidor, funciona desde el sistema de archivos del teléfono. Leaflet para el mapa y la API de geolocalización del navegador para la posición en vivo.",
        stackDetalle: {
          frontend: ["HTML + JavaScript vanilla — máxima compatibilidad en gama media", "Leaflet — mapas interactivos open source"],
          backend: ["Sin servidor — decisión deliberada por el contexto de uso"],
          baseDatos: ["Datos embebidos + importación de Excel (SheetJS)"],
          herramientas: ["Geocodificación de 286 direcciones reales", "API de Geolocalización del navegador"],
          ia: ["Claude — limpieza y geocodificación masiva de la cartera de clientes"],
        },
        decisiones: [
          {
            titulo: "Archivo único en lugar de app instalable",
            texto: "El usuario final no es técnico y la zona tiene conectividad irregular. Un HTML autocontenido elimina instalación, actualizaciones y dependencia de internet.",
          },
          {
            titulo: "Orden de ruta por proximidad real",
            texto: "En vez de una lista fija, la app reordena los clientes según la posición GPS actual: la jornada se adapta a dónde está el vendedor en cada momento.",
          },
        ],
        impacto:
          "Jornadas de venta más cortas y ordenadas, cartera de clientes digitalizada por primera vez y datos de venta listos para análisis.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "academia-barnard",
      codigo: "PRJ-03",
      categoria: "implementado",
      nombre: "Academia Barnard",
      corto: "Sitio web institucional para una academia, desarrollado como proyecto cliente de Conecta Systems.",
      problema: "La academia no tenía presencia digital: captaba alumnos solo por recomendación y volantes.",
      resultado: "Proyecto entregado y facturado a cliente real; primer canal digital de captación de la academia.",
      stack: ["React", "Tailwind", "Netlify"],
      gradiente: ["#1E3A8A", "#3730A3"],
      imagen: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80", // diseño web / interfaz (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Sitio institucional para una academia: oferta académica, horarios, docentes y canal de contacto directo. Uno de los primeros proyectos comerciales de Conecta Systems, entregado a un cliente real.",
        problemaLargo:
          "La academia dependía del boca a boca. Los padres no tenían dónde verificar horarios, precios ni metodología, y la competencia con presencia web captaba a los alumnos que buscaban en Google.",
        solucion:
          "Un sitio rápido y claro, pensado para el padre de familia que decide en minutos: propuesta de valor visible de inmediato, información académica organizada y botón de contacto por WhatsApp en todo momento.",
        arquitectura:
          "SPA en React con contenido estructurado en datos (fácil de actualizar sin tocar componentes), desplegada en Netlify con dominio propio.",
        stackDetalle: {
          frontend: ["React + Vite — base mantenible para futuras secciones", "Tailwind CSS — sistema visual consistente"],
          backend: ["Estático — sin necesidades dinámicas en esta fase"],
          baseDatos: ["No aplica — contenido gestionado como datos del proyecto"],
          herramientas: ["Netlify — hosting y despliegue continuo", "Git — versionado del proyecto"],
          ia: ["Claude — prototipado rápido de secciones y copywriting"],
        },
        decisiones: [
          {
            titulo: "Contenido como datos, no hardcodeado",
            texto: "Horarios y cursos viven en objetos de datos separados de la UI: el mantenimiento posterior no requiere entender React a fondo.",
          },
          {
            titulo: "WhatsApp como conversión principal",
            texto: "En el mercado local, los padres no llenan formularios: escriben. El CTA principal abre una conversación directa, no un formulario que nadie responde.",
          },
        ],
        impacto:
          "Primer proyecto facturado de Conecta Systems y primera presencia digital de la academia, con un canal de captación medible.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "academia-lubricantes",
      codigo: "PRJ-04",
      categoria: "negocio",
      nombre: "Mini-academia de Lubricantes",
      corto: "Plataforma educativa para capacitar vendedores de lubricantes: lecciones, progreso y evaluaciones.",
      problema: "Capacitar vendedores nuevos dependía de que alguien con experiencia tuviera tiempo de enseñarles.",
      resultado: "Plataforma desplegada en Netlify con contenido estructurado por niveles y seguimiento de progreso.",
      stack: ["React", "Vite", "Tailwind"],
      gradiente: ["#14532D", "#15803D"],
      imagen: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80", // plataforma e-learning / app (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Plataforma de microaprendizaje para el área comercial de lubricantes: lecciones cortas sobre productos y técnicas de venta, con progreso persistente y evaluaciones por módulo.",
        problemaLargo:
          "El conocimiento del producto vivía en la cabeza de los vendedores antiguos. Cada incorporación nueva implicaba semanas de acompañamiento informal y errores frente al cliente.",
        solucion:
          "Convertí el conocimiento del negocio en módulos estructurados: qué producto recomendar según el vehículo, objeciones frecuentes y práctica con evaluaciones. El vendedor avanza a su ritmo desde el celular.",
        arquitectura:
          "SPA React + Vite con persistencia local del progreso (sin necesidad de cuentas en la fase inicial), desplegada en Netlify para acceso inmediato desde cualquier dispositivo.",
        stackDetalle: {
          frontend: ["React + Vite — navegación instantánea entre lecciones", "Tailwind CSS — UI clara optimizada para móvil"],
          backend: ["Sin backend en fase 1 — reduce fricción y costo"],
          baseDatos: ["Persistencia local del progreso del alumno"],
          herramientas: ["Netlify — despliegue y acceso por URL simple"],
          ia: ["Claude — estructuración pedagógica del contenido técnico"],
        },
        decisiones: [
          {
            titulo: "Sin login en la primera fase",
            texto: "Pedir cuentas a vendedores de campo mata la adopción. El progreso se guarda en el dispositivo; la autenticación queda para cuando el volumen lo justifique.",
          },
          {
            titulo: "Lecciones de 3 minutos",
            texto: "El contenido está fragmentado para consumirse entre visitas a clientes, no en sesiones largas que nadie completa.",
          },
        ],
        impacto:
          "El conocimiento comercial dejó de depender de personas específicas: ahora es un activo digital del negocio, reutilizable con cada incorporación.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "aiverse-os",
      codigo: "PRJ-05",
      categoria: "personal",
      orden: 2,
      nombre: "AIVERSE OS · Mi sistema con IA",
      corto: "Espacio donde comparto mi forma de trabajar con la IA: mi flujo, mis herramientas y cómo las combino en el día a día.",
      problema: "Mucha gente usa IA suelta; pocos tienen un flujo de trabajo real y ordenado para sacarle provecho de verdad.",
      resultado: "Una web personal que muestra mi metodología con IA + un pipeline que me envía noticias a Telegram, filtradas a mi criterio.",
      stack: ["React", "APIs de IA", "Automatización", "Telegram"],
      gradiente: ["#312E81", "#6D28D9"],
      imagen: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=900&q=80", // IA / flujo de trabajo (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "AIVERSE OS es mi espacio personal para mostrar cómo trabajo con la Inteligencia Artificial: el flujo, las herramientas y la forma en que las combino. Es a la vez una vitrina de mi metodología y un sistema real de automatización que uso a diario. (En actualización constante.)",
        problemaLargo:
          "La IA está al alcance de todos, pero la mayoría la usa de forma desordenada. Yo quería documentar y compartir un flujo de trabajo propio y replicable: qué herramienta uso para qué, cómo las encadeno y cómo automatizo lo repetitivo, para que otros puedan aprender de mi método.",
        solucion:
          "Construí una web donde explico mi flujo de trabajo con IA paso a paso, y le sumé un sistema de automatización: en lugar de revisar noticias de tecnología a mano, conecté Gemini + búsqueda y otras APIs para que cada mañana y noche me lleguen a mi Telegram las noticias filtradas según mis intereses y mi propio algoritmo.",
        arquitectura:
          "Frontend en React para la parte de divulgación, y un flujo de automatización que orquesta APIs de IA (Gemini, búsqueda) con entrega programada vía bot de Telegram. La información llega a mí, ya no tengo que ir a buscarla.",
        stackDetalle: {
          frontend: ["React + Vite — la vitrina de mi flujo de trabajo", "Tailwind CSS — tema oscuro tipo sistema operativo"],
          backend: ["Automatización programada — ejecución en horarios definidos (mañana y noche)"],
          baseDatos: ["No requiere: la información se entrega y consume al instante"],
          herramientas: ["Bot de Telegram — recibo las noticias filtradas en mi celular", "APIs de búsqueda — alimentan el flujo de noticias"],
          ia: ["Gemini API — filtra y resume las noticias a mi criterio", "Claude — diseño del flujo de trabajo y la metodología"],
        },
        decisiones: [
          {
            titulo: "La info viene a mí, no yo a la info",
            texto: "En vez de abrir una web a revisar noticias, automaticé la entrega a Telegram en mis horarios. La tecnología se adapta a mi rutina, no al revés.",
          },
          {
            titulo: "Compartir el método, no solo el resultado",
            texto: "El valor no es 'uso IA', sino mostrar CÓMO la uso: un flujo ordenado que otros pueden entender y replicar.",
          },
        ],
        impacto:
          "Un espacio que combina divulgación (enseño mi forma de trabajar con IA) y automatización real (un asistente de noticias que trabaja para mí). Refleja cómo entiendo la IA: como una herramienta de trabajo con método, no como una moda.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "panel-hipico",
      codigo: "PRJ-06",
      categoria: "personal",
      orden: 5,
      nombre: "Panel de Análisis Hípico",
      corto: "Herramienta de análisis de carreras de caballos: estadísticas históricas y comparación de rendimiento.",
      problema: "Analizar carreras implicaba cruzar datos dispersos a mano antes de cada jornada.",
      resultado: "Herramienta de uso real que ordena la información y reduce el análisis previo de horas a minutos.",
      stack: ["React", "Vite", "Visualización de datos"],
      gradiente: ["#7C2D12", "#A16207"],
      imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80", // datos / estadísticas (oscuro). ← reemplazar con captura real del proyecto
      detalle: {
        resumen:
          "Aplicación web construida para un usuario real (un familiar aficionado a la hípica) que centraliza estadísticas de caballos, jinetes y resultados históricos para analizar carreras con datos en lugar de intuición.",
        problemaLargo:
          "El análisis previo a cada jornada era artesanal: apuntes en papel, memoria y planillas sueltas. Información valiosa se perdía y comparar rendimiento entre jornadas era casi imposible.",
        solucion:
          "Un panel que estructura el historial por caballo y jinete, calcula métricas de rendimiento y permite comparar participantes de una carrera lado a lado antes de decidir.",
        arquitectura:
          "SPA React con capa de datos normalizada (caballos, jinetes, carreras, resultados) y componentes de visualización reutilizables para las comparativas.",
        stackDetalle: {
          frontend: ["React + Vite — interacción fluida con tablas y filtros", "Visualización de datos — comparativas gráficas de rendimiento"],
          backend: ["Sin backend — datos gestionados localmente en esta fase"],
          baseDatos: ["Modelo de datos normalizado en el cliente"],
          herramientas: ["Netlify — acceso desde cualquier dispositivo"],
          ia: ["Claude — diseño del modelo de datos del dominio hípico"],
        },
        decisiones: [
          {
            titulo: "Modelar el dominio antes que la UI",
            texto: "El valor está en las relaciones caballo-jinete-carrera. Definir bien ese modelo primero hizo que las vistas comparativas fueran triviales de construir.",
          },
          {
            titulo: "Construir para un usuario real",
            texto: "Cada iteración se validó con el usuario final. Funcionalidades que parecían obvias se descartaron porque no las usaba; otras nacieron de verlo trabajar.",
          },
        ],
        impacto:
          "Práctica real de levantamiento de requerimientos con un usuario no técnico y de modelado de un dominio de datos complejo desde cero.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "rafo-calderon",
      codigo: "PRJ-07",
      categoria: "implementado",
      nombre: "Rafo Calderón · Sitio del Actor",
      corto: "Website profesional para el actor Rafo Calderón: presencia digital con foco en posicionamiento SEO y branding.",
      problema: "El actor no tenía presencia digital propia que centralizara su trayectoria y lo posicionara en búsquedas.",
      resultado: "Sitio web profesional que estructura su historial artístico y mejora su visibilidad y branding en internet.",
      stack: ["React", "Tailwind", "SEO", "Netlify"],
      gradiente: ["#4C1D95", "#9333EA"],
      imagen: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80", // escenario / actor (oscuro). ← reemplazar con captura real
      detalle: {
        resumen:
          "Plataforma web y jerarquía de contenidos para la gestión del historial artístico y el branding digital del actor Rafo Calderón. Proyecto cliente de Conecta Systems. (Más información se añadirá próximamente.)",
        problemaLargo:
          "Sin un sitio propio, la trayectoria del actor estaba dispersa en redes de terceros. No había un espacio profesional que reuniera su historial, lo posicionara en búsquedas de Google y reforzara su identidad como marca.",
        solucion:
          "Un sitio web profesional con una jerarquía de contenidos clara (trayectoria, trabajos, contacto) y trabajo de SEO técnico para que aparezca en las búsquedas relevantes. El diseño refuerza su identidad y diferencia su presencia digital.",
        arquitectura:
          "SPA en React + Tailwind con contenido estructurado, optimización SEO (metadatos, semántica, rendimiento) y despliegue en Netlify con dominio propio.",
        stackDetalle: {
          frontend: ["React + Vite — base mantenible para crecer", "Tailwind CSS — sistema visual consistente"],
          backend: ["Estático — sin necesidades dinámicas en esta fase"],
          baseDatos: ["No aplica — contenido gestionado como datos del proyecto"],
          herramientas: ["SEO técnico — metadatos, semántica y rendimiento", "Netlify — hosting y despliegue continuo"],
          ia: ["Claude — apoyo en copywriting y estructura de contenidos"],
        },
        decisiones: [
          {
            titulo: "SEO desde el primer día",
            texto: "Para un artista, ser encontrado en Google es captación directa. El sitio se construyó con estructura semántica y metadatos pensados para posicionar, no como un añadido posterior.",
          },
          {
            titulo: "El branding manda sobre la plantilla",
            texto: "En lugar de un sitio genérico, el diseño se subordina a la identidad del actor: la presencia digital refuerza su marca, no la diluye.",
          },
        ],
        impacto:
          "Fortaleció la identidad profesional del artista, logrando un posicionamiento diferenciado y una experiencia de usuario optimizada.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "kit-herramientas",
      codigo: "PRJ-08",
      categoria: "personal",
      orden: 3,
      nombre: "Web de Enseñanza de Herramientas",
      corto: "Proyecto personal donde enseño mi kit de herramientas: cómo las uso y cuál elegir según el tipo de proyecto.",
      problema: "El conocimiento de qué herramienta usar para cada proyecto suele estar disperso y es difícil de transmitir.",
      resultado: "Un espacio propio que ordena mi stack y enseña, con criterio, cómo y cuándo usar cada herramienta.",
      stack: ["React", "Vite", "Tailwind"],
      gradiente: ["#0F766E", "#0D9488"],
      imagen: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80", // código / herramientas dev (oscuro). ← reemplazar con captura real
      detalle: {
        resumen:
          "Un lado más personal: una web donde comparto mi kit de herramientas de desarrollo, cómo las uso en el día a día y cómo elegir la adecuada según el proyecto que alguien quiere construir. (Más información se añadirá próximamente.)",
        problemaLargo:
          "Cuando alguien empieza, la pregunta no es solo 'cómo se usa X', sino 'qué debería usar para lo que quiero hacer'. Ese criterio de selección rara vez está explicado en un solo lugar, ordenado y con ejemplos reales de uso.",
        solucion:
          "Una web que organiza mi stack por propósito: para cada herramienta explico qué resuelve, cómo la uso y en qué tipo de proyecto encaja. Más que tutoriales sueltos, es una guía de criterio para decidir.",
        arquitectura:
          "SPA en React + Vite con contenido estructurado como datos (cada herramienta es un objeto con su descripción, uso y casos), fácil de ampliar sin tocar componentes.",
        stackDetalle: {
          frontend: ["React + Vite — navegación instantánea entre secciones", "Tailwind CSS — UI clara y enfocada en lectura"],
          backend: ["Sin backend — contenido estático en esta fase"],
          baseDatos: ["Contenido gestionado como datos del proyecto"],
          herramientas: ["Netlify — acceso por URL simple", "Git — versionado del contenido"],
          ia: ["Claude — apoyo en estructura pedagógica del contenido"],
        },
        decisiones: [
          {
            titulo: "Enseñar criterio, no solo pasos",
            texto: "Hay miles de tutoriales de 'cómo usar X'. El valor aquí es el 'cuándo y por qué': qué herramienta elegir según el problema, que es lo que de verdad cuesta aprender solo.",
          },
          {
            titulo: "Contenido como datos",
            texto: "Cada herramienta vive en un objeto de datos. Añadir o actualizar una no requiere tocar la interfaz: el proyecto crece sin fricción.",
          },
        ],
        impacto:
          "Un espacio propio para ordenar y compartir mi forma de trabajar, que además me obliga a articular el porqué de cada decisión técnica.",
        demo: "#",
        repo: "#",
      },
    },
    {
      id: "kidsapiens",
      codigo: "PRJ-09",
      categoria: "personal",
      orden: 1,
      nombre: "Kidsapiens · IA para niños",
      corto: "Taller propio de Inteligencia Artificial para niños de primaria (2023), más charlas y exposiciones de IA en colegios de Ica.",
      problema: "En 2023, con la IA recién explotando, casi nadie la acercaba a los niños ni la explicaba de forma sencilla en Ica.",
      resultado: "Taller dictado durante 2 meses + charlas en 3 colegios: divulgación temprana de IA a estudiantes y comunidad escolar.",
      stack: ["Educación", "IA", "GPT", "Robótica básica"],
      gradiente: ["#155E75", "#0E7490"],
      imagen: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80", // educación / niños aprendiendo (oscuro). ← reemplazar con foto real de Kidsapiens
      // tipo "historia": la página de detalle usa un layout distinto (no técnico)
      tipo: "historia",
      detalle: {
        resumen:
          "En mayo de 2023, con la IA generativa recién naciendo, propuse y dicté Kidsapiens: un taller de Inteligencia Artificial para niños de 4to, 5to y 6to de primaria. Una iniciativa propia que nació de una convicción simple: la IA no debía ser un privilegio de unos pocos.",
        historia:
          "Mientras me desempeñaba como Auxiliar de primaria en el colegio José Carlos Mariátegui, vi una oportunidad que casi nadie estaba tomando: acercar la IA a los más jóvenes en el momento exacto en que el mundo apenas la descubría. Propuse el taller, lo diseñé y lo dicté los sábados durante dos meses. Más que enseñar a usar una herramienta, quería que los niños perdieran el miedo y entendieran que la tecnología también es para ellos.",
        // Las distintas sedes / experiencias de divulgación
        experiencias: [
          { lugar: "Colegio J. C. Mariátegui", rol: "Taller Kidsapiens · 2 meses", detalle: "Taller sabatino de IA para niños de primaria. Iniciativa propia como Auxiliar." },
          { lugar: "Antonia Moreno de Cáceres", rol: "Charlas de IA", detalle: "Charlas de divulgación sobre Inteligencia Artificial a la comunidad escolar." },
          { lugar: "San Francisco College", rol: "Exposición de IA y robótica", detalle: "Exposición de IA y robótica básica en uno de los colegios privados referentes de Ica." },
        ],
        // Qué me dejó (no decisiones técnicas)
        aprendizajes: [
          { titulo: "Visión temprana", texto: "Apostar por divulgar IA en 2023, antes de que fuera tendencia, fue una decisión de criterio, no de moda." },
          { titulo: "Explicar simple lo complejo", texto: "Enseñar IA a un niño de 9 años te obliga a entenderla de verdad. Hoy aplico esa claridad al hablar con clientes no técnicos." },
          { titulo: "Iniciativa y liderazgo", texto: "Nadie me pidió montar el taller: lo propuse, lo diseñé y lo ejecuté. Crear algo de cero y sostenerlo es una habilidad en sí misma." },
        ],
        impacto:
          "Kidsapiens funcionó durante dos meses con buena acogida y se convirtió en el inicio de un pequeño recorrido de divulgación de IA en Ica. Una experiencia temprana de liderazgo, comunicación y de creer que la tecnología tiene más sentido cuando se comparte.",
      },
    },
    {
      id: "bot-telegram-noticias",
      codigo: "PRJ-10",
      categoria: "personal",
      orden: 4,
      nombre: "Bot de Noticias en Telegram",
      corto: "Un bot que cada mañana y noche me envía a Telegram las noticias de tecnología filtradas según mis intereses.",
      problema: "Mantenerse al día en tecnología exige revisar muchas fuentes a mano; la información dispersa quita tiempo y enfoque.",
      resultado: "Un asistente automático que me entrega noticias relevantes a mi Telegram en mis horarios, sin que yo tenga que buscar nada.",
      stack: ["Automatización", "Gemini API", "Telegram Bot", "APIs de búsqueda"],
      gradiente: ["#0E7490", "#0891B2"],
      imagen: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=900&q=80", // mensajería / notificaciones (oscuro). ← reemplazar con captura real
      detalle: {
        resumen:
          "Un bot personal de Telegram que automatiza mi consumo de noticias tecnológicas: en lugar de ir yo a buscar la información, ella viene a mí, ya filtrada y resumida, dos veces al día. (Proyecto en desarrollo.)",
        problemaLargo:
          "Quería estar al día en tecnología sin perder tiempo abriendo decenas de fuentes ni ahogarme en información irrelevante. Necesitaba algo que filtrara por mí, según lo que de verdad me interesa, y que respetara mi rutina.",
        solucion:
          "Diseñé un flujo que conecta APIs de búsqueda con Gemini para encontrar, filtrar y resumir las noticias del día según mis criterios, y las entrega a mi Telegram en dos momentos: por la mañana y por la noche. Yo solo abro el chat y leo lo que importa.",
        arquitectura:
          "Flujo de automatización programado: APIs de búsqueda alimentan a Gemini (filtra y resume), y un bot de Telegram entrega el resultado en horarios definidos. Sin interfaz que mantener: el canal es el propio Telegram.",
        stackDetalle: {
          frontend: ["Sin frontend: la 'interfaz' es el chat de Telegram"],
          backend: ["Automatización programada — ejecución mañana y noche"],
          baseDatos: ["No requiere: la información se entrega y se consume al instante"],
          herramientas: ["Telegram Bot API — entrega de mensajes", "APIs de búsqueda — fuente de las noticias"],
          ia: ["Gemini API — filtra y resume según mis intereses"],
        },
        decisiones: [
          {
            titulo: "La información viene a mí",
            texto: "En vez de abrir webs a buscar, automaticé la entrega a Telegram en mis horarios. La tecnología se adapta a mi rutina, no al revés.",
          },
          {
            titulo: "Filtrar, no acumular",
            texto: "El bot no me manda todo: usa IA para quedarse solo con lo relevante para mí. Menos ruido, más señal.",
          },
        ],
        impacto:
          "Un asistente personal que me ahorra tiempo todos los días y me mantiene informado sin esfuerzo. Práctica real de automatización con IA y APIs, aplicable a cualquier flujo de información de un negocio.",
        demo: "#",
        repo: "#",
      },
    },
  ],
};

const CATEGORIAS = [
  { id: "implementado", titulo: "Clientes reales", nota: "Proyectos entregados y facturados a clientes reales." },
  { id: "negocio", titulo: "Proyectos aplicados", nota: "Trabajos profesionales para terceros: resuelven un problema real de alguien." },
  { id: "personal", titulo: "Proyectos personales", nota: "Iniciativas propias para explorar, divulgar y dominar nuevas tecnologías." },
];

/* ============================================================
   TEMA ÚNICO — paleta oscura del sitio
   ============================================================ */

const TEMA = {
  bg: "#07090D",
  surface: "#0D1117",
  surface2: "#121823",
  border: "#243042",
  borderSoft: "#1A2330",
  text: "#E9EDF2",
  muted: "#93A0B4",
  faint: "#5E6B7E",
  accent: "#E8983E",       // cobre — acento principal
  accentText: "#F3B566",
  accentSoft: "rgba(232,152,62,0.12)",
  accent2: "#22D3EE",      // cian — acento secundario (ahora activo en todo el sitio)
  accent2Text: "#67E8F9",
  accent2Soft: "rgba(34,211,238,0.10)",
  ok: "#4ADE80",
  // Capa de tarjeta translúcida reutilizable (profundidad consistente)
  card: "rgba(15,20,28,0.72)",
  cardHover: "rgba(20,27,37,0.85)",
  // Sombras por nivel — profundidad en capas
  shadowSoft: "0 4px 20px rgba(0,0,0,0.28)",
  shadowMd: "0 14px 38px rgba(0,0,0,0.40)",
  shadowLg: "0 28px 70px rgba(0,0,0,0.50)",
};

// DISPLAY = títulos (Space Grotesk) · SANS = cuerpo legible (Inter) · MONO = ficha técnica (JetBrains Mono)
const DISPLAY = '"Space Grotesk", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const SANS = '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, Consolas, monospace';

/* ============================================================
   HOOKS Y UTILIDADES
   ============================================================ */

const movReducido = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Revela elementos al entrar en viewport (respeta prefers-reduced-motion)
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (movReducido()) { setVisible(true); return; }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

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
   CERTIFICADOS — carrusel deslizable: agrega los que quieras
   al array DATOS.certificados y el diseño no cambia.
   ============================================================ */

// Fila de dato dentro del modal de certificado
function DatoCert({ t, etiqueta, color, children }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: color }} />
      <div>
        <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.14em", color: t.faint }}>{etiqueta}</span>
        <p className="text-sm leading-snug" style={{ color: t.muted }}>{children}</p>
      </div>
    </div>
  );
}

function Certificados({ t }) {
  const [activo, setActivo] = useState(null);
  const pista = useRef(null);
  const desplazar = (dir) => pista.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  const total = DATOS.certificados.length;

  // Cerrar modal con Escape y bloquear scroll del fondo mientras está abierto
  useEffect(() => {
    if (!activo) return;
    const onKey = (e) => { if (e.key === "Escape") setActivo(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [activo]);

  return (
    <section id="certificados" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="03"
          eyebrow="Certificados"
          titulo="Formación que respalda la práctica"
        >
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              type="button" aria-label="Anterior" onClick={() => desplazar(-1)}
              className="flecha-carrusel w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${t.border}`, color: t.text, background: "rgba(13,17,23,0.6)" }}
            >
              <ChevronLeft size={17} />
            </button>
            <button
              type="button" aria-label="Siguiente" onClick={() => desplazar(1)}
              className="flecha-carrusel w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: `1px solid ${t.border}`, color: t.text, background: "rgba(13,17,23,0.6)" }}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </CabeceraSeccion>
        <Reveal>
          <p className="mb-7 -mt-6" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: t.faint }}>
            {String(total).padStart(2, "0")} CERTIFICADOS · DESLIZA PARA VER MÁS →
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div
            ref={pista}
            className="sin-scroll flex gap-4 overflow-x-auto pb-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {DATOS.certificados.map((c) => (
              <button
                key={c.codigo}
                type="button"
                onClick={() => setActivo(c)}
                className="tarjeta-certificado group w-72 shrink-0 text-left rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{ background: t.card, border: `1px solid ${t.borderSoft}`, scrollSnapAlign: "start" }}
              >
                <Foto src={c.imagen} alt={c.nombre} gradiente={["#121823", "#2A1F10"]} className="h-36" style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%, rgba(7,9,13,0.7))" }} />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ background: "rgba(7,9,13,0.6)", backdropFilter: "blur(4px)" }}>
                    <Award size={13} style={{ color: t.accentText }} />
                    <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", color: "rgba(255,255,255,0.92)" }}>{c.codigo}</span>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md" style={{ fontFamily: MONO, fontSize: 10, color: t.accent2Text, background: "rgba(7,9,13,0.6)", backdropFilter: "blur(4px)" }}>{c.fecha}</span>
                </Foto>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm mb-1 leading-snug" style={{ color: t.text }}>{c.nombre}</h3>
                  <p style={{ fontFamily: MONO, fontSize: 10.5, color: t.faint }} className="mb-3">{c.institucion}</p>
                  {c.temas && (
                    <p className="text-xs leading-snug mb-3" style={{ color: t.muted }}>{c.temas}</p>
                  )}
                  {c.sector && (
                    <span className="inline-block self-start text-xs px-2 py-1 rounded-md mb-3" style={{ fontFamily: MONO, fontSize: 9.5, color: t.accentText, background: t.accentSoft }}>
                      {c.sector}
                    </span>
                  )}
                  <span className="mt-auto text-xs font-semibold inline-flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: t.accentText }}>
                    Ver detalle <ArrowUpRight size={12} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Modal de certificado */}
      {activo && (
        <div
          className="fixed inset-0 flex items-center justify-center p-5"
          style={{ zIndex: 90, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
          onClick={() => setActivo(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden modal-entrada sin-scroll"
            style={{ background: t.surface, border: `1px solid ${t.border}`, maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Foto src={activo.imagen} alt={activo.nombre} gradiente={["#121823", "#2A1F10"]} className="h-44" tinte={false}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 30%, rgba(7,9,13,0.85))" }} />
              <button
                type="button" aria-label="Cerrar" onClick={() => setActivo(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(7,9,13,0.6)", border: `1px solid ${t.border}`, color: "#fff" }}
              >
                <X size={15} />
              </button>
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <Award size={18} style={{ color: t.accentText }} />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "rgba(255,255,255,0.92)" }}>
                  {activo.codigo}
                </span>
              </div>
            </Foto>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-1" style={{ color: t.text }}>{activo.nombre}</h3>
              <p style={{ fontFamily: MONO, fontSize: 12, color: t.accentText }} className="mb-4">
                {activo.institucion} · {activo.fecha}
              </p>
              <p className="text-sm leading-relaxed mb-5" style={{ color: t.muted }}>{activo.descripcion}</p>

              <div className="space-y-3 mb-6">
                {activo.temas && (
                  <DatoCert t={t} etiqueta="QUÉ ABARCA" color={t.accent2Text}>{activo.temas}</DatoCert>
                )}
                {activo.porque && (
                  <DatoCert t={t} etiqueta="POR QUÉ LO ESTUDIÉ" color={t.accentText}>{activo.porque}</DatoCert>
                )}
                {activo.sector && (
                  <DatoCert t={t} etiqueta="SECTOR APLICADO" color={t.accent2Text}>{activo.sector}</DatoCert>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {activo.enlace && (
                  <Boton t={t} primario icono={ExternalLink} href={activo.enlace}>Ver certificado</Boton>
                )}
                <Boton t={t} onClick={() => setActivo(null)}>Cerrar</Boton>
              </div>
            </div>
          </div>
        </div>
      )}
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

function MiniaturaProyecto({ t, p, alta }) {
  return (
    <Foto
      src={p.imagen}
      alt={p.nombre}
      gradiente={p.gradiente}
      tinte={false}
      className={`${alta ? "h-52 md:h-72" : "h-48"}`}
    >
      {/* Velo de marca del proyecto */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(155deg, ${p.gradiente[0]}D9 0%, ${p.gradiente[1]}66 50%, rgba(7,9,13,0.35) 100%)` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(transparent 45%, rgba(7,9,13,0.85))" }}
      />
      {/* Rejilla técnica sutil */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(120% 100% at 0% 0%, #000, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 0% 0%, #000, transparent 70%)",
        }}
      />
      {/* Código del proyecto, arriba a la derecha */}
      <span
        className="absolute top-3 right-3"
        style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)" }}
      >
        {p.codigo}
      </span>
      {/* Etiqueta de categoría, abajo a la izquierda */}
      <div className="absolute bottom-3 left-3">
        <EtiquetaCategoria t={t} categoria={p.categoria} codigo={p.codigo} />
      </div>
    </Foto>
  );
}

function FilaDato({ t, etiqueta, icono: Icono, color, children }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span
        className="shrink-0 mt-0.5 w-6 h-6 rounded-md flex items-center justify-center"
        style={{ background: `${color}1A`, color }}
      >
        <Icono size={12} />
      </span>
      <div className="min-w-0">
        <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", color: t.faint }}>{etiqueta}</span>
        <p className="text-sm leading-snug" style={{ color: t.muted }}>{children}</p>
      </div>
    </div>
  );
}

function TarjetaProyecto({ t, p, abrir, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <TiltCard>
        <button
          type="button"
          onClick={() => abrir(p.id)}
          className="tarjeta-proyecto group relative w-full h-full text-left rounded-2xl overflow-hidden transition-all duration-300"
          style={{ background: t.card, border: `1px solid ${t.borderSoft}` }}
        >
          <div className="foco absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ zIndex: 2 }} />
          <MiniaturaProyecto t={t} p={p} />
          <div className="p-5 md:p-6">
            <h3 className="font-bold mb-2" style={{ color: t.text, fontFamily: DISPLAY, fontSize: "1.15rem", letterSpacing: "-0.01em" }}>{p.nombre}</h3>
            <p className="text-sm leading-relaxed mb-5" style={{ color: t.muted }}>{p.corto}</p>
            <div className="space-y-3 mb-5 pb-5" style={{ borderBottom: `1px solid ${t.borderSoft}` }}>
              <FilaDato t={t} etiqueta="PROBLEMA" icono={Wrench} color={t.accentText}>{p.problema}</FilaDato>
              <FilaDato t={t} etiqueta="RESULTADO" icono={CircleCheck} color={t.accent2Text}>{p.resultado}</FilaDato>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.stack.map((s) => <Chip key={s} t={t}>{s}</Chip>)}
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-transform duration-200 group-hover:translate-x-1" style={{ color: t.accentText }}>
              Ver caso completo <ArrowRight size={15} />
            </span>
          </div>
        </button>
      </TiltCard>
    </Reveal>
  );
}

function Proyectos({ t, abrir }) {
  const [filtro, setFiltro] = useState("todos");
  const pista = useRef(null);
  const desplazar = (dir) => pista.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
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
          <div className="flex items-center justify-between gap-4 mb-7">
            <p className="text-sm" style={{ color: t.faint, minHeight: 20 }}>
              {nota || "Todo mi trabajo: clientes reales, proyectos aplicados y personales."}
            </p>
            {/* Flechas del carrusel (solo si hay para deslizar) */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button" aria-label="Anterior" onClick={() => desplazar(-1)}
                className="flecha-carrusel w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: `1px solid ${t.border}`, color: t.text, background: "rgba(13,17,23,0.6)" }}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                type="button" aria-label="Siguiente" onClick={() => desplazar(1)}
                className="flecha-carrusel w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: `1px solid ${t.border}`, color: t.text, background: "rgba(13,17,23,0.6)" }}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carrusel horizontal con filtros: escala sin alargar la página */}
        <Reveal>
          <div className="relative">
            <div
              key={filtro}
              ref={pista}
              className="sin-scroll flex gap-5 overflow-x-auto pb-3 -mx-1 px-1"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {lista.map((p, i) => (
                <div
                  key={p.id}
                  className="shrink-0 w-[78vw] xs:w-[300px] sm:w-[340px]"
                  style={{ scrollSnapAlign: "start", maxWidth: 340 }}
                >
                  <TarjetaProyecto t={t} p={p} abrir={abrir} delay={Math.min(i, 4) * 70} />
                </div>
              ))}
            </div>
            {/* Desvanecido derecho: insinúa que hay más (solo si hay más de 1) */}
            {lista.length > 1 && (
              <div
                aria-hidden
                className="absolute top-0 right-0 bottom-3 w-16 pointer-events-none hidden sm:block"
                style={{ background: `linear-gradient(90deg, transparent, ${t.bg})` }}
              />
            )}
          </div>
        </Reveal>

        {/* Indicador claro de "desliza" — visible y con conteo */}
        {lista.length > 1 && (
          <div className="flex items-center gap-2.5 mt-4">
            <span className="flex-1 h-px" style={{ background: t.borderSoft }} />
            <span className="inline-flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.12em", color: t.accent2Text }}>
              <ChevronLeft size={13} /> DESLIZA · {lista.length} PROYECTOS <ChevronRight size={13} />
            </span>
            <span className="flex-1 h-px" style={{ background: t.borderSoft }} />
          </div>
        )}
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

// Una foto "clavada" en el panel de recuerdos. Estética de pared/corcho:
// marco claro, pin arriba, leve rotación, etiqueta tipo nota.
function FotoGaleria({ t, item, onAbrir, idx }) {
  const usarRespaldo = item.src?.startsWith("/galeria/");
  const src = usarRespaldo ? item.respaldo : item.src;
  const alturas = { alto: "h-72 sm:h-80", medio: "h-56 sm:h-64", bajo: "h-44 sm:h-52" };
  // Rotación pseudo-aleatoria pero estable por índice (-2.5° a 2.5°)
  const rot = [(idx * 37) % 5 - 2.5];
  return (
    <div className="mb-5" style={{ breakInside: "avoid" }}>
      <button
        type="button"
        onClick={() => onAbrir({ ...item, src })}
        className="foto-galeria group relative w-full block text-left rounded-xl"
        style={{
          background: "#F4F1EA",                       // marco tipo polaroid
          padding: "10px 10px 14px",
          boxShadow: t.shadowMd,
          transform: `rotate(${rot}deg)`,
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Pin / chincheta */}
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 rounded-full z-10"
          style={{ background: idx % 2 ? t.accent2 : t.accent, boxShadow: "0 2px 5px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.3)" }}
        />
        <div className="relative rounded-md overflow-hidden">
          <Foto
            src={src}
            alt={item.titulo}
            gradiente={item.gradiente}
            tinte={false}
            className={`${alturas[item.alto] || alturas.medio} w-full`}
          >
            <span
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(7,9,13,0.55)", border: `1px solid rgba(255,255,255,0.3)`, color: "#fff", backdropFilter: "blur(4px)" }}
            >
              <ArrowUpRight size={15} />
            </span>
          </Foto>
        </div>
        {/* Leyenda tipo nota manuscrita */}
        <div className="px-1.5 pt-2.5">
          <h3 className="font-semibold text-sm leading-tight" style={{ color: "#1A1A1A" }}>{item.titulo}</h3>
          <p style={{ fontFamily: MONO, fontSize: 10.5, color: "#6B6B6B", marginTop: 2 }}>{item.lugar}</p>
        </div>
      </button>
    </div>
  );
}

function Galeria({ t }) {
  const [activa, setActiva] = useState(null);

  useEffect(() => {
    if (!activa) return;
    const onKey = (e) => { if (e.key === "Escape") setActiva(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [activa]);

  if (!DATOS.galeria?.length) return null;

  return (
    <section id="galeria" className="relative py-20 md:py-28 px-5 md:px-8">
      <SepSeccion t={t} />
      <div className="max-w-5xl mx-auto">
        <CabeceraSeccion
          t={t}
          num="05"
          eyebrow="Mi panel"
          titulo="El muro de mis recuerdos"
          descripcion="Talleres, charlas y momentos detrás del código. Un panel vivo: aquí voy clavando lo que vivo y lo que construyo."
        />

        {/* Panel/pared de recuerdos: textura sutil + fotos clavadas */}
        <Reveal>
          <div
            className="relative rounded-3xl p-5 sm:p-8"
            style={{
              border: `1px solid ${t.borderSoft}`,
              background: `
                radial-gradient(circle at 20% 10%, rgba(232,152,62,0.05), transparent 40%),
                radial-gradient(circle at 85% 90%, rgba(34,211,238,0.05), transparent 40%),
                ${t.surface}`,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Textura de puntos del corcho/muro */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative" style={{ columnGap: "1.25rem", columnCount: "auto" }}>
              <div className="[column-count:1] sm:[column-count:2] lg:[column-count:3]" style={{ columnGap: "1.25rem" }}>
                {DATOS.galeria.map((item, i) => (
                  <FotoGaleria key={i} t={t} item={item} onAbrir={setActiva} idx={i} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <p className="text-center mt-5" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: t.faint }}>
          {String(DATOS.galeria.length).padStart(2, "0")} RECUERDOS · ESTE MURO SIGUE CRECIENDO
        </p>
      </div>

      {/* Lightbox */}
      {activa && (
        <div
          className="fixed inset-0 flex items-center justify-center p-5"
          style={{ zIndex: 90, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
          onClick={() => setActiva(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden modal-entrada"
            style={{ border: `1px solid ${t.border}`, boxShadow: t.shadowLg }}
            onClick={(e) => e.stopPropagation()}
          >
            <Foto src={activa.src} alt={activa.titulo} gradiente={activa.gradiente} tinte={false} className="max-h-[78vh] w-full" style={{ minHeight: 300 }}>
              <button
                type="button" aria-label="Cerrar" onClick={() => setActiva(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(7,9,13,0.65)", border: `1px solid ${t.border}`, color: "#fff" }}
              >
                <X size={16} />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: "linear-gradient(transparent, rgba(7,9,13,0.92))" }}>
                <h3 className="font-bold text-lg" style={{ color: "#fff" }}>{activa.titulo}</h3>
                <p style={{ fontFamily: MONO, fontSize: 12, color: t.accentText }}>{activa.lugar}</p>
              </div>
            </Foto>
          </div>
        </div>
      )}
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
            {/* Robot animado (Lottie) que "espera" — detalle con carácter */}
            <div className="relative inline-block mb-4">
              <div className="avatar-saluda mx-auto" style={{ width: 150, height: 150 }}>
                <DotLottieReact
                  src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              {/* punto "en línea" */}
              <span className="absolute" style={{ bottom: 14, right: 14 }}>
                <span className="relative flex w-3.5 h-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: t.ok }} />
                  <span className="relative inline-flex rounded-full w-3.5 h-3.5" style={{ background: t.ok, border: `2px solid ${t.surface}` }} />
                </span>
              </span>
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

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: SANS, minHeight: "100vh" }}>
      <style>{`
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
        .tarjeta-proyecto { will-change: transform; }
        .tarjeta-proyecto:hover { border-color: ${t.accent} !important; box-shadow: ${t.shadowMd}, 0 0 0 1px ${t.accent}22; }
        .tarjeta-proyecto:active { transform: scale(0.99); }
        .tarjeta-certificado:hover { border-color: ${t.accent2} !important; box-shadow: ${t.shadowMd}; }
        .tarjeta-certificado:active { transform: translateY(0) scale(0.98); }
        .foto-galeria { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; transform-origin: center center; }
        .foto-galeria:hover { transform: rotate(0deg) scale(1.04) !important; box-shadow: ${t.shadowLg}; z-index: 5; }
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
