// Used when there are many products.

// Example:

// <  1  2  3  4  5  >
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex justify-center gap-2" aria-label="Pagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-9 w-9 rounded-lg text-sm font-medium ${
              currentPage === page
                ? "bg-purple-600 text-white"
                : "border border-gray-300 bg-white text-gray-700 hover:border-purple-600 hover:text-purple-600"
            }`}
          >
            {page}
          </button>
        )
      )}
    </nav>
  );
}