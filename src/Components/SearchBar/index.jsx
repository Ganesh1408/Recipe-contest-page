import React, { useEffect, useRef, useState } from "react";
import SortIcon from '@mui/icons-material/Sort';
import "./styles.css";

function SearchBar({ onSearch, sort }) {
  const [input, setInput] = useState("");
  const [animateClass, setAnimateClass] = useState("fadein");
  const [placeholderIndex, setPlaceholderIndex] = useState(0); // ✅ State for index
  const inputRef = useRef();
  
  const placeholders = ["Chef name", "Recipe", "Description"];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (input === '') {
        setAnimateClass("fadeout");
        setTimeout(() => { 
          const nextIndex = (placeholderIndex + 1) % placeholders.length;
          setPlaceholderIndex(nextIndex); // ✅ Update the index state
          setCurrentPlaceholder(placeholders[nextIndex]);
          setAnimateClass("fadein");
        }, 700); 
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [input, placeholderIndex,placeholders]); // ✅ `placeholderIndex` added to dependencies

  const handleChange = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim() === "") {
      onSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(input.trim());
    }
  };

  return (
    <div className="searchbar-container">
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="searchbar"
        type="search"
        value={input}
      />
      {input === "" && (
        <span className="search">
          Search <span className={`search1 ${animateClass}`}>"{currentPlaceholder}"</span>
        </span>
      )}
      <div className="sortContainer">
        <p className="sortBy">Sort by :</p>
        <select onChange={(e) => sort(e.target.value)}>
          <option value="uploadedOn">Upload Date</option>
          <option value="avgRating">Average Rating</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
