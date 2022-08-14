import axios from "axios";
import { useState } from "react";
import Button from "../ui/button";
import InputUi from "../ui/input/input";
import classes from "./change-password-form.module.scss";
const ChangePasswordForm = ({ setisShow, session }) => {
  const [oldPassword, setoldPassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [repeatNewPassword, setrepeatNewPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .patch("/api/user/change-password", {
        oldPassword,
        newpassword,
        repeatNewPassword,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <InputUi
        type="password"
        label="Old password"
        value={oldPassword}
        onchange={(e) => setoldPassword(e.target.value)}
      />
      <InputUi
        type="password"
        label="New password"
        value={newpassword}
        onchange={(e) => setnewpassword(e.target.value)}
      />{" "}
      <InputUi
        type="password"
        label="repeat new password"
        value={repeatNewPassword}
        onchange={(e) => setrepeatNewPassword(e.target.value)}
      />
      <Button type="submit">Change password</Button>
      <Button
        type="button"
        secondary
        onClick={() => setisShow((prevstate) => !prevstate)}
      >
        Cancel
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
