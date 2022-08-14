import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ProfilePhoto from "../profile/profile-photo/Profile-photo";

import classes from "./main-header.module.css";

function MainHeader() {
  const { data: session, status } = useSession();
  console.log(session);
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
              <li>
                <Link href="/profile">
                  <a>
                    <ProfilePhoto nav user={session.user} />
                  </a>
                </Link>
              </li>
              <li>
                <button className={classes.logout} onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
