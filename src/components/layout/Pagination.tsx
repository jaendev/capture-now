import { MoveLeft, MoveRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8 px-4 pb-8">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-hover transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1"
      >
        <MoveLeft size={16} className="font-extrabold" />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {/* Show first page */}
        {currentPage > 2 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="w-10 h-10 rounded-lg bg-card border border-border hover:bg-hover transition-colors"
            >
              1
            </button>
            {currentPage > 3 && <span className="text-muted">...</span>}
          </>
        )}

        {/* Show current and adjacent pages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(page =>
            page === currentPage ||
            page === currentPage - 1 ||
            page === currentPage + 1
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg transition-colors ${currentPage === page
                ? 'bg-gradient-primary text-foreground font-semibold'
                : 'bg-card border border-border text-foreground hover:bg-hover cursor-pointer'
                }`}
            >
              {page}
            </button>
          ))}

        {/* Show last page */}
        {currentPage < totalPages - 1 && (
          <>
            {currentPage < totalPages - 2 && <span className="text-muted">...</span>}
            <button
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-lg bg-card border border-border hover:bg-hover transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-card border border-border rounded-lg text-foreground hover:bg-hover transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
      >
        Next
        <MoveRight size={16} className="font-extrabold" />
      </button>
    </div>
  );
}