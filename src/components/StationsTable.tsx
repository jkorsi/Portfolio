import useFetchData from "./hooks/useFetchData";
import { DynamicTable } from "./DynamicTable/DynamicTable";

//TODO: Refactor to make use of useContext to limit propertydrill
export const StationsTable = () => {
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
    initialPageSize: 5,
    initialOrderBy: "stationName",
    initialOrderDir: "asc",
    apiUrl: "http://localhost:8080/api/stations",
  });

  const title = "Bike Stations";
  const columnFilter = ["fid", "stationLocationX", "stationLocationY"];
  //const extraCol = ["noSort show"];

  return (
    <DynamicTable
      title={title}
      content={content}
      columnFilter={columnFilter}
      //extraColumns={extraCol}
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
