import SearchBar from "@/components/catalog/SearchBar";

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}
