import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fetch from "cross-fetch";

interface UseFetchDataProps {
  initialPage: number;
  initialPageSize: number;
  initialOrderBy: string;
  initialOrderDir: string;
  apiUrl: string;
}

const useFetchData = ({
  initialPage,
  initialPageSize,
  initialOrderBy,
  initialOrderDir,
  apiUrl,
}: UseFetchDataProps) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialPageSize);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>(initialOrderBy);
  const [sortDirection, setSortDirection] = useState<string>(initialOrderDir);
  const [content, setContent] = useState<string[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetch use-effect");
    fetchData();
  }, [currentPage, itemsPerPage, sortColumn, sortDirection, searchKeyword]);

  useEffect(() => {
    navigate(
      `?page=${currentPage}&size=${itemsPerPage}&orderBy=${sortColumn}&orderDir=${sortDirection}`
    );
  }, [currentPage, itemsPerPage, sortColumn, sortDirection, navigate]);

  const generateFetchUrl = (): string => {
    let fetchUrl = `${apiUrl}/?orderBy=${sortColumn}&orderDir=${sortDirection}&page=${currentPage}&size=${itemsPerPage}`;
    console.log("f:" + fetchUrl);

    if (searchKeyword) {
      fetchUrl = `${apiUrl}/search?keyword=${searchKeyword}&orderBy=${sortColumn}&orderDir=${sortDirection}&page=${currentPage}&size=${itemsPerPage}`;
      console.log("search: " + fetchUrl);
    }

    return fetchUrl;
  };

  const fetchData = async () => {
    const fetchUrl = generateFetchUrl();
    console.log("Generated fetchUrl:");
    try {
      const data = await fetch(fetchUrl);
      const jsonResponse = await data.json();
      const totalPages = jsonResponse.totalPages;
      const content = jsonResponse.content;

      setContent(content);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const handleSearchKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(0);
  };

  const handleSortChange = (column: string, direction: string) => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  return {
    content,
    totalPages,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    handleSortChange,
    handleSearchKeywordChange,
  };
};

export default useFetchData;
