import useFetchData from "./hooks/useFetchData";
import { DynamicTable } from "./DynamicTable";

export const Stations = () => {
  const {
    content,
    totalPages,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    handleSortChange,
    handleSearchKeywordChange,
  } = useFetchData({
    initialPage: 0,
    initialPageSize: 3,
    initialOrderBy: "stationName",
    initialOrderDir: "asc",
    apiUrl: "http://localhost:8080/api/stations",
  });

  const title = "Bike Stations";
  const columnFilter = ["fid", "stationLocationX", "stationLocationY"];

  return (
    <DynamicTable
      title={title}
      content={content}
      columnFilter={columnFilter}
      defaultSortColumn={"stationName"}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      handlePageChange={handlePageChange}
      handleItemsPerPageChange={handleItemsPerPageChange}
      totalPages={totalPages}
      handleSortChange={handleSortChange}
      handleSearchKeywordChange={handleSearchKeywordChange}
    />
  );
};
