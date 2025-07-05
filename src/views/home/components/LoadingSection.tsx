"use client";

import { motion } from "framer-motion";

export default function LoadingSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50 flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Modern loading spinner */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 border-r-blue-600 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-2 border-transparent border-b-purple-400 border-l-blue-400 rounded-full animate-spin animation-delay-2000"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>

          {/* Pulsing dots */}
          <div className="flex justify-center space-x-2 mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
              className="w-3 h-3 bg-purple-600 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
              className="w-3 h-3 bg-blue-600 rounded-full"
            ></motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
              className="w-3 h-3 bg-purple-600 rounded-full"
            ></motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Cargando Iconos
          </h2>
          <p className="text-xl text-slate-600 mb-2">
            Conectando con la API de SVGStorm
          </p>
          <p className="text-sm text-slate-500">
            Preparando tu biblioteca de iconos profesionales...
          </p>
        </motion.div>

        {/* Progress indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 max-w-md mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50">
            <div className="flex justify-center items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                API Conectada
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Cargando Datos
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                Optimizando
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
