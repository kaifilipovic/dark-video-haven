
import { useState, useEffect } from "react";
import { VideoCard } from "@/components/videos/VideoCard";
import { SearchAndFilter } from "@/components/filters/SearchAndFilter";
import { Pagination } from "@/components/pagination/Pagination";

// Mocked data types
interface Video {
  id: string;
  title: string;
  thumbnail: string;
  actor: {
    id: string;
    name: string;
  };
  duration: number;
  date: string;
  viewed: boolean;
  favorite: boolean;
  description?: string;
}

// Sort options
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title_asc", label: "Title (A-Z)" },
  { value: "title_desc", label: "Title (Z-A)" },
  { value: "duration_asc", label: "Duration (Shortest)" },
  { value: "duration_desc", label: "Duration (Longest)" }
];

// Mock data (in a real app, this would come from API)
const mockVideos: Video[] = Array.from({ length: 24 }, (_, i) => ({
  id: `video-${i + 1}`,
  title: `Sample Video ${i + 1} with a potentially long title that might need to be truncated`,
  thumbnail: "",
  actor: {
    id: `actor-${(i % 5) + 1}`,
    name: `Actor ${(i % 5) + 1}`
  },
  duration: 120 + Math.floor(Math.random() * 600),
  date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  viewed: Math.random() > 0.5,
  favorite: Math.random() > 0.7,
  description: Math.random() > 0.3 ? "This is a sample video description that might be quite long and need to be truncated when displayed in cards." : undefined
}));

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    viewed: false,
    unviewed: false,
    favorites: false
  });
  
  const videosPerPage = 12;
  
  // Initial data load
  useEffect(() => {
    // In a real app, this would be an API call
    setVideos(mockVideos);
  }, []);
  
  // Apply filters, sorting, and search
  useEffect(() => {
    let result = [...videos];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(video => 
        video.title.toLowerCase().includes(query) || 
        video.description?.toLowerCase().includes(query)
      );
    }
    
    // Apply filters
    if (filters.viewed) {
      result = result.filter(video => video.viewed);
    }
    if (filters.unviewed) {
      result = result.filter(video => !video.viewed);
    }
    if (filters.favorites) {
      result = result.filter(video => video.favorite);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        case "duration_asc":
          return a.duration - b.duration;
        case "duration_desc":
          return b.duration - a.duration;
        default:
          return 0;
      }
    });
    
    setFilteredVideos(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [videos, searchQuery, sortBy, filters]);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Handle sort change
  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };
  
  // Handle filter change
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Videos</h1>
      
      {/* Search and filters */}
      <SearchAndFilter
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        sortOptions={sortOptions}
      />
      
      {/* Results count */}
      <div className="text-sm text-muted-foreground mb-6">
        Showing {currentVideos.length} of {filteredVideos.length} videos
      </div>
      
      {/* Video grid */}
      {currentVideos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No videos match your search or filter criteria.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilters({ viewed: false, unviewed: false, favorites: false });
              setSortBy("newest");
            }}
            className="mt-4 text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail}
              actor={video.actor}
              duration={video.duration}
              date={video.date}
              viewed={video.viewed}
              favorite={video.favorite}
              description={video.description}
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
