export interface IconData {
  id: number;
  name: string;
  category?: string;
  tags: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IconStats {
  totalIcons: number;
  categories: number;
  tags: number;
}
