import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import ProfilePhoto from "../profile/profile-photo/Profile-photo";
import classes from "./main-header.module.css";
import UserPopUp from "./user-popup/user-popup";

function MainHeader() {
  const { data: session, status } = useSession();
  const [showUserDetail, setshowUserDetail] = useState(false);

  const logoutHandler = () => {
    signOut();
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <Link href="/events"> All Events</Link>
          </li>
          {!(status === "authenticated") && !session && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
          {status === "authenticated" && session && (
            <>
              <li
                style={{ position: "relative" }}
                onClick={() => setshowUserDetail(!showUserDetail)}
              >
                <ProfilePhoto nav user={session.user} />
                {showUserDetail && <UserPopUp />}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
