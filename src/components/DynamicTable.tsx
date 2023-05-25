import { useMemo, useState, useEffect } from "react";
import { LocalSortContentsByType } from "../tools/LocalSortContentsByType";
import { TableDataMap } from "./TableDataMapping";
import PaginationFooter from "./PaginationFooter";
import useSortData from "./hooks/useSortData";
import SearchInput from "./TableSearchInput";

interface DynamicTableProps {
  content: any[];
  columnFilter?: string[];
  defaultSortColumn: string;
  currentPage: number;
  itemsPerPage: number;
  handlePageChange: (page: number) => void;
  handleItemsPerPageChange: (value: number) => void;
  totalPages: number;
  handleSortChange: (column: string, direction: string) => void;
  handleSearchKeywordChange: (keyword: string) => void;
}

export function DynamicTable(props: DynamicTableProps) {
  const {
    content,
    columnFilter,
    defaultSortColumn,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    totalPages,
    handleSortChange,
    handleSearchKeywordChange,
  } = props;

  const { sortColumn, sortDirection, handleSort } = useSortData({
    defaultSortColumn,
  });

  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (content && content.length > 0) {
      let sortedData = [...content];
      LocalSortContentsByType(sortedData, sortColumn, sortDirection);
      setColumns(Object.keys(content[0]));
    }
  }, [sortColumn, sortDirection, content]);

  useEffect(() => {
    handleSortChange(sortColumn, sortDirection);
  }, [sortColumn, sortDirection, handleSortChange]);

  const filteredColumns = useMemo(
    () => columns?.filter((item) => !columnFilter?.includes(item)) || [],
    [columns, columnFilter]
  );

  return (
    <div className="overflow-x-auto border-2 shadow-md sm:rounded-xl">
      <SearchInput handleSearchKeywordChange={handleSearchKeywordChange} />
      <TableDataMap
        formattedColumns={filteredColumns}
        handleSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        content={content}
        columns={filteredColumns}
      />
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
