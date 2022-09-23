import classes from "./user-popup.module.scss";
import { AiOutlineUser, AiOutlineHeart, AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";
import Link from "next/link";
const UserPopUp = () => {
  return (
    <ul className={classes.container}>
      <li>
        <Link href="/profile">
          <div className={classes.action}>
            <div className={classes.icon}>
              <AiOutlineUser />
            </div>
            <p> profile </p>
          </div>
        </Link>
      </li>
      <li>
        <Link href="/events/favorites">
          <div className={classes.action}>
            <div className={classes.icon}>
              <AiOutlineHeart />
            </div>
            <p> Favorites </p>
          </div>
        </Link>
      </li>
      <li onClick={() => signOut()}>
        <div className={classes.action}>
          <div className={classes.icon}>
            <AiOutlineLogout />
          </div>
          <p> Logout </p>
        </div>
      </li>
    </ul>
  );
};

export default UserPopUp;
