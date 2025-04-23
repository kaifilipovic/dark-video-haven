
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface ImportFormProps {
  onSubmit: (formData: ImportFormData) => void;
}

export interface ImportFormData {
  date: Date | undefined;
  importMode: string;
  minDuration: number;
  maxPages: number;
}

export function ImportForm({ onSubmit }: ImportFormProps) {
  const [date, setDate] = useState<Date>();
  const [importMode, setImportMode] = useState("standard");
  const [minDuration, setMinDuration] = useState(60);
  const [maxPages, setMaxPages] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    // Prepare form data
    const formData: ImportFormData = {
      date,
      importMode,
      minDuration,
      maxPages
    };
    
    // Submit form data
    onSubmit(formData);
    
    // In a real application, we'd wait for the response before resetting isSubmitting
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Import Videos</CardTitle>
        <CardDescription>
          Configure import parameters for video fetching
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Date selector */}
          <div className="space-y-2">
            <Label htmlFor="date">Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
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
                    className="mr-2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Leave empty to import latest videos
            </p>
          </div>
          
          {/* Import mode */}
          <div className="space-y-2">
            <Label htmlFor="import-mode">Import Mode</Label>
            <Select
              value={importMode}
              onValueChange={setImportMode}
            >
              <SelectTrigger id="import-mode">
                <SelectValue placeholder="Select import mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="fast">Fast (Metadata only)</SelectItem>
                <SelectItem value="full">Full (With downloads)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Min duration */}
          <div className="space-y-2">
            <Label htmlFor="min-duration">Minimum Duration (seconds)</Label>
            <Input
              id="min-duration"
              type="number"
              min="0"
              value={minDuration}
              onChange={(e) => setMinDuration(parseInt(e.target.value) || 0)}
            />
            <p className="text-xs text-muted-foreground">
              Videos shorter than this will be ignored
            </p>
          </div>
          
          {/* Max pages */}
          <div className="space-y-2">
            <Label htmlFor="max-pages">Maximum Pages</Label>
            <Input
              id="max-pages"
              type="number"
              min="1"
              max="50"
              value={maxPages}
              onChange={(e) => setMaxPages(parseInt(e.target.value) || 1)}
            />
            <p className="text-xs text-muted-foreground">
              Number of pages to fetch (1-50)
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Start Import"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
