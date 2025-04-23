
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onSortChange: (sort: string) => void; 
  onFilterChange: (filters: { viewed: boolean; unviewed: boolean; favorites: boolean }) => void;
  sortOptions: Array<{ value: string; label: string }>;
}

export function SearchAndFilter({ 
  onSearch, 
  onSortChange, 
  onFilterChange,
  sortOptions 
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState(sortOptions[0]?.value || "");
  const [filters, setFilters] = useState({
    viewed: false,
    unviewed: false,
    favorites: false,
  });

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    onSortChange(value);
  };

  const handleFilterChange = (key: keyof typeof filters, value: boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-1/2">
          <Input
            placeholder="Search by title or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pr-16"
          />
          <Button
            size="sm"
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Search
          </Button>
        </div>

        {/* Sort dropdown */}
        <div className="w-full md:w-1/4">
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter toggles */}
      <div className="flex flex-wrap items-center gap-6 pt-2">
        <span className="text-sm font-medium">Filters:</span>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="viewed"
            checked={filters.viewed}
            onCheckedChange={(checked) => 
              handleFilterChange("viewed", checked === true)
            }
          />
          <Label htmlFor="viewed" className="cursor-pointer">Viewed</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="unviewed"
            checked={filters.unviewed}
            onCheckedChange={(checked) => 
              handleFilterChange("unviewed", checked === true)
            }
          />
          <Label htmlFor="unviewed" className="cursor-pointer">Unviewed</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="favorites"
            checked={filters.favorites}
            onCheckedChange={(checked) => 
              handleFilterChange("favorites", checked === true)
            }
          />
          <Label htmlFor="favorites" className="cursor-pointer">Favorites</Label>
        </div>
      </div>
    </div>
  );
}
