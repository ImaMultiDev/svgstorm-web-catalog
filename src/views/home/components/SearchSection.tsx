"use client";

import { motion } from "framer-motion";
import SearchBar from "@/components/catalog/SearchBar";

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  return (
    <div
      id="search-section"
      className="sticky bg-gradient-to-r from-slate-100 via-white to-slate-100 border-b border-slate-200/50 top-0 z-40 shadow-lg"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-0 right-1/3 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-purple-800 bg-clip-text text-transparent mb-2">
            Encuentra el Icono Perfecto
          </h2>
          <p className="text-slate-600">
            Busca entre miles de iconos por nombre, categoría o etiqueta
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <SearchBar onSearch={onSearch} />
        </motion.div>

        {/* Quick filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          {["interface", "social", "arrow", "business", "weather"].map(
            (tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSearch(tag)}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm text-slate-700 rounded-full border border-slate-200/50 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
              >
                #{tag}
              </motion.button>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}
