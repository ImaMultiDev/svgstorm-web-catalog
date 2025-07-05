"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IconData {
  id: number;
  name: string;
  category?: string;
  tags: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface IconWithSVG extends IconData {
  svg_code: string;
}

interface IconModalProps {
  icon: IconData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function IconModal({ icon, isOpen, onClose }: IconModalProps) {
  const [iconDetails, setIconDetails] = useState<IconWithSVG | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const fetchIconDetails = useCallback(async () => {
    if (!icon) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api-svgstorm-production.up.railway.app/api/icons/${icon.name}`
      );
      const data = await response.json();
      if (data.success) {
        setIconDetails(data.data);
      }
    } catch (error) {
      console.error("Error fetching icon details:", error);
    } finally {
      setIsLoading(false);
    }
  }, [icon]);

  useEffect(() => {
    if (isOpen && icon) {
      fetchIconDetails();
    }
  }, [isOpen, icon, fetchIconDetails]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const svgCode = iconDetails?.svg_code || "";
  const reactCode = `import { Icon } from 'svgstorm-client'

<Icon 
  name="${icon?.name}" 
  size={24} 
  color="#3B82F6" 
  className="your-custom-class" 
/>`;

  const htmlCode = svgCode.replace(
    /stroke="currentColor"/g,
    'stroke="#3B82F6"'
  );

  if (!isOpen || !icon) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : iconDetails ? (
                    <div
                      className="w-8 h-8 text-white"
                      dangerouslySetInnerHTML={{ __html: iconDetails.svg_code }}
                    />
                  ) : (
                    <span className="text-lg">🎨</span>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{icon.name}</h2>
                  <p className="text-blue-100">
                    {icon.category && `${icon.category} • `}
                    {icon.tags.length} tags
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-500">
                    Cargando detalles del icono...
                  </p>
                </div>
              </div>
            ) : iconDetails ? (
              <div className="space-y-6">
                {/* Icon preview */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-2xl mb-4">
                    <div
                      className="w-16 h-16 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: iconDetails.svg_code }}
                    />
                  </div>
                  {iconDetails.description && (
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      {iconDetails.description}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {iconDetails.tags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {iconDetails.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code sections */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* React code */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">React Component</h3>
                      <button
                        onClick={() => copyToClipboard(reactCode, "react")}
                        className="flex items-center space-x-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        {copied === "react" ? (
                          <>
                            <svg
                              className="w-4 h-4"
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
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
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
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{reactCode}</code>
                    </pre>
                  </div>

                  {/* SVG code */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">SVG Code</h3>
                      <button
                        onClick={() => copyToClipboard(htmlCode, "svg")}
                        className="flex items-center space-x-2 px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                      >
                        {copied === "svg" ? (
                          <>
                            <svg
                              className="w-4 h-4"
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
                            <span>¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
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
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{htmlCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Información</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Nombre
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {iconDetails.name}
                        </dd>
                      </div>
                      {iconDetails.category && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Categoría
                          </dt>
                          <dd className="text-sm text-gray-900">
                            {iconDetails.category}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          ID
                        </dt>
                        <dd className="text-sm text-gray-900">
                          #{iconDetails.id}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Fechas</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Creado
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {new Date(iconDetails.createdAt).toLocaleDateString(
                            "es-ES"
                          )}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Actualizado
                        </dt>
                        <dd className="text-sm text-gray-900">
                          {new Date(iconDetails.updatedAt).toLocaleDateString(
                            "es-ES"
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Error al cargar los detalles del icono
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
