import request from "../utils/request.js";

const baseUrl = "http://localhost:3030/jsonstore/recipes";

export default {
  async getAll() {
    const result = await request.get(baseUrl);
    const recipes = Object.values(result);
    return recipes;
  },
  getOne(recipeId) {
    return request.get(`${baseUrl}/${recipeId}`);

  },
  async create(newRecipe) {
    return request.post(baseUrl, newRecipe);
  },
  delete(recipeId) {
    return request.delete(`${baseUrl}/${recipeId}`);
  }
};
