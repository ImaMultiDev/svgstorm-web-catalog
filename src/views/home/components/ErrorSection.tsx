"use client";

import { motion } from "framer-motion";

interface ErrorSectionProps {
  error: string;
}

export default function ErrorSection({ error }: ErrorSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-red-50 to-orange-50 flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Error icon with animation */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-full border-4 border-red-200/50 flex items-center justify-center">
              <motion.svg
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-16 h-16 text-red-500"
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
              </motion.svg>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-red-300 rounded-full animate-pulse animation-delay-2000"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            ¡Ups! Algo salió mal
          </h2>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/50 mb-8">
            <p className="text-xl text-red-600 font-semibold mb-2">{error}</p>
            <p className="text-slate-600">
              No te preocupes, estamos trabajando para solucionarlo
            </p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-red-500/50 transition-all duration-300 hover:from-red-700 hover:to-orange-700"
          >
            <svg
              className="w-5 h-5 mr-3 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reintentar
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/")}
            className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl font-semibold border border-slate-200/50 hover:border-red-300 hover:bg-red-50 transition-all duration-300"
          >
            <svg
              className="w-5 h-5 mr-3 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ir al Inicio
          </motion.button>
        </motion.div>

        {/* Additional help info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50"
        >
          <h3 className="text-lg font-semibold text-slate-800 mb-3">
            Posibles soluciones:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <div>
                <p className="font-medium">Verifica tu conexión</p>
                <p>Asegúrate de tener una conexión estable a internet</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <div>
                <p className="font-medium">Intenta más tarde</p>
                <p>El servicio podría estar temporalmente no disponible</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <div>
                <p className="font-medium">Limpia el cache</p>
                <p>Refresca la página o limpia el cache del navegador</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              <div>
                <p className="font-medium">Contacta soporte</p>
                <p>Si el problema persiste, reporta el error</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
