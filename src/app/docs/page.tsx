"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {language}
          </span>
        </div>
      )}
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors duration-200 z-10"
        >
          {copied ? (
            <svg
              className="w-4 h-4 text-green-400"
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
          ) : (
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

interface ExampleCardProps {
  title: string;
  description: string;
  code: string;
  preview?: React.ReactNode;
}

function ExampleCard({ title, description, code, preview }: ExampleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        {preview && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center">{preview}</div>
          </div>
        )}

        <CodeBlock code={code} language="tsx" />
      </div>
    </motion.div>
  );
}

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("getting-started");

  const tabs = [
    { id: "getting-started", label: "Primeros Pasos", icon: "🚀" },
    { id: "installation", label: "Instalación", icon: "📦" },
    { id: "usage", label: "Uso Básico", icon: "⚡" },
    { id: "examples", label: "Ejemplos", icon: "💡" },
    { id: "api", label: "API Reference", icon: "📚" },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Documentación
              <span className="block text-blue-200">SVGStorm</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Aprende a integrar y utilizar la librería SVGStorm Client en tus
              proyectos React de forma profesional y eficiente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://api-svgstorm-production.up.railway.app/api/icons"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Ver API
              </a>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Explorar Catálogo
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === "getting-started" && (
          <motion.div
            key="getting-started"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                🚀 Primeros Pasos
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    ¿Qué es SVGStorm?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    SVGStorm es una librería React + TypeScript diseñada para
                    integrar fácilmente iconos SVG desde nuestra API REST.
                    Ofrece componentes optimizados, caché inteligente y una
                    experiencia de desarrollo excepcional.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Características principales
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-4 h-4 text-green-600"
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
                        <h4 className="font-medium text-gray-900">
                          Componente React simple
                        </h4>
                        <p className="text-sm text-gray-600">
                          Integración directa con props intuitivas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-4 h-4 text-blue-600"
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
                        <h4 className="font-medium text-gray-900">
                          Caché inteligente
                        </h4>
                        <p className="text-sm text-gray-600">
                          Reduce llamadas API con caché en memoria
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-4 h-4 text-purple-600"
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
                        <h4 className="font-medium text-gray-900">
                          TypeScript nativo
                        </h4>
                        <p className="text-sm text-gray-600">
                          Tipado completo y autocompletado
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                        <svg
                          className="w-4 h-4 text-yellow-600"
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
                        <h4 className="font-medium text-gray-900">
                          Ligereza extrema
                        </h4>
                        <p className="text-sm text-gray-600">
                          Sin dependencias pesadas, solo React
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5"
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
                      <h4 className="font-medium text-blue-900">Requisitos</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        React 18+ • TypeScript (recomendado) • Acceso a internet
                        para la API
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "installation" && (
          <motion.div
            key="installation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                📦 Instalación
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Instalar el paquete
                  </h3>
                  <p className="text-gray-700 mb-4">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Configuración básica
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Una vez instalado, puedes comenzar a usar los componentes
                    inmediatamente:
                  </p>
                  <CodeBlock
                    code={basicUsageCode}
                    language="tsx"
                    title="App.tsx"
                  />
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5"
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
                      <h4 className="font-medium text-green-900">
                        ¡Listo para usar!
                      </h4>
                      <p className="text-green-700 text-sm mt-1">
                        No necesitas configuración adicional. La librería se
                        conecta automáticamente a nuestra API.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "usage" && (
          <motion.div
            key="usage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ⚡ Uso Básico
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Componente Icon
                  </h3>
                  <p className="text-gray-700 mb-4">
                    El componente principal para mostrar iconos SVG con props
                    personalizables:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-50 rounded-lg">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Prop
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Tipo
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Por defecto
                          </th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">
                            Descripción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-mono text-sm bg-blue-50">
                            name
                          </td>
                          <td className="py-3 px-4 text-sm">string</td>
                          <td className="py-3 px-4 text-sm text-red-600">
                            requerido
                          </td>
                          <td className="py-3 px-4 text-sm">
                            Nombre del icono a mostrar
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-mono text-sm">size</td>
                          <td className="py-3 px-4 text-sm">number</td>
                          <td className="py-3 px-4 text-sm">24</td>
                          <td className="py-3 px-4 text-sm">
                            Tamaño del icono en píxeles
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-mono text-sm">color</td>
                          <td className="py-3 px-4 text-sm">string</td>
                          <td className="py-3 px-4 text-sm">undefined</td>
                          <td className="py-3 px-4 text-sm">
                            Color del icono (CSS válido)
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-3 px-4 font-mono text-sm">
                            className
                          </td>
                          <td className="py-3 px-4 text-sm">string</td>
                          <td className="py-3 px-4 text-sm">undefined</td>
                          <td className="py-3 px-4 text-sm">
                            Clases CSS adicionales
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-mono text-sm">
                            apiBaseUrl
                          </td>
                          <td className="py-3 px-4 text-sm">string</td>
                          <td className="py-3 px-4 text-sm">API URL</td>
                          <td className="py-3 px-4 text-sm">
                            URL base de la API SVGStorm
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Hook useIcon
                  </h3>
                  <p className="text-gray-700 mb-4">
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
        )}

        {activeTab === "examples" && (
          <motion.div
            key="examples"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                💡 Ejemplos
              </h2>
              <p className="text-gray-700 mb-8">
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
        )}

        {activeTab === "api" && (
          <motion.div
            key="api"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                📚 API Reference
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Endpoints de la API
                  </h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                          GET
                        </span>
                        <code className="text-sm">/api/icons</code>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Obtiene la lista completa de iconos disponibles con
                        metadatos (sin SVG).
                      </p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                          GET
                        </span>
                        <code className="text-sm">/api/icons/:name</code>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Obtiene un icono específico con su código SVG completo.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Configuración del caché
                  </h3>
                  <p className="text-gray-700 mb-4">
                    La librería incluye un sistema de caché inteligente para
                    optimizar el rendimiento:
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        <span>
                          <strong>Tiempo por defecto:</strong> 5 minutos
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        <span>
                          <strong>Almacenamiento:</strong> Memoria (Map)
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        <span>
                          <strong>Invalidación:</strong> Automática por tiempo
                        </span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        <span>
                          <strong>Personalizable:</strong> Via prop cacheTime
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

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-amber-600 mt-0.5"
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
                      <h4 className="font-medium text-amber-900">
                        Nota importante
                      </h4>
                      <p className="text-amber-700 text-sm mt-1">
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
        )}
      </div>
    </div>
  );
}
