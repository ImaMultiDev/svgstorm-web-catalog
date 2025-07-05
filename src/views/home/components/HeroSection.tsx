"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
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
        </motion.div>
      </div>
    </div>
  );
}
