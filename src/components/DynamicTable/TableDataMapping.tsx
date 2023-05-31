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
  columns: string[];
  handleSort: (column: string) => void;
  sortColumn: string;
  sortDirection: string;
}) {
  const { columns, handleSort, sortColumn, sortDirection } = props;

  const handleClick = (column: string) => {
    handleSort(column);
  };
  return (
    <>
      <thead className="border-b-4">
        <tr>
          {columns?.map((column: string) => (
            <ColumnHeaderCell
              key={column}
              columnProp={column}
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

export function TableDataMap<T>(props: {
  handleSort: (column: string) => void;
  sortColumn: string;
  sortDirection: string;
  content: T[];
  columns: string[];
}) {
  const { handleSort, sortColumn, sortDirection, content, columns } = props;

  if (!columns || content.length === 0) {
    return (
      <div className="text-center	w-full">
        <h2 className="p-20 text-3xl">No Data Found</h2>
      </div>
    );
  }
  return (
    <table className="text-left table-auto whitespace-nowrap bg-neutral-100 bg-opacity-70">
      <ColumnMap
        columns={columns}
        handleSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
      <ContentMap content={content} columns={columns} />
    </table>
  );
}
