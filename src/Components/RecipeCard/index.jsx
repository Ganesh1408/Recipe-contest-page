import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import "./styles.css";



function RecipeCard({ recipe }) {
    

    if(!recipe){
        return <p>No recipes found</p>
    }
  //returing jsx
  return (
    <>
    
          <li className="RecipeCard">
            
            <LazyLoadImage
              src={recipe.imgUrl}
              alt={recipe.name}
              effect="blur"
              className="RecipeCard_image"
            />
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>Chef : {recipe.chef}</p>
            <p>MealType : {recipe.mealType}</p>
            <p>DishType : {recipe.dishType}</p>
            <p>Uploaded On : {recipe.uploadedOn}</p>
            <p>Ratings : {recipe.avgRating} | {recipe.totalRatings}</p>
            <p>KitchTest : {recipe.testKitchenApproved.toString()}</p>
            <p>Contest Winner : {recipe.contestWinner.toString()}</p>
            <p>Featured : {recipe.featured.toString()}</p>
            

          </li>
       
    </>
  );
}

export default RecipeCard;
