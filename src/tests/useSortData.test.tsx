import { renderHook, act } from "@testing-library/react";
import useSortData from "../components/hooks/useSortData";

describe("useSortData", () => {
  test("should initialize with default values", () => {
    const { result } = renderHook(() =>
      useSortData({ defaultSortColumn: "name" })
    );

    expect(result.current.sortColumn).toBe("name");
    expect(result.current.sortDirection).toBe("asc");
  });

  test("should update sortColumn and sortDirection when handleSort is called with a new column", () => {
    const { result } = renderHook(() =>
      useSortData({ defaultSortColumn: "name" })
    );

    act(() => {
      result.current.handleSort("age");
    });

    expect(result.current.sortColumn).toBe("age");
    expect(result.current.sortDirection).toBe("asc");
  });

  test("should toggle sortDirection when handleSort is called with the current column", () => {
    const { result } = renderHook(() =>
      useSortData({ defaultSortColumn: "name" })
    );

    act(() => {
      result.current.handleSort("name");
    });

    expect(result.current.sortColumn).toBe("name");
    expect(result.current.sortDirection).toBe("desc");
  });
});
