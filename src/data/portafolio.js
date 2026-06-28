/* ============================================================
   DATOS DEL PORTAFOLIO
   ------------------------------------------------------------
   TODO el contenido del sitio vive aquí: tus datos, proyectos,
   certificados, tecnologías y galería. Para actualizar el
   portafolio normalmente solo se edita este archivo.
   ============================================================ */

export const DATOS = {
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
      id: "vistony-ruta-nazca",
      codigo: "PRJ-01",
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
      codigo: "PRJ-02",
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
      codigo: "PRJ-03",
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
      codigo: "PRJ-04",
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
      codigo: "PRJ-05",
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
      codigo: "PRJ-06",
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
      codigo: "PRJ-07",
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
      codigo: "PRJ-08",
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
      codigo: "PRJ-09",
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

// Categorías para agrupar y filtrar los proyectos
export const CATEGORIAS = [
  { id: "implementado", titulo: "Clientes reales", nota: "Proyectos entregados y facturados a clientes reales." },
  { id: "negocio", titulo: "Proyectos aplicados", nota: "Trabajos profesionales para terceros: resuelven un problema real de alguien." },
  { id: "personal", titulo: "Proyectos personales", nota: "Iniciativas propias para explorar, divulgar y dominar nuevas tecnologías." },
];
