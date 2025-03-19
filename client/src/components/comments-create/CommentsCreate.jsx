import commentService from "../../services/commentService.js"

export default function CommentsCreate({ email, recipeId, onCreate }) {
  console.log("Email:", email);
  console.log("Recipe ID:", recipeId);

  const commentAction = async (formData)=>{
  const comment = formData.get('comment')

 const resultCreatedComment = await commentService.create(email, recipeId, comment)
  console.log(resultCreatedComment);
  onCreate(resultCreatedComment)
  }
    return(
        <div className="add-comment-section">
        <h4>Add a Comment</h4>
        <form className="add-comment-form" action={commentAction}>
          <textarea name="comment"
            placeholder="Write your comment here..."
            rows="4"
          ></textarea>
          <button type="submit" className="button add-comment-button">
            Submit Comment
          </button>
        </form>
      </div>
    )
}