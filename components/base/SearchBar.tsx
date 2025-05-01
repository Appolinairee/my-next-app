import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = ({
  onSearch,
  placeholder = "Recherche produit...",
  initialValue = "",
  className = "",
  inputClassName = "",
  buttonClassName = "",
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative rounded-lg ${className}`}
      onClick={() => {}}
    >
      <input
        type="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className={`input border border-gray-200 !py-[13px] w-full  ${inputClassName}`}
      />

      <button
        type="submit"
        className={`absolute right-1 top-1/2 -translate-y-1/2 bg-primary rounded-full p-3 text-white cursor-pointer ${buttonClassName}`}
        aria-label="Rechercher"
      >
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchBar;
