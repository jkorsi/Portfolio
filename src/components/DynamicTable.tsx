import { useMemo, useState, useEffect } from "react";
import { LocalSortContentsByType } from "../tools/LocalSortContentsByType";
import { ColumnMap, ContentMap } from "./TableDataMapping";
import PaginationFooter from "./PaginationFooter";
import useSortData from "./hooks/useSortData";

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

  if (!columns || content.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto border-2 shadow-md sm:rounded-xl">
      <table className="text-left table-auto whitespace-nowrap bg-neutral-100 bg-opacity-70">
        <ColumnMap
          formattedColumns={filteredColumns}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <ContentMap content={content} columns={filteredColumns} />
      </table>
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
