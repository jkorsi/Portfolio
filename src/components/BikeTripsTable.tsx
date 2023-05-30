import useFetchData from "./hooks/useFetchData";
import { DynamicTable } from "./DynamicTable/DynamicTable";

//TODO: Refactor to make use of useContext to limit propertydrill
export const BikeTripsTable = () => {
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
    initialPageSize: 10,
    initialOrderBy: "departureTime",
    initialOrderDir: "asc",
    apiUrl: "http://localhost:8080/api/biketrips",
  });

  const title = "Bike Trips";

  const filterArray = ["distanceInMeters", "durationInSec"];

  return (
    <DynamicTable
      title={title}
      content={content}
      defaultSortColumn={"departureTime"}
      columnFilter={filterArray}
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
