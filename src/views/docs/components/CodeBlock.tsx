"use client";

import { useState } from "react";
import { CodeBlockProps } from "@/interfaces";

export default function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-slate-800">{title}</h4>
          <span className="text-sm bg-gradient-to-r from-purple-100 to-blue-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
            {language}
          </span>
        </div>
      )}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
        <button
          onClick={copyToClipboard}
          className="absolute top-4 right-4 p-3 bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-all duration-200 z-10 border border-slate-600/50 hover:border-slate-500 group"
        >
          {copied ? (
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors"
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
          )}
        </button>

        {/* Header bar */}
        <div className="bg-slate-700/50 border-b border-slate-600/50 px-6 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="ml-4 text-slate-400 text-sm font-mono">
              {title || `main.${language}`}
            </div>
          </div>
        </div>

        <pre className="p-6 text-sm text-slate-100 overflow-x-auto leading-relaxed">
          <code className="font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
}
