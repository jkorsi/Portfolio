import { render, screen, fireEvent } from "@testing-library/react";
import { DynamicTable } from "../components/DynamicTable/DynamicTable";

describe("DynamicTable component", () => {
  const mockProps = {
    title: "Test table",
    content: [
      {
        column1: "value1",
        column2: "value2",
      },
    ],
    columnFilter: [],
    defaultSortColumn: "column1",
    currentPage: 1,
    itemsPerPage: 1,
    handlePageChange: jest.fn(),
    handleItemsPerPageChange: jest.fn(),
    totalPages: 1,
    handleSortChange: jest.fn(),
    handleSearchKeywordChange: jest.fn(),
  };

  it("renders correctly with non-empty content", () => {
    render(<DynamicTable {...mockProps} />);

    expect(screen.getByText("value1")).toBeInTheDocument();
    expect(screen.getByText("value2")).toBeInTheDocument();
  });

  it("renders correctly with empty content", () => {
    render(<DynamicTable {...mockProps} content={[]} />);

    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  it("properly handles sorting", () => {
    render(<DynamicTable {...mockProps} />);

    // Mock the click on a sortable column
    fireEvent.click(screen.getByText("Column 1"));

    // Check if sorting function was called
    expect(mockProps.handleSortChange).toHaveBeenCalledWith("column1", "asc");
  });
});
