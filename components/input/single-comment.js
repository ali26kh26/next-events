import { useState } from "react";
import NewComment from "./new-comment";
import classes from "./single-comment.module.css";
const SingleComment = ({ comment }) => {
  const [showReplyBox, setshowReplyBox] = useState(false);
  const [showRepliesComment, setshowRepliesComment] = useState(false);
  const showReplyHandler = () => {
    setshowReplyBox(!showReplyBox);
  };

  return (
    <li className={classes.comment}>
      <p>{comment.text}</p>
      <div>
        By <address> {comment.name}</address>
      </div>
      <hr />
      <div className={classes.comment_action}>
        <p onClick={showReplyHandler}>Reply</p>
        {comment.replies && comment.replies.length > 0 && (
          <p onClick={() => setshowRepliesComment(!showRepliesComment)}>
            {!showRepliesComment
              ? `show replies(${comment.replies.length})`
              : "hide Replies"}
          </p>
        )}
      </div>
      {comment.replies && comment.replies.length > 0 && showRepliesComment && (
        <ul className={classes.replies}>
          {comment.replies.map((comment) => (
            <SingleComment comment={comment} key={comment._id} />
          ))}
        </ul>
      )}
      {showReplyBox && (
        <div>
          <NewComment
            onSentComment={showReplyHandler}
            eventId={comment.eventId}
            commentId={comment._id}
            comment={comment}
          />
        </div>
      )}
    </li>
  );
};

export default SingleComment;
