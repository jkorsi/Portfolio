import React from "react";
import firstIcon from "../../icons/pagination-icons/arrow-end-left-icon.svg";
import lastIcon from "../../icons/pagination-icons/arrow-end-right-icon.svg";
import previousIcon from "../../icons/pagination-icons/line-angle-left-icon.svg";
import nextIcon from "../../icons/pagination-icons/line-angle-right-icon.svg";

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
        <button className="p-0 rounded w-7 h-7" onClick={handleFirstPage}>
          <img
            src={firstIcon}
            alt="First Page"
            className="px-2 py-1 rounded  hover:bg-gray-200 inline-block w-7 h-7"
          />
        </button>
        <button className="p-0 rounded w-7 h-7" onClick={handlePreviousPage}>
          <img
            src={previousIcon}
            alt="Previous Page"
            className="px-2 py-1 rounded  hover:bg-gray-200 inline-block w-7 h-6"
          />
        </button>
        {generatePageNumbers().map((page) => (
          <button
            key={page}
            className={`px-2 py-1 rounded border  ${
              currentPage === page ? "bg-gray-200" : "hover:bg-gray-200"
            }`}
            onClick={() => handlePageSelect(page)}
          >
            {page}
          </button>
        ))}
        <button className="p-0 rounded w-7 h-7" onClick={handleNextPage}>
          <img
            src={nextIcon}
            alt="Next Page"
            className="px-2 py-1 rounded hover:bg-gray-200 inline-block w-7 h-6"
          />
        </button>
        <button onClick={handleLastPage} className="p-0 rounded w-7 h-7">
          <img
            src={lastIcon}
            alt="Last Page"
            className="px-2 py-1 rounded hover:bg-gray-200 inline-block w-7 h-7"
          />
        </button>
      </div>
      <div>
        <span>Items per Page:</span>
        <select
          value={itemsPerPage}
          onChange={handleItemCalcsForEachPageChange}
          className="px-2 py-1 ml-2 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default PaginationFooter;
