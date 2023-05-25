import { render, fireEvent } from "@testing-library/react";
import PaginationFooter from "../components/PaginationFooter";

describe("PaginationFooter", () => {
  const mockHandlePageChange = jest.fn();
  const mockHandleItemsPerPageChange = jest.fn();

  const mockProps = {
    currentPage: 2,
    totalPages: 5,
    itemsPerPage: 10,
    handlePageChange: mockHandlePageChange,
    handleItemsPerPageChange: mockHandleItemsPerPageChange,
  };

  it("renders correctly", () => {
    const { asFragment } = render(<PaginationFooter {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("calls handlePageChange with the correct value when previous button is clicked", () => {
    const { getByText } = render(<PaginationFooter {...mockProps} />);
    const previousButton = getByText("Previous");
    fireEvent.click(previousButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(1);
  });

  it("calls handlePageChange with the correct value when next button is clicked", () => {
    const { getByText } = render(<PaginationFooter {...mockProps} />);
    const nextButton = getByText("Next");
    fireEvent.click(nextButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(3);
  });

  it("calls handlePageChange with the correct value when first button is clicked", () => {
    const { getByText } = render(<PaginationFooter {...mockProps} />);
    const firstButton = getByText("First");
    fireEvent.click(firstButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(0);
  });

  it("calls handlePageChange with the correct value when last button is clicked", () => {
    const { getByText } = render(<PaginationFooter {...mockProps} />);
    const lastButton = getByText("Last");
    fireEvent.click(lastButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(4);
  });

  it("calls handlePageChange with the correct value when a page number is clicked", () => {
    const { getByText } = render(<PaginationFooter {...mockProps} />);
    const pageNumberButton = getByText("1");
    fireEvent.click(pageNumberButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(1);
  });

  it("calls handleItemsPerPageChange with the correct value when items per page is changed", () => {
    const { getByRole } = render(<PaginationFooter {...mockProps} />);
    const select = getByRole("combobox");
    fireEvent.change(select, { target: { value: "3" } });
    expect(mockHandleItemsPerPageChange).toHaveBeenCalledWith(3);
  });
});
