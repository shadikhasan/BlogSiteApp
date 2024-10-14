// src/components/Search.tsx
import React from "react";
import { FaTimes } from "react-icons/fa"; // Import the clear icon from react-icons
import './Search.css';
interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  const handleClear = () => {
    setSearchQuery(""); // Clear the search input
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      {searchQuery && (
        <button className="clear-button" onClick={handleClear} aria-label="Clear search">
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default Search;
