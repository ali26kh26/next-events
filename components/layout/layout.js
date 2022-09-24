import { Fragment, useContext } from "react";
import { ModalContext } from "../../store/modalProvider";
import { NotificationContext } from "../../store/NotificationProvider";
import Modal from "../ui/modal/modal";
import Notification from "../ui/notification/Notification";
import MainHeader from "./main-header";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  const activeModal = useContext(ModalContext).modal;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && <Notification {...activeNotification} />}
      {activeModal && <Modal {...activeModal} />}
    </Fragment>
  );
}

export default Layout;
