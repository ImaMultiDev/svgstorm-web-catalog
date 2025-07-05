# 🌩️ SVGStorm Web Catalog

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-Latest-FF0055?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion">
</div>

<br>

<div align="center">
  <h3>🎨 Catálogo Web Interactivo de Iconos SVG</h3>
  <p>Explora, busca y descarga iconos SVG profesionales con una interfaz moderna y elegante.</p>
</div>

---

## ✨ Características

### 🔍 **Búsqueda Inteligente**

- Búsqueda en tiempo real con debounce
- Filtrado por nombre, categoría y tags
- Resultados instantáneos y animados

### 🎯 **Interfaz Profesional**

- Diseño responsive y moderno
- Animaciones suaves con Framer Motion
- Modo oscuro/claro (próximamente)
- Experiencia de usuario optimizada

### 📱 **Totalmente Responsive**

- Optimizado para móviles, tablets y desktop
- Navegación intuitiva en todos los dispositivos
- Menú hamburguesa para pantallas pequeñas

### 🚀 **Funcionalidades Avanzadas**

- Modal interactivo con código React/SVG
- Copiado al portapapeles con un clic
- Previsualización de iconos con lazy loading
- Sistema de caché inteligente

### 📊 **Estadísticas en Tiempo Real**

- Contador de iconos totales
- Número de categorías disponibles
- Tags únicos en la biblioteca

---

## 🛠️ Instalación

### Prerequisitos

- Node.js 18+
- pnpm (recomendado) o npm
- Conexión a internet para la API

### Instalación Local

```bash
# Clonar el repositorio
git clone <repository-url>
cd svgstorm/apps/svgstorm-web-catalog

# Instalar dependencias
pnpm install
# o
npm install

# Ejecutar en desarrollo
pnpm dev
# o
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🎯 Uso

### Navegación Principal

- **🏠 Catálogo**: Explorar todos los iconos disponibles
- **📚 Documentación**: Guía completa de uso de la librería
- **🔗 API**: Enlace directo a la API REST

### Búsqueda y Filtrado

1. **Búsqueda Global**: Usa la barra de búsqueda principal
2. **Filtros**: Busca por nombre, categoría o tags
3. **Resultados**: Los iconos se filtran automáticamente

### Uso de Iconos

1. **Seleccionar**: Haz clic en cualquier icono
2. **Ver Código**: Se abrirá un modal con el código React y SVG
3. **Copiar**: Usa los botones de copiado para obtener el código
4. **Implementar**: Pega el código en tu proyecto

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Ejecutar en modo desarrollo
pnpm build        # Compilar para producción
pnpm start        # Ejecutar versión de producción
pnpm lint         # Ejecutar linter
pnpm lint:fix     # Corregir errores de linting automáticamente
```

---

## 🏗️ Arquitectura

### Tecnologías Utilizadas

- **⚛️ React 19** - Biblioteca de UI
- **🖤 Next.js 15** - Framework full-stack con App Router
- **🎨 Tailwind CSS 4** - Framework de estilos utility-first
- **✨ Framer Motion** - Animaciones fluidas
- **📝 TypeScript** - Tipado estático
- **🎯 ESLint** - Linting y calidad de código

### Estructura del Proyecto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── docs/              # Página de documentación
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal (catálogo)
├── components/            # Componentes reutilizables
│   ├── catalog/          # Componentes del catálogo
│   │   ├── IconCard.tsx  # Tarjeta de icono
│   │   ├── IconModal.tsx # Modal de detalles
│   │   └── SearchBar.tsx # Barra de búsqueda
│   └── layout/           # Componentes de layout
│       └── Navbar.tsx    # Navegación principal
└── types/                # Definiciones de tipos TypeScript
```

---

## 🔧 Configuración

### Variables de Entorno

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api-svgstorm-production.up.railway.app
```

### Configuración de la API

La aplicación se conecta a la API REST de SVGStorm:

- **Base URL**: `https://api-svgstorm-production.up.railway.app`
- **Endpoint Icons**: `/api/icons`
- **Endpoint Details**: `/api/icons/{name}`
- **Health Check**: `/api/health`

### Configuración de Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
```

---

## 🎨 Componentes Principales

### IconCard

Tarjeta interactiva que muestra:

- Previsualización del icono
- Nombre y categoría
- Tags relevantes
- Animaciones hover

### IconModal

Modal completo con:

- Previsualización grande del icono
- Código React y SVG
- Botones de copiado
- Metadatos del icono

### SearchBar

Barra de búsqueda con:

- Debounce automático (300ms)
- Indicador de búsqueda activa
- Botón de limpieza
- Animaciones de focus

---

## 🚀 Deployment

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build
pnpm build

# Deploy folder: out/
```

### Docker

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🔗 Enlaces Útiles

- **🌐 API en Vivo**: [https://api-svgstorm-production.up.railway.app](https://api-svgstorm-production.up.railway.app)
- **📚 Documentación**: [/docs](http://localhost:3000/docs)
- **🎯 Librería Cliente**: `svgstorm-client`

---

## 🤝 Contribución

### Proceso de Contribución

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abre** un Pull Request

### Estándares de Código

- Usar **TypeScript** para todo el código
- Seguir **ESLint** y **Prettier** configuraciones
- Componentes **funcionales** con hooks
- **Responsive design** obligatorio
- **Accesibilidad** (a11y) considerada

---

## 📋 Roadmap

### 🔄 Próximas Características

- [ ] 🌙 Modo oscuro/claro
- [ ] 🔍 Búsqueda avanzada con filtros
- [ ] 📱 PWA (Progressive Web App)
- [ ] 🎨 Personalizador de colores
- [ ] 📊 Analytics de uso
- [ ] 🔥 Iconos populares/trending
- [ ] 💾 Favoritos del usuario
- [ ] 🎯 Categorías expandidas

### 🐛 Mejoras Técnicas

- [ ] ⚡ Optimización de rendimiento
- [ ] 🔧 Tests unitarios e integración
- [ ] 🚀 Caching avanzado
- [ ] 📱 Notificaciones push
- [ ] 🔐 Autenticación opcional

---

## 🙏 Agradecimientos

- **Next.js Team** por el excelente framework
- **Tailwind CSS** por el sistema de diseño
- **Framer Motion** por las animaciones
- **Railway** por el hosting gratuito
- **Comunidad Open Source** por las herramientas

---

## 📞 Soporte

¿Necesitas ayuda? Puedes:

- 🐛 **Reportar bugs**: [GitHub Issues](https://github.com/your-repo/issues)
- 💬 **Preguntas**: [GitHub Discussions](https://github.com/your-repo/discussions)
- 📧 **Email**: support@svgstorm.com
- 🌐 **Documentación**: [/docs](http://localhost:3000/docs)

---

## 📄 Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

<div align="center">
  <p>Hecho con ❤️ por imamultidev</p>
  <p>⭐ Si te gusta el proyecto</p>
</div>
