import classes from "./profile-photo.module.scss";
import Image from "next/image";
const ProfilePhoto = (props) => {
  const { user } = props;
  return (
    <>
      {props.nav ? (
        <div className={classes.outer_nav}>
          <div>
            {!user?.image && (
              <p>
                {user.name.charAt(0).toUpperCase()}{" "}
                {user.lastName.charAt(0).toUpperCase()}
              </p>
            )}
            {user?.image && <Image height={100} width={100} src={user.image} />}
          </div>
        </div>
      ) : (
        <div className={classes.outer}>
          <div>
            {!user?.image && (
              <p>
                {user.name.charAt(0).toUpperCase()}{" "}
                {user.lastName.charAt(0).toUpperCase()}
              </p>
            )}
            {user?.image && <Image height={100} width={100} src={user.image} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePhoto;
