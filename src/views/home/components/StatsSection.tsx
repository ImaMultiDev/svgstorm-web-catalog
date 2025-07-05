"use client";

import { motion } from "framer-motion";
import { IconStats } from "@/interfaces";

interface StatsSectionProps {
  stats: IconStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const statItems = [
    {
      value: stats.totalIcons,
      label: "Iconos Únicos",
      icon: "🎨",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      delay: 0.2,
    },
    {
      value: stats.categories,
      label: "Categorías",
      icon: "📁",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      delay: 0.4,
    },
    {
      value: stats.tags,
      label: "Tags Únicos",
      icon: "🏷️",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      delay: 0.6,
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50 py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-4">
            Biblioteca en Números
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Descubre la potencia de nuestra colección creciente de iconos
            profesionales
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200/50 hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden`}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-50`}
              ></div>

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-center mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {item.icon}
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: item.delay + 0.3,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-3`}
                >
                  {item.value}
                </motion.div>

                <div className="text-slate-700 font-semibold text-lg">
                  {item.label}
                </div>

                {/* Progress bar decoration */}
                <div className="mt-4 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: item.delay + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${item.gradient} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional info section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 max-w-2xl mx-auto">
            <div className="flex justify-center items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Actualizado diariamente
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                100% Optimizados
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                Listos para producción
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
