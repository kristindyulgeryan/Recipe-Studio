import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";

export default function CommentsCreate({ onCreate }) {
  const { accessToken } = useAuth();
  const [comment, setComment] = useState("");

  const isLoggedIn = !!accessToken;

  const commentSubmit = async (e) => {
    e.preventDefault();
    onCreate(comment);
    setComment("");
  };

  if (!isLoggedIn) {
    return null;
  }
  return (
    <div className="add-comment-section">
      <h4>Add a Comment</h4>
      <form className="add-comment-form" onSubmit={commentSubmit}>
        <textarea
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="button add-comment-button"
          disabled={!isLoggedIn || comment.trim() === ""}
        >
          Submit Comment
        </button>
      </form>
      {!isLoggedIn && (
        <p style={{ color: "red" }}>You must be logged in to post a comment.</p>
      )}
    </div>
  );
}
