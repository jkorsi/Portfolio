import { useState, useEffect } from "react";

export function DynamicTable(props: { headings: string[]; content: string[] }) {
  const headings = props.headings;
  const content = props.content;

  const [formattedHeadings, setFormattedHeadings] = useState<string[]>([]);

  useEffect(() => {
    const headings = props.headings;

    const newHeadings = headings.map((rawHeading) => formatHeading(rawHeading));

    setFormattedHeadings(newHeadings);
  }, [props.headings]);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border-2 border-slate-400 bg-neutral-100 bg-opacity-70">
        <thead>
          <tr>
            {formattedHeadings?.map((heading: string) => {
              return (
                <th className="p-3 border-2 border-slate-400" key={heading}>
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {content?.map((row, index: number) => {
            return (
              <tr className="border-2 border-slate-400" key={index}>
                {headings?.map((key) => {
                  return (
                    <td
                      className="p-3 text-left border-2 border-slate-400"
                      key={key}
                    >
                      {row[key as keyof typeof row]?.toString() ?? ""}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function formatHeading(key: string): string {
  // Example usage
  //const headings = Object.keys(data).map((key) => formatHeading(key));

  // Split the key by camel case
  const words = key.split(/(?=[A-Z])/);

  // Join the words with a space and convert to title case
  const formattedHeading = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedHeading;
}
