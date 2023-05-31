import { CamelCaseToNormal } from "../../tools/CamelCaseToNormal";
import bottomArrow from "../../icons/arrow-bottom-icon.svg";
import topArrow from "../../icons/arrow-top-icon.svg";
import sortArrow from "../../icons/sort-result-icon.svg";

interface ColumnHeaderCellProps {
  columnProp: string;
  handleSort: (column: string) => void;
  sortColumn: string;
  sortDirection: string;
}
export function ColumnHeaderCell(props: ColumnHeaderCellProps) {
  const { columnProp, handleSort, sortColumn, sortDirection } = props;

  let column: string;

  const noSort = checkNoSort(columnProp);

  if (noSort) {
    column = parseNoSort(columnProp);
  } else {
    column = columnProp;
  }

  const isSorting = column == sortColumn;
  const sortAscending = isSorting && sortDirection == "asc";
  const sortDescending = isSorting && sortDirection == "desc";

  const handleClick = () => {
    handleSort(column);
  };

  const formattedColumnName = CamelCaseToNormal(column);

  if (noSort) {
    return (
      <th className="p-4 w-32 relative">
        <div className="flex items-center">{formattedColumnName}</div>
      </th>
    );
  }

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

function parseNoSort(str: string) {
  const parts = str.split(" ");
  for (let part of parts) {
    if (part !== "noSort") {
      return part;
    }
  }
  return str;
}

function checkNoSort(str: string): boolean {
  return str.includes("noSort") ? true : false;
}
