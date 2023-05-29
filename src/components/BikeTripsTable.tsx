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

  const bikeTripContent = content as unknown as BikeTrip[];

  console.log("whole content: " + JSON.stringify(content));
  const transformedData = bikeTripContent.map((item) => {
    if (item && item.distanceInMeters) {
    }
    const newItem = {
      ...item,
      "distance (km)": (item.distanceInMeters / 1000).toFixed(2),
      "duration (min)": Math.round(item.durationInSec / 60),
    };

    return newItem;
  });

  console.log("Transformed: " + JSON.stringify(transformedData));

  const title = "Bike Trips";

  return (
    <DynamicTable
      title={title}
      content={transformedData}
      columnOverride={[
        "departureStation",
        "returnStation",
        "departureTime",
        "returnTime",
        "distance (km)",
        "duration (min)",
      ]}
      defaultSortColumn={"departureTime"}
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
