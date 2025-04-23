
import { useState, useEffect } from "react";
import { JobStatusCard } from "@/components/jobs/JobStatusCard";

// Mocked data types
interface Job {
  id: string;
  type: string;
  status: "running" | "completed" | "failed" | "pending";
  progress: number;
  startTime: string;
  message?: string;
  error?: string;
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: "job-1",
    type: "Import",
    status: "running",
    progress: 45,
    startTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    message: "Fetching video metadata for page 2/5..."
  },
  {
    id: "job-2",
    type: "Download",
    status: "completed",
    progress: 100,
    startTime: new Date(Date.now() - 1000 * 60 * 15).toISOString()
  },
  {
    id: "job-3",
    type: "Analysis",
    status: "pending",
    progress: 0,
    startTime: new Date(Date.now() - 1000 * 30).toISOString(),
    message: "Waiting for resources..."
  },
  {
    id: "job-4",
    type: "Import",
    status: "failed",
    progress: 27,
    startTime: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    error: "Connection timeout after 30 seconds. The remote server is not responding."
  }
];

export default function JobStatusPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  // Initialize SSE connection
  useEffect(() => {
    // In a real app, this would connect to the server's event stream
    // For demo purposes, we'll just use the mock data
    setJobs(mockJobs);
    
    // Simulate SSE by updating progress of running jobs
    const interval = setInterval(() => {
      setJobs(prev => 
        prev.map(job => {
          if (job.status === "running") {
            const newProgress = Math.min(job.progress + Math.random() * 5, 100);
            return {
              ...job,
              progress: newProgress,
              // If job completes
              ...(newProgress >= 100 ? { status: "completed" as const } : {})
            };
          }
          return job;
        })
      );
    }, 3000);
    
    setIsConnected(true);
    
    // Cleanup
    return () => {
      clearInterval(interval);
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);
  
  // Handle stopping a job
  const handleStopJob = (id: string) => {
    console.log(`Stopping job ${id}`);
    
    // In a real app, this would send a request to the server
    // For demo purposes, we'll just update the local state
    setJobs(prev => 
      prev.map(job => {
        if (job.id === id) {
          return {
            ...job,
            status: "failed",
            message: "Stopped by user",
            error: "Job was manually stopped"
          };
        }
        return job;
      })
    );
  };
  
  // Handle deleting a job
  const handleDeleteJob = (id: string) => {
    console.log(`Deleting job ${id}`);
    
    // In a real app, this would send a request to the server
    // For demo purposes, we'll just remove it from the local state
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Job Status</h1>
        
        {/* Connection status indicator */}
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mr-2">Event stream:</span>
          <span className={`inline-block w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="ml-2 text-sm">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>
      
      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg">
          <p className="text-lg text-muted-foreground mb-2">No active jobs</p>
          <p className="text-sm text-muted-foreground">
            Start an import job to see status updates here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobStatusCard
              key={job.id}
              id={job.id}
              type={job.type}
              status={job.status}
              progress={job.progress}
              startTime={job.startTime}
              message={job.message}
              error={job.error}
              onStop={handleStopJob}
              onDelete={handleDeleteJob}
            />
          ))}
        </div>
      )}
      
      <div className="bg-secondary/50 p-4 rounded-lg mt-8">
        <h2 className="font-semibold mb-2">About Job Status</h2>
        <p className="text-sm text-muted-foreground">
          This page uses server-sent events (SSE) to provide real-time updates on background jobs. 
          Running jobs will automatically update their progress without needing to refresh the page.
        </p>
      </div>
    </div>
  );
}
