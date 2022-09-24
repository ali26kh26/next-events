import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useRef, useState } from "react";
import { NotificationContext } from "../../store/NotificationProvider";
import classes from "./new-comment.module.css";

function NewComment(props) {
  const [isInvalid, setIsInvalid] = useState(false);
  const { data: session, status } = useSession();
  const emailInputRef = useRef();
  const nameInputRef = useRef();
  const commentInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function sendCommentHandler(event) {
    event.preventDefault();

    let enteredEmail;
    let enteredName;
    let enteredComment;
    if (session) {
      enteredEmail = session.user.email;
      enteredName = `${session.user.name} ${session.user.lastName}`;
      enteredComment = commentInputRef.current.value;
    } else {
      enteredEmail = emailInputRef.current.value;
      enteredName = nameInputRef.current.value;
      enteredComment = commentInputRef.current.value;
    }

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredComment ||
      enteredComment.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }
    notificationCtx.showNotification({
      title: "sending comment",
      message: "your comment is currently being stored into database",
      status: "pending",
    });
    if (props.eventId) {
      axios
        .put(`/api/comments/${props.eventId}`, {
          commentId: props.comment._id,
          parentId: props.comment.replyTo || null,
          newComment: {
            email: enteredEmail,
            name: enteredName,
            text: enteredComment,
          },
        })
        .then(({ data }) => {
          notificationCtx.showNotification({
            title: "Success!",
            message: "your comment was saved",
            status: "success",
          });
          props.onSentComment();
        })
        .catch((err) => {
          notificationCtx.showNotification({
            title: "Error!",
            message: err.message || "something went wrong",
            status: "error",
          });
          console.log(err);
        });
    } else {
      props.onAddComment({
        email: enteredEmail,
        name: enteredName,
        text: enteredComment,
      });
    }
  }

  return (
    <form className={classes.form} onSubmit={sendCommentHandler}>
      <div className={classes.row}>
        {!session && (
          <>
            <div className={classes.control}>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" ref={nameInputRef} />
            </div>
          </>
        )}
        {session && (
          <>
            <div className={classes.control} style={{ display: "flex" }}>
              <p>{session.user.email}</p>
              {props.comment && (
                <>
                  <span>&nbsp; Reply to &nbsp;</span>
                  <p>{props.comment.name}</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="comment">Your comment</label>
        <textarea
          id="comment"
          rows="5"
          ref={commentInputRef}
          placeholder="comment text ...."
        ></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      {props.commentId && <button onClick={props.onSentComment}>Cancel</button>}
      <button>Submit</button>
    </form>
  );
}

export default NewComment;
