import { useState, useEffect } from "react";

interface SearchInputProps {
  handleSearchKeywordChange: (keyword: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleSearchKeywordChange,
}) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 100);

  useEffect(() => {
    handleSearchKeywordChange(debouncedValue);
  }, [debouncedValue, handleSearchKeywordChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center px-4 py-2 mt-3 mb-3">
      <div className="mr-3 font-bold">Search:</div>
      <input
        className="p-1 rounded-lg"
        type="text"
        placeholder="Search..."
        onChange={handleInputChange}
        value={inputValue}
      />
    </div>
  );
};

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default SearchInput;
