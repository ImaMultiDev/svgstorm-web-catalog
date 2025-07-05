"use client";

import { DocsTab } from "@/interfaces";

interface DocsNavigationProps {
  tabs: DocsTab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function DocsNavigation({
  tabs,
  activeTab,
  setActiveTab,
}: DocsNavigationProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 mx-1 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-slate-200/50"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-semibold">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
