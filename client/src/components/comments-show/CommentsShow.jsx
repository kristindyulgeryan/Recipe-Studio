import useAuth from "../../hooks/useAuth.js";

export default function CommentsShow({ comments, onDelete }) {
  const { userId } = useAuth();

  return (
    <div className="comments-section">
      <h4>Comments:</h4>

      {comments.length > 0 ? (
        comments.map(({ _id, comment, author, _ownerId }) => {
          const isOwner =
            userId && _ownerId && userId.toString() === _ownerId.toString();

          return (
            <div key={_id} className="comment">
              <div className="comment-content">
                <p>
                  <strong>{author?.username}</strong>: {comment}
                </p>
                {isOwner && (
                  <button
                    className="comment-delete-button"
                    onClick={() => onDelete(_id)}
                    aria-label="Delete comment"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p className="empty">No comments yet.</p>
      )}
    </div>
  );
}
