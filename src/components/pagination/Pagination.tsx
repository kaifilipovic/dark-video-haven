
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Calculate range around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    
    // Always include last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Add ellipsis indicators
    const result = [];
    let prev = 0;
    
    for (const page of pages) {
      if (page - prev > 1) {
        result.push(-prev); // Negative indicates ellipsis after this number
      }
      result.push(page);
      prev = page;
    }
    
    return result;
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
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
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span className="sr-only">Previous</span>
        </Button>
        
        {/* Page numbers */}
        {pageNumbers.map((pageNum, index) => {
          if (pageNum < 0) {
            // It's an ellipsis indicator
            return (
              <span key={`ellipsis-${index}`} className="px-2">
                ...
              </span>
            );
          }
          
          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}
        
        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
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
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
