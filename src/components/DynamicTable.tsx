export function DynamicTable(headings: string[], content: string[]) {
  return (
    <>
      <table className="table-auto border-collapse border-2 border-slate-400 bg-neutral-100 bg-opacity-70">
        <thead>
          <tr>
            {headings?.map((heading) => {
              return (
                <th className="border-2 border-slate-400" key={heading}>
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
                      className="border-2 border-slate-400"
                      key={row[key as keyof typeof row].toString()}
                    >
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
