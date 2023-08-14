import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "../Input/InputControl"; // Import the InputControl component
import { auth } from "../../services/firebase"; // Import the auth object from "../firebase"

import styles from "./Login.module.css"; // Import the CSS module for styling

function Login() {
  const history = useHistory(); // Get the history object

  // State to hold the input values
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  // State to manage error message and submit button disabling
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Function to handle form submission
  const handleSubmission = async () => {
    // Check if email and password fields are filled
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    // Disable the submit button while processing
    setSubmitButtonDisabled(true);

    try {
      // Sign in the user using Firebase authentication
      await signInWithEmailAndPassword(auth, values.email, values.pass);

      // Re-enable the submit button and redirect to home page
      setSubmitButtonDisabled(false);
      history.push("/");
    } catch (error) {
      // Re-enable the submit button and display error message
      setSubmitButtonDisabled(false);
      if (error.message == "Firebase: Error (auth/user-not-found).") {
        error.message = "Please enter correct Username."
      }
      else if (error.message == "Firebase: Error (auth/wrong-password).") {
        error.message = "Please enter correct Password."
      }
      else{
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        {/* Input component for email */}
        <InputControl
          type="email"
          name="email"
          label="Email"
          placeholder="Enter email address"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

        {/* Input component for password */}
        <InputControl
          type="password"
          name="pass"
          label="Password"
          placeholder="Enter password"
          value={values.pass}
          onChange={(e) => setValues({ ...values, pass: e.target.value })}
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          {/* Login button */}
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              {/* Link to the registration page */}
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
