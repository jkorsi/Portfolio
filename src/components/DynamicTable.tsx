import { useMemo, useState, useEffect } from "react";

import { LocalSortContentsByType } from "../tools/LocalSortContentsByType";
import { ColumnMap, ContentMap } from "./TableDataMapping";
import fetch from "cross-fetch";

interface DynamicTableProps {
  fetchUrl: string;
  columnFilter?: string[];
}

export function DynamicTable(props: DynamicTableProps) {
  const { fetchUrl, columnFilter } = props;

  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const [content, setContent] = useState<string[]>();
  const [columns, setColumns] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(fetchUrl);

      const jsonResponse = (await data.json()) as string[];
      console.log("Data: " + JSON.stringify(jsonResponse));
      console.log("keys: " + Object.keys(jsonResponse[0]));

      setContent(jsonResponse);

      setColumns(Object.keys(jsonResponse[0]));
      console.log("cols: " + columns);
    };

    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    console.log("Columns: " + columns);
  }, [columns]);

  const filteredColumns = useMemo(
    () => columns?.filter((item) => !columnFilter?.includes(item)) || [],
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
    //Content is sorted when there's change to content/sortColumn/sortDirection
    let sortedData: string[] = [""];

    if (content) {
      sortedData = [...content];
      LocalSortContentsByType(sortedData, sortColumn, sortDirection);
    }
    console.log("Sorted data:" + sortedData);

    return sortedData;
  }, [content, sortColumn, sortDirection]);

  if (!columns || !content) {
    console.log("Nothing to show");
    //TODO: Could try to prevent content shift
    return <div></div>;
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
        <ContentMap content={sortedContent} columns={filteredColumns} />
      </table>
    </div>
  );
}
