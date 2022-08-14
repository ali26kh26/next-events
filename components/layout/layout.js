import { Fragment, useContext } from "react";
import { NotificationContext } from "../../store/NotificationProvider";
import Notification from "../ui/notification/Notification";
import MainHeader from "./main-header";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </Fragment>
  );
}

export default Layout;
