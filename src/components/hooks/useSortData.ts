import { useState } from "react";

interface UseSortDataProps {
  defaultSortColumn: string;
}

const useSortData = ({ defaultSortColumn }: UseSortDataProps) => {
  const [sortColumn, setSortColumn] = useState<string>(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return {
    sortColumn,
    sortDirection,
    handleSort,
  };
};

export default useSortData;
