
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { VideoCard } from "@/components/videos/VideoCard";
import { Badge } from "@/components/ui/badge";

// Mocked data types
interface Actor {
  id: string;
  name: string;
  banner: string;
  icon: string;
  favorite: boolean;
}

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

export default function ActorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<Actor | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, these would be API calls
    setIsLoading(true);
    
    // Mock data
    setTimeout(() => {
      const mockActor: Actor = {
        id: id || "actor-1",
        name: `Actor ${id?.split('-')[1] || 1}`,
        banner: "",
        icon: "",
        favorite: Math.random() > 0.5
      };
      
      const mockVideos: Video[] = Array.from({ length: 8 }, (_, i) => ({
        id: `video-${i + 1}`,
        title: `Sample Video ${i + 1} by ${mockActor.name}`,
        thumbnail: "",
        actor: {
          id: mockActor.id,
          name: mockActor.name
        },
        duration: 120 + Math.floor(Math.random() * 600),
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        viewed: Math.random() > 0.5,
        favorite: Math.random() > 0.7,
        description: Math.random() > 0.3 ? "This is a sample video description that might be quite long and need to be truncated when displayed in cards." : undefined
      }));
      
      setActor(mockActor);
      setIsFavorite(mockActor.favorite);
      setVideos(mockVideos);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // API call would go here
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-pulse-accent text-primary">Loading...</div>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Actor Not Found</h1>
        <p className="text-muted-foreground mb-6">The requested actor could not be found.</p>
        <Link to="/actors" className="text-primary hover:underline">
          Back to Actors
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Banner */}
      <div className="relative h-64 md:h-80 lg:h-96 w-full rounded-lg overflow-hidden mb-8">
        <img
          src={actor.banner || "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=400&fit=crop"}
          alt={`${actor.name} banner`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
      
      {/* Actor info */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
        {/* Icon/Avatar */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background -mt-16 md:mt-0">
          <img
            src={actor.icon || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop"}
            alt={actor.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{actor.name}</h1>
              <p className="text-muted-foreground mt-1">
                {videos.length} {videos.length === 1 ? "video" : "videos"}
              </p>
            </div>
            
            <Button
              variant={isFavorite ? "default" : "outline"}
              onClick={toggleFavorite}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isFavorite ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Videos section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Videos</h2>
        
        {videos.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg">
            <p className="text-lg text-muted-foreground">No videos found for this actor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
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
      </div>
    </div>
  );
}
