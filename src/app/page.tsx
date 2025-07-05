"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/catalog/SearchBar";
import IconCard from "@/components/catalog/IconCard";
import IconModal from "@/components/catalog/IconModal";

interface IconData {
  id: number;
  name: string;
  category?: string;
  tags: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function HomePage() {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [filteredIcons, setFilteredIcons] = useState<IconData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({
    totalIcons: 0,
    categories: 0,
    tags: 0,
  });

  // Load icons from API
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching icons from:", `${API_BASE_URL}/api/icons`);

        const response = await fetch(`${API_BASE_URL}/api/icons`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setIcons(data.data);
          setFilteredIcons(data.data);

          // Calculate stats
          const categories = new Set(
            data.data.map((icon: IconData) => icon.category).filter(Boolean)
          );
          const allTags = new Set(
            data.data.flatMap((icon: IconData) => icon.tags)
          );

          setStats({
            totalIcons: data.data.length,
            categories: categories.size,
            tags: allTags.size,
          });
        } else {
          setError(
            "Error al cargar los iconos: " + (data.message || "Unknown error")
          );
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Error de conexión: ${errorMessage}`);
        console.error("Fetch error:", err);
        console.error("API URL:", `${API_BASE_URL}/api/icons`);
      } finally {
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  // Search handler
  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredIcons(icons);
        return;
      }

      const filtered = icons.filter(
        (icon) =>
          icon.name.toLowerCase().includes(query.toLowerCase()) ||
          icon.category?.toLowerCase().includes(query.toLowerCase()) ||
          icon.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          ) ||
          icon.description?.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredIcons(filtered);
    },
    [icons]
  );

  // Icon selection handler
  const handleIconSelect = (icon: IconData) => {
    setSelectedIcon(icon);
    setIsModalOpen(true);
  };

  // Modal close handler
  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedIcon(null), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando iconos...</p>
          <p className="text-sm text-gray-500 mt-2">
            Conectando con la API de SVGStorm
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-xl text-red-600 mb-2">{error}</p>
          <p className="text-sm text-gray-500">
            Verifica la conexión y vuelve a intentarlo
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Descubre Iconos
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Extraordinarios
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Explora nuestra biblioteca profesional de iconos SVG. Elegantes,
              optimizados y listos para usar en tus proyectos.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-yellow-400">
                  {stats.totalIcons}
                </div>
                <div className="text-blue-100">Iconos Únicos</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-green-400">
                  {stats.categories}
                </div>
                <div className="text-blue-100">Categorías</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-purple-400">
                  {stats.tags}
                </div>
                <div className="text-blue-100">Tags Únicos</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Icons Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Catálogo de Iconos
            </h2>
            <p className="text-gray-600 mt-2">
              {filteredIcons.length}{" "}
              {filteredIcons.length === 1
                ? "icono encontrado"
                : "iconos encontrados"}
            </p>
          </div>

          {/* View options */}
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-blue-500 text-white rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Icons Grid */}
        <AnimatePresence mode="popLayout">
          {filteredIcons.length > 0 ? (
            <motion.div
              key="icons-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredIcons.map((icon, index) => (
                <motion.div
                  key={icon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                >
                  <IconCard icon={icon} onSelect={handleIconSelect} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron iconos
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta con diferentes palabras clave o navega por categorías
              </p>
              <button
                onClick={() => handleSearch("")}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Ver todos los iconos
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Icon Modal */}
      <IconModal
        icon={selectedIcon}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
