
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardFooter, HoverCardHeader, HoverCardTitle } from "@/components/ui/card-with-hover";
import { formatDuration } from "@/lib/formatters";

interface VideoCardProps {
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

export function VideoCard({
  id,
  title,
  thumbnail,
  actor,
  duration,
  date,
  viewed,
  favorite,
  description
}: VideoCardProps) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const [isViewed, setIsViewed] = useState(viewed);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    // API call would go here
  };
  
  const toggleViewed = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsViewed(!isViewed);
    // API call would go here
  };

  return (
    <Link to={`/video/${id}`} className="block">
      <HoverCard className="overflow-hidden h-full">
        <div className="relative">
          <img
            src={thumbnail || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop"}
            alt={title}
            className="w-full h-48 object-cover"
          />
          
          {/* Duration badge */}
          <Badge className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm">
            {formatDuration(duration)}
          </Badge>
          
          {/* Viewed/unviewed overlay */}
          {!isViewed && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-primary/80 backdrop-blur-sm">New</Badge>
            </div>
          )}
        </div>
        
        <HoverCardHeader className="pb-2">
          <HoverCardTitle className="line-clamp-2 text-lg">{title}</HoverCardTitle>
          <div className="flex items-center justify-between mt-1">
            <Link to={`/actor/${actor.id}`} onClick={(e) => e.stopPropagation()} className="text-sm text-muted-foreground hover:text-primary fancy-link">
              {actor.name}
            </Link>
            <span className="text-xs text-muted-foreground">{new Date(date).toLocaleDateString()}</span>
          </div>
        </HoverCardHeader>
        
        {description && (
          <HoverCardContent className="py-0">
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
          </HoverCardContent>
        )}
        
        <HoverCardFooter className="flex justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleViewed}
            className="text-xs p-1 h-auto"
          >
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
              className={`mr-1 ${isViewed ? "text-primary" : "text-muted-foreground"}`}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            {isViewed ? "Viewed" : "Mark Viewed"}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className="text-xs p-1 h-auto"
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
              className={`mr-1 ${isFavorite ? "text-primary" : "text-muted-foreground"}`}
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {isFavorite ? "Favorited" : "Favorite"}
          </Button>
        </HoverCardFooter>
      </HoverCard>
    </Link>
  );
}
