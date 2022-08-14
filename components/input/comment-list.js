import { useState } from "react";
import classes from "./comment-list.module.css";
import NewComment from "./new-comment";
import SingleComment from "./single-comment";

function CommentList({ comments }) {
  // const [showReplyBox, setshowReplyBox] = useState(false);
  // const showReplyHandler = () => {
  //   setshowReplyBox(true);
  // };
  return (
    <ul className={classes.comments}>
      {comments.map((comment) => (
        <SingleComment key={comment._id} comment={comment} />
        // <li key={comment._id}>
        //   <p>{comment.text}</p>
        //   <div>
        //     By <address> {comment.name}</address>
        //   </div>
        //   <hr />
        //   <div className={classes.comments_action}>
        //     <p onClick={showReplyHandler}>Reply</p>
        //   </div>
        //   {showReplyBox && (
        //     <div>
        //       <NewComment />
        //     </div>
        //   )}
        // </li>
      ))}
    </ul>
  );
}

export default CommentList;
