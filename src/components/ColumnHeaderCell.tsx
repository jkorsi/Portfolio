import { CamelCaseToNormal } from "../tools/CamelCaseToNormal";
import bottomArrow from "../icons/arrow-bottom-icon.svg";
import topArrow from "../icons/arrow-top-icon.svg";
import sortArrow from "../icons/sort-result-icon.svg";

interface ColumnHeaderCellProps {
  column: string;
  handleSort: (column: string) => void;
  sortColumn: string;
  sortDirection: string;
}
export function ColumnHeaderCell(props: ColumnHeaderCellProps) {
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
