import { ReactNode } from "react";

export interface DocsTab {
  id: string;
  label: string;
  icon: string;
}

export interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export interface ExampleCardProps {
  title: string;
  description: string;
  code: string;
  preview?: ReactNode;
}

export interface DocsPageProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: DocsTab[];
}

export interface DocsContentProps {
  activeTab: string;
  tabs: DocsTab[];
}
