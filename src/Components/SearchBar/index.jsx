import React, {  useEffect, useRef, useState } from "react";
import SortIcon from '@mui/icons-material/Sort';
import "./styles.css";


function SearchBar({onSearch,sort}) {
  const [input, setInput] = useState("");
  

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange=(e)=>{
    setInput(e.target.value);
    if(e.target.value.trim() === ""){
      onSearch("");
    }
  }

  const handleKeyDown=(e)=>{
    if(e.key === 'Enter'){
      onSearch(input.trim());
    }

  }


  return (
    <div className="searchbar-container">
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        className="searchbar"
        type="text"
        value={input}
        placeholder="Search   Recipe/chef name/description"
      />
      <div className="sortContainer">
      <p className="sortBy">Sortby :</p>
      <select onChange={(e)=>sort(e.target.value)}>
        <option   value="uploadedOn">Upload Date</option>
        <option   value="avgRating">Average Rating</option>
      </select>
      </div>
    </div>
  );
}

export default SearchBar;
