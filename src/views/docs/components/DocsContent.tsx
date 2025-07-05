"use client";

import { motion } from "framer-motion";
import { DocsContentProps } from "@/interfaces";
import CodeBlock from "./CodeBlock";
import ExampleCard from "./ExampleCard";

export default function DocsContent({ activeTab }: DocsContentProps) {
  const installationCode = `# NPM
npm install svgstorm-client

# Yarn
yarn add svgstorm-client

# PNPM
pnpm add svgstorm-client`;

  const basicUsageCode = `import { Icon } from 'svgstorm-client'

function MyComponent() {
  return (
    <div>
      <Icon name="sun" size={24} />
      <Icon name="moon" size={32} color="#3B82F6" />
      <Icon name="star" className="text-yellow-500" />
    </div>
  )
}`;

  const hookUsageCode = `import { useIcon } from 'svgstorm-client'

function CustomIconComponent() {
  const { data, loading, error } = useIcon('sun', {
    apiBaseUrl: 'https://api-svgstorm-production.up.railway.app',
    cacheTime: 10 * 60 * 1000 // 10 minutos
  })

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return null

  return (
    <div>
      <h3>{data.name}</h3>
      <p>{data.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.svg_code }} />
    </div>
  )
}`;

  const advancedExample = `// Botón con icono dinámico
function IconButton({ 
  children, 
  iconName, 
  variant = 'primary',
  size = 'md',
  ...props 
}) {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  }

  return (
    <button 
      className={\`flex items-center space-x-2 rounded-lg transition-colors duration-200 \${sizeClasses[size]} \${variantClasses[variant]}\`}
      {...props}
    >
      <Icon name={iconName} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      <span>{children}</span>
    </button>
  )
}`;

  const renderContent = () => {
    switch (activeTab) {
      case "getting-started":
        return (
          <motion.div
            key="getting-started"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-8">
                🚀 Primeros Pasos
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                    ¿Qué es SVGStorm?
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    SVGStorm es una librería React + TypeScript diseñada para
                    integrar fácilmente iconos SVG desde nuestra API REST.
                    Ofrece componentes optimizados, caché inteligente y una
                    experiencia de desarrollo excepcional.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Características principales
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg">
                          Componente React simple
                        </h4>
                        <p className="text-slate-600 mt-1">
                          Integración directa con props intuitivas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg">
                          Caché inteligente
                        </h4>
                        <p className="text-slate-600 mt-1">
                          Reduce llamadas API con caché en memoria
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200/50">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg">
                          TypeScript nativo
                        </h4>
                        <p className="text-slate-600 mt-1">
                          Tipado completo y autocompletado
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200/50">
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-lg">
                          Ligereza extrema
                        </h4>
                        <p className="text-slate-600 mt-1">
                          Sin dependencias pesadas, solo React
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <svg
                      className="w-6 h-6 text-blue-600 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-lg">
                        Requisitos
                      </h4>
                      <p className="text-slate-700 mt-2">
                        React 18+ • TypeScript (recomendado) • Acceso a internet
                        para la API
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "installation":
        return (
          <motion.div
            key="installation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-8">
                📦 Instalación
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                    Instalar el paquete
                  </h3>
                  <p className="text-slate-700 mb-6 text-lg">
                    Elige tu gestor de paquetes preferido para instalar
                    svgstorm-client:
                  </p>
                  <CodeBlock
                    code={installationCode}
                    language="bash"
                    title="Línea de comandos"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                    Configuración básica
                  </h3>
                  <p className="text-slate-700 mb-6 text-lg">
                    Una vez instalado, puedes comenzar a usar los componentes
                    inmediatamente:
                  </p>
                  <CodeBlock
                    code={basicUsageCode}
                    language="tsx"
                    title="App.tsx"
                  />
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <svg
                      className="w-6 h-6 text-green-600 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-lg">
                        ¡Listo para usar!
                      </h4>
                      <p className="text-slate-700 mt-2">
                        No necesitas configuración adicional. La librería se
                        conecta automáticamente a nuestra API.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "usage":
        return (
          <motion.div
            key="usage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-8">
                ⚡ Uso Básico
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Componente Icon
                  </h3>
                  <p className="text-slate-700 mb-6 text-lg">
                    El componente principal para mostrar iconos SVG con props
                    personalizables:
                  </p>

                  <div className="overflow-x-auto bg-slate-50 rounded-xl p-6">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-4 px-4 font-semibold text-slate-800">
                            Prop
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-800">
                            Tipo
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-800">
                            Por defecto
                          </th>
                          <th className="text-left py-4 px-4 font-semibold text-slate-800">
                            Descripción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-200">
                          <td className="py-4 px-4 font-mono text-sm bg-purple-50 text-purple-800 rounded">
                            name
                          </td>
                          <td className="py-4 px-4 text-slate-700">string</td>
                          <td className="py-4 px-4 text-red-600 font-semibold">
                            requerido
                          </td>
                          <td className="py-4 px-4 text-slate-700">
                            Nombre del icono a mostrar
                          </td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="py-4 px-4 font-mono text-sm">size</td>
                          <td className="py-4 px-4 text-slate-700">number</td>
                          <td className="py-4 px-4 text-slate-700">24</td>
                          <td className="py-4 px-4 text-slate-700">
                            Tamaño del icono en píxeles
                          </td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="py-4 px-4 font-mono text-sm">color</td>
                          <td className="py-4 px-4 text-slate-700">string</td>
                          <td className="py-4 px-4 text-slate-500">
                            undefined
                          </td>
                          <td className="py-4 px-4 text-slate-700">
                            Color del icono (CSS válido)
                          </td>
                        </tr>
                        <tr className="border-b border-slate-200">
                          <td className="py-4 px-4 font-mono text-sm">
                            className
                          </td>
                          <td className="py-4 px-4 text-slate-700">string</td>
                          <td className="py-4 px-4 text-slate-500">
                            undefined
                          </td>
                          <td className="py-4 px-4 text-slate-700">
                            Clases CSS adicionales
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 px-4 font-mono text-sm">
                            apiBaseUrl
                          </td>
                          <td className="py-4 px-4 text-slate-700">string</td>
                          <td className="py-4 px-4 text-slate-700">API URL</td>
                          <td className="py-4 px-4 text-slate-700">
                            URL base de la API SVGStorm
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Hook useIcon
                  </h3>
                  <p className="text-slate-700 mb-6 text-lg">
                    Para casos de uso avanzados donde necesitas acceso directo a
                    los datos:
                  </p>
                  <CodeBlock
                    code={hookUsageCode}
                    language="tsx"
                    title="Uso avanzado con hook"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "examples":
        return (
          <motion.div
            key="examples"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-6">
                💡 Ejemplos
              </h2>
              <p className="text-slate-700 mb-8 text-lg">
                Descubre diferentes formas de usar SVGStorm en tus proyectos:
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <ExampleCard
                title="Botón con Icono"
                description="Combina iconos con botones para crear interfaces más intuitivas"
                code={`function IconButton({ children, iconName }) {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      <Icon name={iconName} size={20} />
      <span>{children}</span>
    </button>
  )
}

// Uso
<IconButton iconName="download">
  Descargar
</IconButton>`}
              />

              <ExampleCard
                title="Navegación con Iconos"
                description="Crea menús de navegación más visuales con iconos descriptivos"
                code={`const menuItems = [
  { label: 'Inicio', icon: 'home', href: '/' },
  { label: 'Perfil', icon: 'user', href: '/profile' },
  { label: 'Configuración', icon: 'settings', href: '/settings' }
]

function Navigation() {
  return (
    <nav className="space-y-2">
      {menuItems.map(item => (
        <a key={item.href} href={item.href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
          <Icon name={item.icon} size={20} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}`}
              />

              <ExampleCard
                title="Componente Avanzado"
                description="Ejemplo de un botón con variantes y tamaños dinámicos"
                code={advancedExample}
              />

              <ExampleCard
                title="Lista de Estados"
                description="Iconos dinámicos basados en estados de la aplicación"
                code={`function StatusList({ items }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return 'star'
      case 'warning': return 'help'
      case 'error': return 'help'
      default: return 'help'
    }
  }
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return '#10B981'
      case 'warning': return '#F59E0B'
      case 'error': return '#EF4444'
      default: return '#6B7280'
    }
  }

  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow">
          <Icon 
            name={getStatusIcon(item.status)} 
            size={20} 
            color={getStatusColor(item.status)}
          />
          <span>{item.message}</span>
        </li>
      ))}
    </ul>
  )
}`}
              />
            </div>
          </motion.div>
        );

      case "api":
        return (
          <motion.div
            key="api"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-8">
                📚 API Reference
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Endpoints de la API
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-mono font-semibold">
                          GET
                        </span>
                        <code className="text-lg font-mono text-slate-800">
                          /api/icons
                        </code>
                      </div>
                      <p className="text-slate-700">
                        Obtiene la lista completa de iconos disponibles con
                        metadatos (sin SVG).
                      </p>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-6 bg-slate-50">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-mono font-semibold">
                          GET
                        </span>
                        <code className="text-lg font-mono text-slate-800">
                          /api/icons/:name
                        </code>
                      </div>
                      <p className="text-slate-700">
                        Obtiene un icono específico con su código SVG completo.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Tipos TypeScript
                  </h3>
                  <CodeBlock
                    code={`interface IconData {
  id: number
  name: string
  category?: string
  tags: string[]
  description?: string
  createdAt: string
  updatedAt: string
}

interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
  apiBaseUrl?: string
}

interface UseIconOptions {
  apiBaseUrl?: string
  cacheTime?: number
}

interface UseIconResult {
  data: IconData | null
  loading: boolean
  error: string | null
}`}
                    language="typescript"
                    title="Definiciones de tipos"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                    Configuración del caché
                  </h3>
                  <p className="text-slate-700 mb-6 text-lg">
                    La librería incluye un sistema de caché inteligente para
                    optimizar el rendimiento:
                  </p>

                  <div className="bg-slate-50 rounded-xl p-6 mb-6">
                    <ul className="space-y-3 text-slate-700">
                      <li className="flex items-start space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mt-2"></span>
                        <span className="text-lg">
                          <strong className="text-slate-800">
                            Tiempo por defecto:
                          </strong>{" "}
                          5 minutos
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mt-2"></span>
                        <span className="text-lg">
                          <strong className="text-slate-800">
                            Almacenamiento:
                          </strong>{" "}
                          Memoria (Map)
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mt-2"></span>
                        <span className="text-lg">
                          <strong className="text-slate-800">
                            Invalidación:
                          </strong>{" "}
                          Automática por tiempo
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mt-2"></span>
                        <span className="text-lg">
                          <strong className="text-slate-800">
                            Personalizable:
                          </strong>{" "}
                          Via prop cacheTime
                        </span>
                      </li>
                    </ul>
                  </div>

                  <CodeBlock
                    code={`// Configurar caché personalizado
const { data, loading, error } = useIcon('sun', {
  cacheTime: 15 * 60 * 1000, // 15 minutos
  apiBaseUrl: 'https://mi-api-personalizada.com'
})`}
                    language="tsx"
                    title="Configuración personalizada"
                  />
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <svg
                      className="w-6 h-6 text-amber-600 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-lg">
                        Nota importante
                      </h4>
                      <p className="text-slate-700 mt-2">
                        La API está desplegada en Railway y requiere conexión a
                        internet. En desarrollo, asegúrate de tener acceso a la
                        red.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {renderContent()}
    </div>
  );
}
