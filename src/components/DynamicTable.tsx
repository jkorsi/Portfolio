import { useMemo, useState } from "react";
import { CamelCaseToNormal } from "../tools/CamelCaseToNormal";

import bottomArrow from "../icons/arrow-bottom-icon.svg";
import topArrow from "../icons/arrow-top-icon.svg";
import sortArrow from "../icons/sort-result-icon.svg";

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

interface ContentMapProps<T> {
  content: T[];
  columns: string[];
}

function SortContentsByType<T>(
  sortedData: T[],
  sortColumn: string,
  sortDirection: string
) {
  sortedData.sort((a, b) => {
    const valueA = a[sortColumn as keyof T];
    const valueB = b[sortColumn as keyof T];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return sortDirection === "asc"
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    }
    return 0;
  });
}

function ContentMap<T>(props: ContentMapProps<T>) {
  const { content, columns } = props;

  return (
    <>
      <tbody>
        {content?.map((rowValue, index) => (
          <tr className="hover:bg-gray-200 hover:text-black" key={index}>
            {columns?.map((key) => {
              return (
                <td className="p-4" key={key}>
                  {rowValue[key as keyof typeof rowValue]?.toString() ?? ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </>
  );
}

function ColumnMap(props: {
  formattedColumns: string[];
  handleSort: (column: string) => void;
  sortColumn: string;
  sortDirection: string;
}) {
  const { formattedColumns, handleSort, sortColumn, sortDirection } = props;

  const handleClick = (column: string) => {
    handleSort(column);
  };
  return (
    <>
      <thead>
        <tr>
          {formattedColumns?.map((column: string) => (
            <ColumnHeaderCell
              key={column}
              column={column}
              handleSort={handleClick}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
            />
          ))}
        </tr>
      </thead>
    </>
  );
}

interface ColumnHeaderCellProps {
  column: string;
  handleSort: (column: string) => void;
  sortColumn: string;
  sortDirection: string;
}

function ColumnHeaderCell(props: ColumnHeaderCellProps) {
  const { column, handleSort, sortColumn, sortDirection } = props;

  const isSorting = column == sortColumn;
  const sortAscending = isSorting && sortDirection == "asc";
  const sortDescending = isSorting && sortDirection == "desc";

  const handleClick = () => {
    handleSort(column);
  };

  const formattedColumnName = CamelCaseToNormal(column);

  return (
    <th className="p-4 w-32 relative" onClick={handleClick}>
      <div className="flex items-center">
        {formattedColumnName}
        {sortAscending && (
          <img
            src={topArrow}
            alt="Ascending"
            className="inline-block p-2 sort-icon w-7"
          />
        )}
        {sortDescending && (
          <img
            src={bottomArrow}
            alt="Descending"
            className="inline-block p-2 sort-icon w-7"
          />
        )}
        {!sortAscending && !sortDescending && (
          <img
            src={sortArrow}
            alt="Sort"
            className="opacity-10 inline-block p-2 sort-icon w-7"
          />
        )}
      </div>
    </th>
  );
}
