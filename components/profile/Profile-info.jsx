import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../ui/button";
import ChangePasswordForm from "./Change-password-form";
import ChangePhotoForm from "./change-photo-form";
import classes from "./profile-info.module.scss";
import ProfilePhoto from "./profile-photo/Profile-photo";
const ProfileInfo = () => {
  const { data: session, status } = useSession();
  const [isShow, setisShow] = useState(false);

  if (status !== "authenticated" || !session) {
    return <p>Loading...</p>;
  }
  console.log(session);
  return (
    <div className={classes.container}>
      <h2>Personal informations</h2>
      <ul>
        <li>
          <h3>Full name</h3>
          <p>
            {session.user.name} {session.user.lastName}
          </p>
          <hr />
        </li>
        <li>
          <h3>Profile photo</h3>

          <ProfilePhoto user={session.user} />
          <ChangePhotoForm session={session} />
          <hr />
        </li>
        <li>
          <h3>Email</h3>
          <p> {session.user.email}</p>
          <hr />
        </li>
        <li>
          {!isShow && (
            <>
              <h3>Password</h3>
              <Button onClick={() => setisShow(!isShow)}>
                Change password
              </Button>
            </>
          )}

          {isShow && (
            <ChangePasswordForm setisShow={setisShow} session={session} />
          )}
          <hr />
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
