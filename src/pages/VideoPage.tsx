
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { VideoPlayer } from "@/components/videos/VideoPlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatDuration } from "@/lib/formatters";

// Mocked data types
interface Video {
  id: string;
  title: string;
  description: string;
  source: string;
  thumbnail: string;
  duration: number;
  date: string;
  viewed: boolean;
  favorite: boolean;
  actor: {
    id: string;
    name: string;
  };
}

export default function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Mock data
    setTimeout(() => {
      const mockVideo: Video = {
        id: id || "video-1",
        title: `Sample Video ${id?.split('-')[1] || 1}`,
        description: "This is a detailed description of the video content. It might include information about the plot, the production, or other interesting facts. This text is much longer than what would be displayed in a card view.",
        source: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video URL
        thumbnail: "",
        duration: 120 + Math.floor(Math.random() * 600),
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        viewed: Math.random() > 0.5,
        favorite: Math.random() > 0.7,
        actor: {
          id: `actor-${Math.floor(Math.random() * 5) + 1}`,
          name: `Actor ${Math.floor(Math.random() * 5) + 1}`
        }
      };
      
      setVideo(mockVideo);
      setIsFavorite(mockVideo.favorite);
      setIsViewed(mockVideo.viewed);
      setIsLoading(false);
      
      // Mark as viewed when loaded
      if (!mockVideo.viewed) {
        // API call would go here to mark as viewed
      }
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

  if (!video) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
        <p className="text-muted-foreground mb-6">The requested video could not be found.</p>
        <Link to="/" className="text-primary hover:underline">
          Back to Videos
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4 fancy-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Videos
        </Link>
        
        <h1 className="text-3xl font-bold">{video.title}</h1>
      </div>
      
      {/* Video player */}
      <div className="mb-6">
        <VideoPlayer
          src={video.source}
          poster={video.thumbnail}
          title={video.title}
        />
      </div>
      
      {/* Video details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-foreground whitespace-pre-line">
              {video.description || "No description available."}
            </p>
          </div>
        </div>
        
        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="bg-card p-4 rounded-lg">
            <h3 className="font-medium mb-4">Details</h3>
            
            <div className="space-y-3">
              {/* Actor */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actor:</span>
                <Link to={`/actor/${video.actor.id}`} className="fancy-link">
                  {video.actor.name}
                </Link>
              </div>
              
              {/* Date */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{formatDate(video.date)}</span>
              </div>
              
              {/* Duration */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>{formatDuration(video.duration)}</span>
              </div>
              
              {/* Status badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {isViewed && (
                  <Badge variant="outline" className="border-green-500/50 text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="m3 17 2 2 4-4" />
                      <path d="m3 7 2 2 4-4" />
                      <path d="M13 6h8" />
                      <path d="M13 12h8" />
                      <path d="M13 18h8" />
                    </svg>
                    Viewed
                  </Badge>
                )}
                
                {isFavorite && (
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    Favorite
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={toggleFavorite}
              variant={isFavorite ? "default" : "outline"}
              className="flex-1"
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
                className="mr-1"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
