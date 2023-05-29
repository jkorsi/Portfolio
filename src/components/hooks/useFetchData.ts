import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import fetch from "cross-fetch";

interface UseFetchDataProps {
  initialPage: number;
  initialPageSize: number;
  initialOrderBy: string;
  initialOrderDir: string;
  minDate?: string;
  maxDate?: string;
  apiUrl: string;
}

const useFetchData = ({
  initialPage,
  initialPageSize,
  initialOrderBy,
  initialOrderDir,
  minDate,
  maxDate,
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
    fetchData();
  }, [currentPage, itemsPerPage, sortColumn, sortDirection, searchKeyword]);

  useEffect(() => {
    navigate(
      `?page=${currentPage}&size=${itemsPerPage}&orderBy=${sortColumn}&orderDir=${sortDirection}`
    );
  }, [currentPage, itemsPerPage, sortColumn, sortDirection, navigate]);

  const generateFetchUrl = (): string => {
    let fetchUrl = `${apiUrl}/search?keyword=`;

    if (searchKeyword) fetchUrl = fetchUrl + searchKeyword;
    if (sortColumn) fetchUrl = fetchUrl + `&orderBy=${sortColumn}`;
    if (sortDirection) fetchUrl = fetchUrl + `&orderDir=${sortDirection}`;
    if (currentPage) fetchUrl = fetchUrl + `&page=${currentPage}`;
    if (itemsPerPage) fetchUrl = fetchUrl + `&size=${itemsPerPage}`;
    if (minDate) fetchUrl = fetchUrl + `&minDate=${minDate}`;
    if (maxDate) fetchUrl = fetchUrl + `&maxDate=${maxDate}`;

    return fetchUrl;
  };

  const fetchData = async () => {
    const fetchUrl = generateFetchUrl();
    console.log(fetchUrl);
    try {
      const data = await fetch(fetchUrl);
      const jsonResponse = await data.json();
      const totalPages = jsonResponse.totalPages;
      const content = jsonResponse.content;

      setContent(content);
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Fetch error: " + error);
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
