import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import SearchInput from "../components/DynamicTable/TableSearchInput";

jest.useFakeTimers();

describe("SearchInput", () => {
  it("calls the handleSearchKeywordChange function with the debounced input value", async () => {
    const handleSearchKeywordChange = jest.fn();

    render(
      <SearchInput handleSearchKeywordChange={handleSearchKeywordChange} />
    );

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "test" },
    });

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Assert if handleSearchKeywordChange has been called
    await waitFor(() => {
      // Assert if handleSearchKeywordChange has been called
      expect(handleSearchKeywordChange).toHaveBeenCalledWith("test");
    });
  });
});
