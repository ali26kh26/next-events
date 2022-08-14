import { useContext, useEffect, useState } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { NotificationContext } from "../../store/NotificationProvider";

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${eventId}`)
      .then((response) => response.json())
      .then((data) => setcomments(data.comments));
    setLoading(false);
  }, [setShowComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "sending comment",
      message: "your comment is currently being stored into database",
      status: "pending",
    });
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((err) => {
          throw new Error(err.message || "Somthing went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "your comment was saved",
          status: "success",
        });
        fetch(`/api/comments/${eventId}`)
          .then((response) => response.json())
          .then((data) => setcomments(data.comments));
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "something went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && loading && <p>Loading...</p>}
      {showComments && !loading && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
