import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import recipeService from "../../services/recipeService.js";
import { compressImage } from "../../utils/compressImage.js"; // Импорт на компресията

export default function RecipeCreate() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return; // Проверка за празно изображение

    try {
      const compressedBlob = await compressImage(image);

      const toBase64 = (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      const base64Image = await toBase64(compressedBlob); // Сега ще работи правилно

      const newRecipe = { title, description, image: base64Image };

      await recipeService.create(newRecipe);
      console.log("Recipe created successfully!");
    } catch (error) {
      console.error("Error processing image:", error);
    }

    navigate("/recipes");
  };

  return (
    <section id="recipe-form">
      <form id="recipe-form-container" onSubmit={handleSubmit}>
        <div className="container">
          <h2>Add Your Recipe</h2>

          <label htmlFor="recipe-title">Recipe Name:</label>
          <input
            type="text"
            id="recipe-title"
            placeholder="Enter recipe title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="recipe-description">Ingredients:</label>
          <textarea
            id="recipe-description"
            placeholder="Flour, cheese, tomatoes..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange} // Използвай onChange за обработка на снимката
          />

          <input type="submit" value="Submit Recipe" />
        </div>
      </form>
    </section>
  );
}
