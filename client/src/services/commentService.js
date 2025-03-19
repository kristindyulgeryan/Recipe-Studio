const baseUrl = 'http://localhost:3030/jsonstore/comments'

export default {
   async getAll(recipeId){
const comments =await request.get(baseUrl)
const recipeComments =Object.values(comments).filter(comment => comment.recipeId !== recipeId)
return recipeComments
    },
    create(email, recipeId, comment){
     return request.post(baseUrl, {email, recipeId, comment})
    }
}