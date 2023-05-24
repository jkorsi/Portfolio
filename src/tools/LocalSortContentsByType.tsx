/*
Use this for sorting small datasets locally
*/

export function LocalSortContentsByType<T>(
  sortedData: T[],
  sortColumn: string,
  sortDirection: string
) {
  sortedData.sort((a, b) => {
    const valueA = a[sortColumn as keyof T];
    const valueB = b[sortColumn as keyof T];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortDirection === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return sortDirection === "asc"
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    }
    return 0;
  });
}
