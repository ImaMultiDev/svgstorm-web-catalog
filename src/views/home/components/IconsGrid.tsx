"use client";

import { motion, AnimatePresence } from "framer-motion";
import IconCard from "@/components/catalog/IconCard";
import { IconData } from "@/interfaces";

interface IconsGridProps {
  filteredIcons: IconData[];
  onIconSelect: (icon: IconData) => void;
  onSearch: (query: string) => void;
}

export default function IconsGrid({
  filteredIcons,
  onIconSelect,
  onSearch,
}: IconsGridProps) {
  return (
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
                <IconCard icon={icon} onSelect={onIconSelect} />
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
              onClick={() => onSearch("")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Ver todos los iconos
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
