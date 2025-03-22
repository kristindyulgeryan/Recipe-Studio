export default function CommentsCreate({ onCreate }) {
  const commentAction = async (formData) => {
    const comment = formData.get("comment");

    onCreate(comment);
  };
  return (
    <div className="add-comment-section">
      <h4>Add a Comment</h4>
      <form className="add-comment-form" action={commentAction}>
        <textarea
          name="comment"
          placeholder="Write your comment here..."
          rows="4"
        ></textarea>
        <button type="submit" className="button add-comment-button">
          Submit Comment
        </button>
      </form>
    </div>
  );
}
