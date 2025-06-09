import React from "react";

export default function RecipeCard({ 
  recipe, 
  onEdit, 
  onDelete, 
  onToggleFavorite, 
  onToggleDetails,
  isExpanded 
}) {
  return (
    <div className={`recipe-card ${isExpanded ? "expanded" : ""}`}>
      <div className="card-header" onClick={onToggleDetails}>
        <img
          src={recipe.image || "https://via.placeholder.com/150?text=Resim+Yok"}
          alt={recipe.name}
          className="recipe-image"
        />
        <div className="recipe-info">
          <h3>{recipe.name}</h3>
          <p className="category">{recipe.category}</p>
        </div>
        <button
          className={`favorite-btn ${recipe.favorite ? "fav" : ""}`}
          onClick={e => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          title={recipe.favorite ? "Favoriden çıkar" : "Favoriye ekle"}
        >
          ★
        </button>
      </div>

      {isExpanded && (
        <div className="details">
          <h4>Malzemeler</h4>
          <ul>
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <h4>Yapılış</h4>
          <ol>
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>

          <div className="card-actions">
            <button className="edit-btn" onClick={onEdit}>Düzenle</button>
            <button className="delete-btn" onClick={onDelete}>Sil</button>
          </div>
        </div>
      )}
    </div>
  );
}