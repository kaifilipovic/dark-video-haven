
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Update header styling on scroll
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/95 backdrop-blur-sm shadow-md" 
        : "bg-background"
    )}>
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold text-primary">
              VideoHaven
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <NavLink to="/">Videos</NavLink>
            <NavLink to="/actors">Actors</NavLink>
            <NavLink to="/import">Import</NavLink>
            <NavLink to="/job-status">Job Status</NavLink>
          </nav>

          {/* Mobile nav trigger */}
          <MobileNavTrigger />
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-foreground hover:text-primary transition-colors duration-200 text-sm font-medium fancy-link"
    >
      {children}
    </Link>
  );
}

function MobileNavTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(isOpen ? "hidden" : "block")}
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(isOpen ? "block" : "hidden")}
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border animate-fade-in z-50">
          <div className="container py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Videos
            </Link>
            <Link
              to="/actors"
              className="px-4 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Actors
            </Link>
            <Link
              to="/import"
              className="px-4 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Import
            </Link>
            <Link
              to="/job-status"
              className="px-4 py-2 hover:bg-secondary rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Job Status
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
