import React, { useState } from "react";

const categories = ["Tatlı", "Ana Yemek", "Aperatif"];

export default function RecipeForm({ recipe, onCancel, onSubmit }) {
  const [name, setName] = useState(recipe ? recipe.name : "");
  const [category, setCategory] = useState(recipe ? recipe.category : categories[0]);
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients : [""]);
  const [steps, setSteps] = useState(recipe ? recipe.steps : [""]);
  const [image, setImage] = useState(recipe ? recipe.image : "");

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  }

  function handleIngredientChange(idx, value) {
    const newIngs = [...ingredients];
    newIngs[idx] = value;
    setIngredients(newIngs);
  }

  function handleStepChange(idx, value) {
    const newSteps = [...steps];
    newSteps[idx] = value;
    setSteps(newSteps);
  }

  function addIngredient() {
    setIngredients([...ingredients, ""]);
  }

  function removeIngredient(idx) {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  }

  function addStep() {
    setSteps([...steps, ""]);
  }

  function removeStep(idx) {
    setSteps(steps.filter((_, i) => i !== idx));
  }

  function submitForm(e) {
    e.preventDefault();
    if (!name.trim()) {
      alert("Lütfen tarif ismi girin.");
      return;
    }
    if (ingredients.some(i => !i.trim())) {
      alert("Lütfen tüm malzemeleri doldurun veya boş olanları silin.");
      return;
    }
    if (steps.some(s => !s.trim())) {
      alert("Lütfen tüm yapılış adımlarını doldurun veya boş olanları silin.");
      return;
    }

    onSubmit({
      id: recipe ? recipe.id : undefined,
      name,
      category,
      ingredients,
      steps,
      image,
      favorite: recipe ? recipe.favorite : false,
    });
  }

  return (
    <form className="recipe-form" onSubmit={submitForm}>
      <h2>{recipe ? "Tarif Düzenle" : "Yeni Tarif Ekle"}</h2>

      <label>Tarif İsmi</label>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Tarifin adını yazın"
        required
      />

      <label>Kategori</label>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label>Malzemeler</label>
      {ingredients.map((ing, idx) => (
        <div key={idx} className="dynamic-input">
          <input
            type="text"
            value={ing}
            onChange={e => handleIngredientChange(idx, e.target.value)}
            placeholder="Malzeme girin"
            required
          />
          <button
            type="button"
            onClick={() => removeIngredient(idx)}
            disabled={ingredients.length === 1}
            title="Malzemeyi sil"
          >✖</button>
        </div>
      ))}
      <button type="button" className="add-btn-small" onClick={addIngredient}>+ Malzeme Ekle</button>

      <label>Yapılış Adımları</label>
      {steps.map((step, idx) => (
        <div key={idx} className="dynamic-input">
          <input
            type="text"
            value={step}
            onChange={e => handleStepChange(idx, e.target.value)}
            placeholder="Yapılış adımını yazın"
            required
          />
          <button
            type="button"
            onClick={() => removeStep(idx)}
            disabled={steps.length === 1}
            title="Adımı sil"
          >✖</button>
        </div>
      ))}
      <button type="button" className="add-btn-small" onClick={addStep}>+ Adım Ekle</button>

      <label>Fotoğraf Ekle</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Tarif" className="preview-image" />}

      <div className="form-actions">
        <button type="submit" className="save-btn">Kaydet</button>
        <button type="button" onClick={onCancel} className="cancel-btn">İptal</button>
      </div>
    </form>
  );
}