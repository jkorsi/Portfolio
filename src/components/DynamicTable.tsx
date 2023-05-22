import { useMemo } from "react";
import { CamelCaseToNormal } from "../tools/CamelCaseToNormal";

export function DynamicTable(props: {
  headings: string[];
  content: string[];
  columnFilter?: string[];
}) {
  const { content, headings, columnFilter } = props;

  const filteredHeadings = useMemo(
    () => headings.filter((item) => !columnFilter?.includes(item)),
    [headings, columnFilter]
  );

  const formattedFilteredHeadings = useMemo(
    () => filteredHeadings.map(CamelCaseToNormal),
    [filteredHeadings]
  );

  return (
    <div className="overflow-x-auto border-2 shadow-md sm:rounded-xl">
      <table className="text-left table-auto whitespace-nowrap bg-neutral-100 bg-opacity-70">
        <HeadingMap formattedHeadings={formattedFilteredHeadings} />
        <ContentMap content={content} headings={filteredHeadings} />
      </table>
    </div>
  );
}

function ContentMap(props: { content: string[]; headings: string[] }) {
  const { content, headings } = props;

  return (
    <>
      <tbody>
        {content?.map((value, index) => (
          <tr className="hover:bg-gray-200 hover:text-black" key={index}>
            {headings?.map((key) => {
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

function HeadingMap(props: { formattedHeadings: string[] }) {
  return (
    <>
      <thead>
        <tr>
          {props.formattedHeadings?.map((heading: string) => (
            <th className="p-4" key={heading}>
              {heading}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}
