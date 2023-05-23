import { useMemo, useState } from "react";

import { SortContentsByType } from "../tools/SortContentsByType";
import { ColumnMap, ContentMap } from "./TableDataMapping";

interface DynamicTableProps<T> {
  columns: string[];
  content: T[];
  columnFilter?: string[];
}

export function DynamicTable<T>(props: DynamicTableProps<T>) {
  const { content, columns, columnFilter } = props;

  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const filteredColumns = useMemo(
    () => columns.filter((item) => !columnFilter?.includes(item)),
    [columns, columnFilter]
  );

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedContent = useMemo(() => {
    const sortedData = [...content];

    SortContentsByType<T>(sortedData, sortColumn, sortDirection);

    return sortedData;
  }, [content, sortColumn, sortDirection]);

  return (
    <div className="overflow-x-auto border-2 shadow-md sm:rounded-xl">
      <table className="text-left table-auto whitespace-nowrap bg-neutral-100 bg-opacity-70">
        <ColumnMap
          formattedColumns={filteredColumns}
          handleSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
        <ContentMap content={sortedContent} columns={filteredColumns} />
      </table>
    </div>
  );
}
