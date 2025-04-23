
import { useState, useEffect } from "react";
import { ActorCard } from "@/components/actors/ActorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/components/pagination/Pagination";

// Mocked data types
interface Actor {
  id: string;
  name: string;
  image: string;
  videosCount: number;
  favorite: boolean;
}

// Mock data (in a real app, this would come from API)
const mockActors: Actor[] = Array.from({ length: 20 }, (_, i) => ({
  id: `actor-${i + 1}`,
  name: `Actor ${i + 1}`,
  image: "",
  videosCount: 5 + Math.floor(Math.random() * 20),
  favorite: Math.random() > 0.7
}));

export default function ActorsPage() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [filteredActors, setFilteredActors] = useState<Actor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const actorsPerPage = 12;
  
  // Initial data load
  useEffect(() => {
    // In a real app, this would be an API call
    setActors(mockActors);
  }, []);
  
  // Apply filters and search
  useEffect(() => {
    let result = [...actors];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(actor => 
        actor.name.toLowerCase().includes(query)
      );
    }
    
    // Apply favorite filter
    if (showFavoritesOnly) {
      result = result.filter(actor => actor.favorite);
    }
    
    // Sort by name
    result.sort((a, b) => a.name.localeCompare(b.name));
    
    setFilteredActors(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [actors, searchQuery, showFavoritesOnly]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredActors.length / actorsPerPage);
  const currentActors = filteredActors.slice(
    (currentPage - 1) * actorsPerPage,
    currentPage * actorsPerPage
  );
  
  // Handle search
  const handleSearch = () => {
    // Search is already handled by the useEffect
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Actors</h1>
      
      {/* Search and filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search input */}
          <div className="relative w-full md:w-1/2">
            <Input
              placeholder="Search by actor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        </div>
        
        {/* Filter toggles */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="favorites-only"
            checked={showFavoritesOnly}
            onCheckedChange={(checked) => 
              setShowFavoritesOnly(checked === true)
            }
          />
          <Label htmlFor="favorites-only" className="cursor-pointer">Show Favorites Only</Label>
        </div>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground mb-6">
        Showing {currentActors.length} of {filteredActors.length} actors
      </div>
      
      {/* Actors grid */}
      {currentActors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No actors match your search criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setShowFavoritesOnly(false);
            }}
            className="mt-4 text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentActors.map((actor) => (
            <ActorCard
              key={actor.id}
              id={actor.id}
              name={actor.name}
              image={actor.image}
              videosCount={actor.videosCount}
              favorite={actor.favorite}
            />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
