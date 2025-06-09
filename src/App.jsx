import React, { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import "./App.css";

export default function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  function handleAddClick() {
    setEditRecipe(null);
    setShowForm(true);
    setExpandedRecipeId(null);
  }

  function handleEdit(recipe) {
    setEditRecipe(recipe);
    setShowForm(true);
    setExpandedRecipeId(null);
  }

  function handleDelete(id) {
    if (window.confirm("Tarifi silmek istediğine emin misin?")) {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  }

  function toggleFavorite(id) {
    setRecipes(recipes.map(r => r.id === id ? {...r, favorite: !r.favorite} : r));
  }

  function toggleRecipeDetails(id) {
    setExpandedRecipeId(expandedRecipeId === id ? null : id);
  }

  function handleFormSubmit(recipe) {
    if (editRecipe) {
      setRecipes(recipes.map(r => r.id === recipe.id ? recipe : r));
    } else {
      setRecipes([...recipes, {...recipe, id: Date.now(), favorite: false}]);
    }
    setShowForm(false);
  }

  return (
    <div className="app-container">
      <header>
        <h1>Tarif Defteri</h1>
        <div className="btn-group">
          <button 
            onClick={() => {
              setShowFavorites(false);
              setExpandedRecipeId(null);
            }} 
            className={!showFavorites ? "active" : ""}
          >
            Tüm Tarifler
          </button>
          <button 
            onClick={() => {
              setShowFavorites(true);
              setExpandedRecipeId(null);
            }} 
            className={showFavorites ? "active" : ""}
          >
            Favoriler
          </button>
          <button onClick={handleAddClick} className="add-btn">+ Yeni Tarif Ekle</button>
        </div>
      </header>

      {showForm ? (
        <RecipeForm
          recipe={editRecipe}
          onCancel={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <RecipeList
          recipes={showFavorites ? recipes.filter(r => r.favorite) : recipes}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleFavorite={toggleFavorite}
          onToggleDetails={toggleRecipeDetails}
          expandedRecipeId={expandedRecipeId}
        />
      )}
    </div>
  );
}