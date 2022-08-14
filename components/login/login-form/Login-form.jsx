import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Button from "../../ui/button";
import InputUi from "../../ui/input/input";
import classes from "./login-form.module.css";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

const LoginForm = () => {
  const [email, setemail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setpassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSignup) {
      axios
        .post("/api/signup", { email, password, name, lastName })
        .then((res) => {
          setemail("");
          setpassword("");
          setName("");
          setLastName("");
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      console.log(result);
      if (!result.error) {
        // setCookie("userData",)
        router.replace("/");
      }
    }
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2>{isSignup ? "Sign up" : "Log in"}</h2>
      {isSignup && (
        <>
          <InputUi
            type="text"
            label="Name"
            value={name}
            onchange={(e) => setName(e.target.value)}
          />
          <InputUi
            type="text"
            label="Last name"
            value={lastName}
            onchange={(e) => setLastName(e.target.value)}
          />
        </>
      )}
      <InputUi
        type="email"
        label="Email"
        value={email}
        onchange={(e) => setemail(e.target.value)}
      />
      <InputUi
        type="password"
        label="Password"
        value={password}
        onchange={(e) => setpassword(e.target.value)}
      />
      <Button>{isSignup ? "Sign up" : "Log in"}</Button>
      <p onClick={() => setIsSignup((prevstate) => !prevstate)}>
        {isSignup ? "Already have account?" : "Create account"}
      </p>
    </form>
  );
};

export default LoginForm;
