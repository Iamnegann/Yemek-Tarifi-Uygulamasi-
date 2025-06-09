import React from "react";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ 
  recipes, 
  onEdit, 
  onDelete, 
  onToggleFavorite, 
  onToggleDetails,
  expandedRecipeId 
}) {
  if (recipes.length === 0) return <p className="empty-msg">Gösterilecek tarif yok.</p>;

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onEdit={() => onEdit(recipe)}
          onDelete={() => onDelete(recipe.id)}
          onToggleFavorite={() => onToggleFavorite(recipe.id)}
          onToggleDetails={() => onToggleDetails(recipe.id)}
          isExpanded={expandedRecipeId === recipe.id}
        />
      ))}
    </div>
  );
}