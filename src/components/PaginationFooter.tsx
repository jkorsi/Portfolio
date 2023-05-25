import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (value: number) => void;
}

const PaginationFooter: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  handlePageChange,
  handleItemsPerPageChange,
}) => {
  const pageRange = 2; // Number of pages to show before and after the current page
  const lastPage = totalPages - 1;

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    if (currentPage !== 0) {
      handlePageChange(0);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== lastPage) {
      handlePageChange(lastPage);
    }
  };

  const handlePageSelect = (page: number) => {
    if (page !== currentPage) {
      handlePageChange(page);
    }
  };

  const handleItemCalcsForEachPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(e.target.value);
    console.log(value);
    handleItemsPerPageChange(value);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = currentPage - pageRange; i <= currentPage + pageRange; i++) {
      if (i >= 0 && i < totalPages) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center space-x-2">
        <button
          className="px-2 py-1 rounded border hover:bg-gray-200"
          onClick={handleFirstPage}
        >
          First
        </button>
        <button
          className="px-2 py-1 rounded border hover:bg-gray-200"
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            className={`px-2 py-1 rounded border ${
              currentPage === page ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-2 py-1 rounded border hover:bg-gray-200"
          onClick={handleNextPage}
        >
          Next
        </button>
        <button
          className="px-2 py-1 rounded border hover:bg-gray-200"
          onClick={handleLastPage}
        >
          Last
        </button>
      </div>
      <div>
        <span>Items per Page:</span>
        <select
          value={itemsPerPage}
          onChange={handleItemCalcsForEachPageChange}
          className="px-2 py-1 ml-2 border rounded"
        >
          <option value={3}>3</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationFooter;
