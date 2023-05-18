import { useState } from "react";

export function DynamicTable(headings: string[], content: string[]) {
  return (
    <>
      <table>
        <thead>
          <tr>
            {headings?.map((heading) => {
              return (
                <th className="px-2" key={heading}>
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {content?.map((row, index: number) => {
            return (
              <tr key={index}>
                {headings?.map((key) => {
                  return (
                    <td key={row[key as keyof typeof row].toString()}>
                      {row[key as keyof typeof row].toString()}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
