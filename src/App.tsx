import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";

import VideosPage from "./pages/VideosPage";
import ActorsPage from "./pages/ActorsPage";
import ActorDetailPage from "./pages/ActorDetailPage";
import VideoPage from "./pages/VideoPage";
import ImportPage from "./pages/ImportPage";
import JobStatusPage from "./pages/JobStatusPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Main pages */}
            <Route path="/" element={<VideosPage />} />
            <Route path="/actors" element={<ActorsPage />} />
            <Route path="/actor/:id" element={<ActorDetailPage />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/import" element={<ImportPage />} />
            <Route path="/job-status" element={<JobStatusPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
