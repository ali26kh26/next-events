import classes from "./like-button.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Router from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
const LikeButton = ({ eventId }) => {
  const { data: session, status } = useSession();
  const [isLiked, setIsliked] = useState(false);
  useEffect(() => {
    if (session?.user.likes.length > 0) {
      const checkIsLiked = session.user.likes
        .map((items) => items.eventId == eventId)
        .includes(true);
      setIsliked(checkIsLiked);
    }
  }, []);

  const likeHandler = () => {
    if (!session) {
      Router.push("/login");
      return;
    }
    setIsliked((prevState) => !prevState);
    axios
      .post("/api/user/like", { eventId: eventId })
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err);
        setIsliked(false);
      });
  };
  return (
    <div
      className={classes.like + " " + (isLiked ? classes.liked : "")}
      onClick={likeHandler}
    >
      {isLiked ? <AiFillHeart /> : <AiOutlineHeart style={{ color: "red" }} />}
    </div>
  );
};

export default LikeButton;
