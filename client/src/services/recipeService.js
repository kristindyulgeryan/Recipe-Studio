const baseUrl = "http://localhost:3030/jsonstore/recipes";

export default {
  async create(recipeData) {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });
    const result = await response.jsone();
    return result;
  },
};
