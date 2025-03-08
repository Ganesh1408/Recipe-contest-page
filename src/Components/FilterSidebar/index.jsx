import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./styles.css";

function FilterSidebar({
  icon,
  setIcon,
  handleFilterChange,
  selectedFilter,
  handleClearFilters,
  handleindividualFilter,
}) {
  const handleClick = () => {
    setIcon(!icon);
  };

  //returning jsx
  return (
    <aside id="bar" className={`sideBar ${icon ? "hide" : "show"}`}>
      {!icon && (
        <CloseIcon
          onClick={handleClick}
          sx={{
            height: "40px",
            width: "40px",
            position: "absolute",
            right: "10px",
            top: "25px",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          }}
        />
      )}
      <h3 className="filter-heading">
        Filter{" "}
        <FilterListIcon
          sx={{ fontSize: "26px", position: "relative", top: "5px" }}
        />
      </h3>
      <h4>Meal Type</h4> {/*filter by meal type*/}
      <ul className="filter-items">
        {["BreakFast", "Lunch", "Dinner", "Snack", "Dessert", "Appetizer"].map(
          (item, index) => (
            <>
              <li
                key={index}
                className={
                  selectedFilter.mealType.includes(item) ? "active" : ""
                }
                onClick={handleFilterChange("mealType", item)}
              >
                {item}
                <span
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleindividualFilter("mealType",item);
                  }}
                >
                  X
                </span>
              </li>
            </>
          )
        )}
      </ul>
      <hr
        style={{ width: "100%", borderTop: "1px solid #ccc", margin: "10px 0" }}
      />
      <h4>Dish Type</h4> {/*filter by dish type*/}
      <ul className="filter-items">
        {[
          "Cake",
          "Pasta",
          "BBQ",
          "Salad",
          "Seafood",
          "Soup",
          "Pastry",
          "Mexican",
          "Vegetarian",
          "Eggs",
          "Rice",
          "Noodles",
        ].map((dish, index) => {
          return (
            <>
              <li
                key={index}
                onClick={handleFilterChange("dishType", dish)}
                className={`cross ${
                  selectedFilter.dishType.includes(dish) ? "active" : ""
                }`}
              >
                {dish}
                <span
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleindividualFilter("dishType",dish);
                  }}
                >
                  X
                </span>
              </li>
            </>
          );
        })}
      </ul>
      <hr
        style={{ width: "100%", borderTop: "1px solid #ccc", margin: "10px 0" }}
      />
      <h4>Attributes</h4> {/*filter by attribute*/}
      <ul className="filter-items">
        {["Contest Winner", "Featured", "Test kitchen-Approved"].map(
          (attribute, index) => {
            return (
              <li
                key={index}
                onClick={handleFilterChange("Attribute", attribute)}
                className={
                  selectedFilter.Attribute.includes(attribute) ? "active" : ""
                }
              >
                {attribute}{" "}
                <span
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "black",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleindividualFilter("Attribute",attribute);
                  }}
                >
                  X
                </span>
              </li>
            );
          }
        )}
      </ul>
      <hr
        style={{ width: "100%", borderTop: "1px solid #ccc", margin: "10px 0" }}
      />
      <h3 onClick={handleClearFilters}>Clear All filter</h3>
    </aside>
  );
}

export default FilterSidebar;
