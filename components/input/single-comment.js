import { useState } from "react";
import NewComment from "./new-comment";
import classes from "./single-comment.module.css";
const SingleComment = ({ comment, isReply }) => {
  const [showReplyBox, setshowReplyBox] = useState(false);
  const [showRepliesComment, setshowRepliesComment] = useState(false);
  const showReplyHandler = () => {
    setshowReplyBox(!showReplyBox);
  };
  const ReplyComponent = () => (
    <>
      <p onClick={showReplyHandler}>Reply</p>
      {comment.replies && comment.replies.length > 0 && (
        <p onClick={() => setshowRepliesComment(!showRepliesComment)}>
          {!showRepliesComment
            ? `show replies(${comment.replies.length})`
            : "hide Replies"}
        </p>
      )}
    </>
  );

  return (
    <li className={classes.comment}>
      <p>{comment.text}</p>
      <div>
        By <address> {comment.name}</address>
      </div>
      <hr />
      <div className={classes.comment_action}>
        {!isReply && ReplyComponent()}
      </div>
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
      {comment.replies && comment.replies.length > 0 && showRepliesComment && (
        <ul className={classes.replies}>
          {comment.replies.map((comment) => (
            <SingleComment comment={comment} isReply={true} key={comment._id} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SingleComment;
