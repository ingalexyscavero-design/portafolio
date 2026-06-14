# Portafolio · Alexys Cavero

Portafolio profesional de **Alexys Cavero** — Desarrollador Web Junior · Automatización e IA · Estudiante de Ingeniería de Sistemas (Ica, Perú).

Construido con **React + Vite + Tailwind CSS**. Tema oscuro, diseño propio, totalmente responsive.

## 🚀 Desarrollo local

```bash
npm install      # instala dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo en http://localhost:8080
npm run build    # build de producción (carpeta dist/)
npm run preview  # previsualiza el build de producción
```

## 📦 Despliegue

El sitio se despliega automáticamente en **Netlify** a partir de este repositorio.
Cada `git push` a la rama `main` genera un nuevo despliegue (configuración en `netlify.toml`).

## ✏️ Editar contenido

Casi todo el contenido vive en el objeto `DATOS` al inicio de [`src/App.jsx`](src/App.jsx):
proyectos, certificados, tecnologías, galería y datos de contacto.

- **Fotos / CV:** se colocan en la carpeta `public/` y se referencian con `/nombre-archivo`.
- **Galería de momentos:** las fotos van en `public/galeria/`.

---

Hecho con React y criterio.
