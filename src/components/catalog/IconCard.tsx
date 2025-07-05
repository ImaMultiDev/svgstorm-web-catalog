"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconData } from "@/interfaces";

interface IconCardProps {
  icon: IconData;
  onSelect: (icon: IconData) => void;
  className?: string;
}

export default function IconCard({
  icon,
  onSelect,
  className = "",
}: IconCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [iconSvg, setIconSvg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load icon immediately when component mounts
  useEffect(() => {
    const loadIconSvg = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api-svgstorm-production.up.railway.app/api/icons/${icon.name}`
        );
        const data = await response.json();
        if (data.success) {
          setIconSvg(data.data.svg_code);
        }
      } catch (error) {
        console.error("Error loading icon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIconSvg();
  }, [icon.name]);

  const handleClick = () => {
    onSelect(icon);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      className={`relative group cursor-pointer bg-white rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Gradient overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 z-0"
      />

      <div className="relative z-10 p-6">
        {/* Icon preview */}
        <div className="flex items-center justify-center h-20 mb-4">
          {isLoading ? (
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : iconSvg ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 text-gray-700 group-hover:text-blue-600 transition-colors duration-300"
              dangerouslySetInnerHTML={{ __html: iconSvg }}
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Icon name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors duration-300">
          {icon.name}
        </h3>

        {/* Category badge */}
        {icon.category && (
          <div className="flex justify-center mb-3">
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {icon.category}
            </span>
          </div>
        )}

        {/* Description */}
        {icon.description && (
          <p className="text-sm text-gray-600 text-center mb-3 line-clamp-2">
            {icon.description}
          </p>
        )}

        {/* Tags */}
        {icon.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {icon.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
              >
                {tag}
              </span>
            ))}
            {icon.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                +{icon.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Hover actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="flex justify-center space-x-2"
        >
          <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Corner indicator */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
}
