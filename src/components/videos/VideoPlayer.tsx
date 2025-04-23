
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatDuration } from "@/lib/formatters";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title: string;
}

export function VideoPlayer({ src, poster, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Set up listeners for video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    // Add event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    
    // Remove event listeners on cleanup
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);
  
  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);
  
  // Play/pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Seek functionality
  const handleSeek = (newProgress: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newTime = (newProgress[0] / 100) * video.duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(newProgress[0]);
  };
  
  // Volume control
  const handleVolumeChange = (newVolume: number[]) => {
    const video = videoRef.current;
    if (!video) return;
    
    const volValue = newVolume[0];
    video.volume = volValue;
    setVolume(volValue);
    
    // Update muted state based on volume
    if (volValue === 0) {
      video.muted = true;
    } else {
      video.muted = false;
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;
    
    if (!document.fullscreenElement) {
      player.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  return (
    <div 
      ref={playerRef}
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster}
        onClick={togglePlay}
        title={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Big play button when paused */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white opacity-90"
          >
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}
      
      {/* Controls overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress slider */}
        <div className="mb-3">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Play/pause button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={togglePlay}
              className="text-white hover:text-white hover:bg-white/20"
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </Button>
            
            {/* Volume control */}
            <div className="relative flex items-center">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowVolumeControl(!showVolumeControl)}
                onMouseEnter={() => setShowVolumeControl(true)}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {volume === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </Button>
              
              {showVolumeControl && (
                <div 
                  className="absolute left-10 bottom-0 w-24 h-8 bg-black/80 rounded-md flex items-center px-2"
                  onMouseLeave={() => setShowVolumeControl(false)}
                >
                  <Slider
                    value={[volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              )}
            </div>
            
            {/* Time display */}
            <div className="text-white text-xs">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </div>
          </div>
          
          <div>
            {/* Fullscreen toggle */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleFullscreen}
              className="text-white hover:text-white hover:bg-white/20"
            >
              {isFullscreen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8V5a2 2 0 0 1 2-2h3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
