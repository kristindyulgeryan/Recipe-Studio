export default function CommentsShow({comments}){
    return(
        <div className="comments-section">
        <h4>Comments:</h4>

        {comments.length > 0
        ? comments.map(({_id, email, comment}) => (
        <div key={_id} className="comment">
        <p>
          <strong>{email}:</strong>{comment}</p>
        </div>
        ))
        : null
      }
        
        
      </div>
    )
}