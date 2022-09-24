import classes from "./stickybutton.module.scss";
import { FaBell } from "react-icons/fa";
import { useContext } from "react";
import { ModalContext } from "../../../store/modalProvider";
import Button from "../button";
import Router from "next/router";
const StickyButton = () => {
  const modalCtx = useContext(ModalContext);
  const SecondButton = () => {
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
  const clickHandler = () => {
    modalCtx.showModal({
      text: "for better experience you can log in ",
      Button: SecondButton,
    });
  };
  return (
    <div className={classes.container} onClick={clickHandler}>
      <div>
        <FaBell />
      </div>
    </div>
  );
};

export default StickyButton;
