import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext({
  modal: null,
  showModal: function (notificationData) {},
  hideModal: function () {},
});
const ModalProvider = (props) => {
  const [activeModal, setActiveModal] = useState();
  console.log(activeModal);

  const showModalHandler = (modalData) => {
    setActiveModal(modalData);
  };
  const hideModalHandler = () => {
    setActiveModal(null);
  };
  const context = {
    modal: activeModal,
    showModal: showModalHandler,
    hideModal: hideModalHandler,
  };
  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
