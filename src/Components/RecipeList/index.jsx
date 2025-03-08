import React, { useState, useEffect } from "react";
import "./styles.css";
import RecipeCard from "../RecipeCard";
import SearchBar from "../SearchBar";
import Header from "../Header/Index";
import Filtersidebar from "../FilterSidebar";
import MenuIcon from "@mui/icons-material/Menu";

function RecipeList() {
  const [recipeList, setRecipeList] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("uploadedOn");
  const [icon, setIcon] = useState(true);
  const [selectedFilters, setSeletedFilters] = useState({
    mealType: [],
    dishType: [],
    Attribute: [],
  });

  // Fetch recipes from JSON file
  const fetchRecipesList = async () => {
    try {
      const response = await fetch("/db.json");
      const data = await response.json();
      setRecipeList(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipesList();
  }, []);

  // Filtering the recipes
  const filteredRecipeList = recipeList.filter((recipe) => {
    const matchesSearch =
      search.trim() === "" ||
      recipe.name?.toLowerCase().includes(search.toLowerCase()) ||
      recipe.chef?.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description?.toLowerCase().includes(search.toLowerCase());
  
    const matchesMealType =
      (selectedFilters.mealType ?? []).length === 0 ||
      (selectedFilters.mealType ?? []).includes(recipe.mealType);
  
    const matchesDishType =
      (selectedFilters.dishType ?? []).length === 0 ||
      (selectedFilters.dishType ?? []).includes(recipe.dishType);
  
    const matchesAttributes =
      (selectedFilters.Attribute ?? []).length === 0 ||
      (selectedFilters.Attribute ?? []).every((attr) => {
        if (attr === "Contest Winner") return recipe.contestWinner;
        if (attr === "Featured") return recipe.featured;
        if (attr === "Test kitchen-Approved") return recipe.testKitchenApproved;
        return false;
      });
  
    return matchesSearch && matchesMealType && matchesDishType && matchesAttributes;
  });
  
    
    

  // Sorting the recipes
  const sortedList = [...filteredRecipeList].sort((a, b) => {
    if (sort === "uploadedOn") {
      return new Date(b.uploadedOn) - new Date(a.uploadedOn);
    } else if (sort === "avgRating") {
      return (b.avgRating || 0) - (a.avgRating || 0);
    }
  });

  const handleClick = () => {
    setIcon(!icon);
  };

  const handleFilterChange = (type, value) => () => {
    setSeletedFilters((prevFilters) => {
      const currentValues = prevFilters[type];
  
      return {
        ...prevFilters,
        [type]: currentValues.includes(value)
          ? currentValues.filter((item) => item !== value) // Remove if already selected
          : [...currentValues, value], // Add if not selected
      };
    });
  };
  
  const handleClearFilters = () => {
    setSeletedFilters({ mealType: [], dishType: [], Attribute: [] });
  };
  

  const handleindividualFilter=(type)=>{
        setSeletedFilters(prevFilters=>({
            ...prevFilters,
            [type]:[]
        }))
  }

  return (
    <>
      <Header />
      {icon && (
        <MenuIcon
          onClick={handleClick}
          sx={{
            marginTop: "80px",
            height: "40px",
            width: "40px",
            position: "absolute",
            right: "10px",
            top: "25px",
            cursor: "pointer",
            transition: "all 0.5s ease-in",
          }}
        />
      )}
      <Filtersidebar
        icon={icon}
        setIcon={setIcon}
        handleFilterChange={handleFilterChange}
        selectedFilter={selectedFilters}
        handleClearFilters={handleClearFilters}
        handleindividualFilter={handleindividualFilter}
      />
      <div className="RecipeContainer">
        <SearchBar onSearch={setSearch} sort={setSort} />
        <ul className="RecipeList">
          {sortedList.length > 0 ? (
            sortedList.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found</p>
          )}
        </ul>
      </div>
    </>
  );
}

export default RecipeList;
