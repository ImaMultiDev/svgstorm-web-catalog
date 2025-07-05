"use client";

import { useState, useEffect, useCallback } from "react";
import { IconData, IconStats } from "@/interfaces";
import { api } from "@/lib/api";
import IconModal from "@/components/catalog/IconModal";
import {
  HeroSection,
  StatsSection,
  SearchSection,
  IconsGrid,
  ErrorSection,
  LoadingSection,
} from "./components";

export default function HomePage() {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [filteredIcons, setFilteredIcons] = useState<IconData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<IconData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState<IconStats>({
    totalIcons: 0,
    categories: 0,
    tags: 0,
  });

  // Load icons from API
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        setLoading(true);
        setError(null);

        const iconsData = await api.fetchIcons();

        setIcons(iconsData);
        setFilteredIcons(iconsData);

        // Calculate stats
        const categories = new Set(
          iconsData.map((icon) => icon.category).filter(Boolean)
        );
        const allTags = new Set(iconsData.flatMap((icon) => icon.tags));

        setStats({
          totalIcons: iconsData.length,
          categories: categories.size,
          tags: allTags.size,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(`Error de conexión: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchIcons();
  }, []);

  // Search handler
  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        setFilteredIcons(icons);
        return;
      }

      const filtered = icons.filter(
        (icon) =>
          icon.name.toLowerCase().includes(query.toLowerCase()) ||
          icon.category?.toLowerCase().includes(query.toLowerCase()) ||
          icon.tags.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase())
          ) ||
          icon.description?.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredIcons(filtered);
    },
    [icons]
  );

  // Icon selection handler
  const handleIconSelect = (icon: IconData) => {
    setSelectedIcon(icon);
    setIsModalOpen(true);
  };

  // Modal close handler
  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedIcon(null), 300);
  };

  // Loading state
  if (loading) {
    return <LoadingSection />;
  }

  // Error state
  if (error) {
    return <ErrorSection error={error} />;
  }

  // Main content
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection stats={stats} />
      <SearchSection onSearch={handleSearch} />
      <IconsGrid
        filteredIcons={filteredIcons}
        onIconSelect={handleIconSelect}
        onSearch={handleSearch}
      />
      <IconModal
        icon={selectedIcon}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
