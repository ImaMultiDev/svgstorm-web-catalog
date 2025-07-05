"use client";

import { motion } from "framer-motion";
import { ExampleCardProps } from "@/interfaces";
import CodeBlock from "./CodeBlock";

export default function ExampleCard({
  title,
  description,
  code,
  preview,
}: ExampleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/50 shadow-2xl overflow-hidden hover:shadow-purple-500/25 transition-all duration-300"
    >
      <div className="p-8">
        <div className="flex items-start space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {preview && (
          <div className="bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl p-6 mb-6 border border-slate-200/50">
            <div className="flex items-center justify-center">{preview}</div>
          </div>
        )}

        <CodeBlock code={code} language="tsx" />
      </div>
    </motion.div>
  );
}
