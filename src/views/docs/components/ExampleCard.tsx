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
      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        {preview && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center">{preview}</div>
          </div>
        )}

        <CodeBlock code={code} language="tsx" />
      </div>
    </motion.div>
  );
}
