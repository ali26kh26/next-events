import classes from "./like-button.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Router from "next/router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Modal from "../modal/modal";
import { ModalContext } from "../../../store/modalProvider";
import Button from "../button";
const LikeButton = ({ eventId }) => {
  const { data: session, status } = useSession();
  const [isLiked, setIsliked] = useState(false);
  const modalCtx = useContext(ModalContext);

  useEffect(() => {
    if (session?.user.likes.length > 0) {
      const checkIsLiked = session.user.likes
        .map((items) => items.eventId == eventId)
        .includes(true);
      setIsliked(checkIsLiked);
    }
  }, []);
  const secondButton = () => {
    return (
      <Button
        onClick={() => {
          Router.push("/login");
          modalCtx.hideModal();
        }}
      >
        Log in
      </Button>
    );
  };
  const likeHandler = () => {
    if (!session) {
      modalCtx.showModal({
        text: "You must log in to add events to your favorite",
        Button: secondButton,
      });

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
    <>
      <div
        className={classes.like + " " + (isLiked ? classes.liked : "")}
        onClick={likeHandler}
      >
        {isLiked ? (
          <AiFillHeart />
        ) : (
          <AiOutlineHeart style={{ color: "red" }} />
        )}
      </div>
    </>
  );
};

export default LikeButton;
