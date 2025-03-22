export default function CommentsShow({ comments }) {
  return (
    <div className="comments-section">
      <h4>Comments:</h4>

      {comments.length > 0
        ? comments.map(({ _id, comment, author }) => (
            <div key={_id} className="comment">
              <p>
                {author.username} : {comment}
              </p>
            </div>
          ))
        : null}
    </div>
  );
}
