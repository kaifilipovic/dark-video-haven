
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardFooter, HoverCardHeader, HoverCardTitle } from "@/components/ui/card-with-hover";

interface ActorCardProps {
  id: string;
  name: string;
  image: string;
  videosCount: number;
  favorite: boolean;
}

export function ActorCard({ id, name, image, videosCount, favorite }: ActorCardProps) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    // API call would go here
  };

  return (
    <Link to={`/actor/${id}`}>
      <HoverCard className="overflow-hidden h-full">
        <div className="relative">
          <img
            src={image || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop"}
            alt={name}
            className="w-full h-56 object-cover"
          />
          
          {/* Favorite indicator */}
          {isFavorite && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-primary text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
            </div>
          )}
        </div>
        
        <HoverCardHeader>
          <HoverCardTitle className="text-xl">{name}</HoverCardTitle>
        </HoverCardHeader>
        
        <HoverCardContent className="py-0">
          <p className="text-sm text-muted-foreground">
            {videosCount} {videosCount === 1 ? "video" : "videos"}
          </p>
        </HoverCardContent>
        
        <HoverCardFooter>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className="ml-auto"
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
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        </HoverCardFooter>
      </HoverCard>
    </Link>
  );
}
