import React, { useContext } from "react";
import { ModalContext } from "../../../store/modalProvider";
import Button from "../button";
import classes from "./modal.module.scss";
function Modal(props) {
  const modalCtx = useContext(ModalContext);
  const modalData = modalCtx.modal;
  const closeModalHandler = (e) => {
    modalCtx.hideModal();
  };
  return (
    <div className={classes.outer} onClick={closeModalHandler}>
      <div className={classes.inner} onClick={(e) => e.stopPropagation()}>
        <h4>{modalData.text}</h4>
        <div className={classes.action}>
          <Button onClick={closeModalHandler} secondary>
            Cancel
          </Button>
          {modalData.Button}
          <modalData.Button />
        </div>
      </div>
    </div>
  );
}

export default Modal;
