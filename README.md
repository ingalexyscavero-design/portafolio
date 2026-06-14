# 🧑‍💻 Portafolio · Alexys Cavero

Portafolio profesional de **Alexys Cavero** — Desarrollador Web Junior enfocado en **Frontend**, con automatización e IA como valor agregado. Estudiante de Ingeniería de Sistemas (Ica, Perú).

> 🎨 Tema oscuro, diseño propio, totalmente responsive y construido desde cero con React.

🔗 **Demo en vivo:** _(añade aquí tu URL de Netlify, ej. https://alexyscaverodev.netlify.app)_

---

## ✨ Características

- **Single Page App** con navegación por secciones (estilo aplicación, sin recargas).
- **Diseño 100% propio** — sin plantillas: paleta cobre + cian sobre tema oscuro.
- **Totalmente responsive** — pensado mobile-first.
- **Animaciones cuidadas** — reveal al hacer scroll, microinteracciones y un robot animado (Lottie), todo respetando `prefers-reduced-motion` (accesibilidad).
- **Contenido centralizado** — todo el texto y los proyectos viven en un solo archivo de datos, fácil de mantener.

---

## 🛠️ Stack tecnológico

| Área | Tecnologías |
|------|-------------|
| **Frontend** | React, JavaScript (ES6+), HTML5, CSS3 |
| **Estilos** | Tailwind CSS |
| **Build / Tooling** | Vite |
| **Animación** | Lottie (`@lottiefiles/dotlottie-react`) |
| **Iconos** | Lucide React + Simple Icons |
| **Despliegue** | Netlify (CI/CD desde GitHub) |

---

## 📁 Estructura del proyecto

El proyecto está organizado para que sea fácil de entender y mantener:

```
src/
├── data/
│   └── portafolio.js     → TODO el contenido del sitio (datos, proyectos, certificados…)
├── theme/
│   └── theme.js          → colores y tipografías en un solo lugar
├── hooks/
│   └── useReveal.js      → lógica reutilizable (animación al hacer scroll)
├── App.jsx               → componentes de la interfaz y ensamblaje del sitio
├── main.jsx              → punto de entrada de React
└── index.css             → estilos base
```

> 💡 Para actualizar el contenido del portafolio normalmente solo se edita **`src/data/portafolio.js`**.

---

## 🚀 Cómo ejecutarlo en local

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Levantar el servidor de desarrollo (http://localhost:8080)
npm run dev

# 3. Generar el build de producción (carpeta dist/)
npm run build

# 4. Previsualizar el build de producción
npm run preview
```

---

## 🧭 Decisiones de diseño

- **Tema oscuro con dos acentos (cobre + cian):** transmite un perfil técnico y moderno sin caer en lo genérico.
- **Navegación por secciones:** en vez de un scroll infinito largo, cada sección se muestra de forma enfocada, como una app.
- **Contenido como datos:** separar el contenido (`data/`) de la presentación permite actualizar el portafolio sin tocar la lógica.
- **Accesibilidad:** se respeta `prefers-reduced-motion` y se cuidan el contraste y los textos alternativos.

---

## 📬 Contacto

- **Email:** ing.alexyscavero@gmail.com
- **LinkedIn:** [linkedin.com/in/alexyscavero](https://www.linkedin.com/in/alexyscavero/)
- **GitHub:** [@ingalexyscavero-design](https://github.com/ingalexyscavero-design)

---

<sub>Hecho con React y criterio · Ica, Perú</sub>
