import { useContext, useRef } from "react";
import { NotificationContext } from "../../store/NotificationProvider";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const notificationCtx = useContext(NotificationContext);
  const inputRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registring for newsletter",
      status: "pending",
    });
    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email: inputValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((err) => {
          throw new Error(err.message || "Somthing went wrong");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: err.message || "somthing went wrong",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
