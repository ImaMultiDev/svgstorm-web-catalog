"use client";

import { motion } from "framer-motion";
import { IconStats } from "@/interfaces";

interface StatsSectionProps {
  stats: IconStats;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
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
      </div>
    </div>
  );
}
