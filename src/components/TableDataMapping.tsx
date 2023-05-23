import { ColumnHeaderCell } from "./ColumnHeaderCell";

interface ContentMapProps<T> {
  content: T[];
  columns: string[];
}
export function ContentMap<T>(props: ContentMapProps<T>) {
  const { content, columns } = props;

  return (
    <>
      <tbody>
        {content?.map((rowValue, index) => (
          <tr className="hover:bg-gray-200 hover:text-black" key={index}>
            {columns?.map((key) => {
              return (
                <td className="p-4" key={key}>
                  {rowValue[key as keyof typeof rowValue]?.toString()}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </>
  );
}

export function ColumnMap(props: {
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
