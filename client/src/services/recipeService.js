import request from "../utils/request.js";

const baseUrl = "http://localhost:3030/jsonstore/recipes";

export default {
  async getAll() {
    const result = await request.get(baseUrl);
    const recipes = Object.values(result);
    return recipes;
  },
  async create(newRecipe) {
    return request.post(baseUrl, newRecipe);
  },
};

// const response = await fetch(baseUrl, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(newRecipe),
// });

// const result = await response.json();
// console.log(result);
