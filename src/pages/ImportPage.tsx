
import { useState } from "react";
import { ImportForm, ImportFormData } from "@/components/import/ImportForm";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

export default function ImportPage() {
  const [isImporting, setIsImporting] = useState(false);
  
  // Handle form submission
  const handleSubmit = (formData: ImportFormData) => {
    setIsImporting(true);
    
    console.log("Import data:", formData);
    
    // In a real app, this would be an API call
    // Simulating API call with timeout
    setTimeout(() => {
      setIsImporting(false);
      
      // Show success toast
      toast({
        title: "Import job started",
        description: "Your video import job has been added to the queue.",
        action: (
          <Link 
            to="/job-status" 
            className="bg-primary text-white px-3 py-1 rounded-md text-xs"
          >
            View Status
          </Link>
        ),
      });
    }, 1500);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Import Videos</h1>
      
      <div className="bg-card p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Import Guidelines</h2>
        
        <div className="space-y-4">
          <p>
            Use this form to import videos into your library. Configure the parameters below to customize the import process.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-medium">Import Modes:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><span className="font-medium">Standard:</span> Balance between speed and metadata quality</li>
              <li><span className="font-medium">Detailed:</span> Gather extensive metadata (slower)</li>
              <li><span className="font-medium">Fast:</span> Basic metadata only (faster)</li>
              <li><span className="font-medium">Full:</span> Download videos in addition to metadata</li>
            </ul>
          </div>
          
          <div className="bg-secondary/50 p-3 rounded-md">
            <p className="text-sm flex items-start">
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
                className="mr-2 mt-0.5 text-primary"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              Once started, import jobs will continue in the background. You can monitor their progress on the Job Status page.
            </p>
          </div>
        </div>
      </div>
      
      <ImportForm onSubmit={handleSubmit} />
      
      {isImporting && (
        <div className="mt-6 text-center text-muted-foreground animate-pulse">
          Processing your request...
        </div>
      )}
    </div>
  );
}
