interface PaginationProps {
  currentPage: number
  totalProducts: number
  productsPerPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalProducts, productsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalProducts / productsPerPage)

  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center space-x-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition-colors ${
            currentPage === page
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  )
}

