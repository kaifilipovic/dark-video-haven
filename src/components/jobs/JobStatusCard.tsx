
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface JobStatusCardProps {
  id: string;
  type: string;
  status: "running" | "completed" | "failed" | "pending";
  progress: number;
  startTime: string;
  message?: string;
  error?: string;
  onStop: (id: string) => void;
  onDelete: (id: string) => void;
}

export function JobStatusCard({
  id,
  type,
  status,
  progress,
  startTime,
  message,
  error,
  onStop,
  onDelete
}: JobStatusCardProps) {
  // State for the elapsed time display
  const [elapsedTime, setElapsedTime] = useState("");
  
  // Calculate and update elapsed time
  useEffect(() => {
    if (status === "running") {
      const interval = setInterval(() => {
        const start = new Date(startTime).getTime();
        const now = new Date().getTime();
        const elapsed = Math.floor((now - start) / 1000); // elapsed time in seconds
        
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;
        
        let timeString = "";
        if (hours > 0) timeString += `${hours}h `;
        if (minutes > 0 || hours > 0) timeString += `${minutes}m `;
        timeString += `${seconds}s`;
        
        setElapsedTime(timeString);
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      // For non-running jobs, just calculate once
      const start = new Date(startTime).getTime();
      const now = new Date().getTime();
      const elapsed = Math.floor((now - start) / 1000);
      
      const hours = Math.floor(elapsed / 3600);
      const minutes = Math.floor((elapsed % 3600) / 60);
      const seconds = elapsed % 60;
      
      let timeString = "";
      if (hours > 0) timeString += `${hours}h `;
      if (minutes > 0 || hours > 0) timeString += `${minutes}m `;
      timeString += `${seconds}s`;
      
      setElapsedTime(timeString);
    }
  }, [startTime, status]);

  // Status badge color mapping
  const statusColor = {
    running: "bg-blue-500",
    completed: "bg-green-500",
    failed: "bg-red-500",
    pending: "bg-yellow-500"
  };

  return (
    <Card className={`mb-4 overflow-hidden ${status === "failed" ? "border-red-500" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {type} Job
              <Badge className={statusColor[status]}>{status}</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">ID: {id}</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div>Started: {new Date(startTime).toLocaleString()}</div>
            <div>Elapsed: {elapsedTime}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Progress bar for running jobs */}
        {status === "running" && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {/* Current message if available */}
        {message && (
          <div className="mt-4 p-2 bg-secondary/50 rounded text-sm">
            <p className="font-mono">{message}</p>
          </div>
        )}
        
        {/* Error message if failed */}
        {error && (
          <div className="mt-4 p-2 bg-red-900/20 border border-red-500/50 rounded text-sm text-red-300">
            <p className="font-mono">{error}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end gap-2">
        {/* Show stop button only for running or pending jobs */}
        {(status === "running" || status === "pending") && (
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onStop(id)}
          >
            Stop Job
          </Button>
        )}
        
        {/* Always show delete button */}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
