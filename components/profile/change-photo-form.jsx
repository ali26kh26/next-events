import axios from "axios";
import { useRef, useState } from "react";
import Button from "../ui/button";
import classes from "./change-photo-form.module.scss";
const ChangePhotoForm = ({ session }) => {
  const [imageSrc, setimageSrc] = useState("");
  const formRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "users-profile-image");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/ali26kh26/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setimageSrc(data.secure_url);
    axios
      .post("/api/user/upload-image", {
        email: session.user.email,
        url: data.secure_url,
      })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form ref={formRef} className={classes.form} onChange={submitHandler}>
        <label htmlFor="file">Change photo</label>
        <input type="file" name="file" id="file" accept="image/*" />
      </form>
    </>
  );
};

export default ChangePhotoForm;
