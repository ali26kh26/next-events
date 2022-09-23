import classes from "./input.module.css";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";
const InputUi = ({ type, value, onchange, label }) => {
  const [showPassword, setshowPassword] = useState(false);

  const changeVisibiltyHandler = () => {
    setshowPassword((prevState) => !prevState);
  };
  return (
    <div className={classes.container}>
      <label htmlFor={label}> {label} </label>
      <input
        id={label}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        inputMode={type}
        placeholder={label}
        value={value}
        onChange={onchange}
      />
      {type === "password" && (
        <div className={classes.visible}>
          <FaRegEye onClick={changeVisibiltyHandler} />
        </div>
      )}
    </div>
  );
};

export default InputUi;
