import { useMemo } from "react";
import { CamelCaseToNormal } from "../tools/CamelCaseToNormal";

export function DynamicTable(props: {
  columns: string[];
  content: string[];
  columnFilter?: string[];
}) {
  const { content, columns, columnFilter } = props;

  const filteredColumns = useMemo(
    () => columns.filter((item) => !columnFilter?.includes(item)),
    [columns, columnFilter]
  );

  const formattedFilteredHeadings = useMemo(
    () => filteredColumns.map(CamelCaseToNormal),
    [filteredColumns]
  );

  return (
    <div className="overflow-x-auto border-2 shadow-md sm:rounded-xl">
      <table className="text-left table-auto whitespace-nowrap bg-neutral-100 bg-opacity-70">
        <ColumnMap formattedColumns={formattedFilteredHeadings} />
        <ContentMap content={content} columns={filteredColumns} />
      </table>
    </div>
  );
}

function ContentMap(props: { content: string[]; columns: string[] }) {
  const { content, columns } = props;

  return (
    <>
      <tbody>
        {content?.map((value, index) => (
          <tr className="hover:bg-gray-200 hover:text-black" key={index}>
            {columns?.map((key) => {
              return (
                <td className="p-4" key={key}>
                  {value[key as keyof typeof value]?.toString() ?? ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </>
  );
}

function ColumnMap(props: { formattedColumns: string[] }) {
  return (
    <>
      <thead>
        <tr>
          {props.formattedColumns?.map((column: string) => (
            <th className="p-4" key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}
