import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export default {
    async getAll(recipeId) {
        const comments = await request.get(baseUrl);

     
        // Client filtering (dont do this)
        const gameComments = Object.values(comments).filter(comment => comment.recipeId === recipeId);

        return gameComments;
    },
    create(email, recipeId, comment) {
        return request.post(baseUrl, { email, recipeId, comment });
    }
};
