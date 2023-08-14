import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import InputControl from "../Input/InputControl"; // Import the InputControl component
import { auth } from "../../services/firebase"; // Import the auth object from "../firebase"

import styles from "./Login.module.css"; // Import the CSS module for styling

function Login() {
  const history = useHistory(); // Get the history object

  const [values, setValues] = useState({
    email: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

    try {
      await signInWithEmailAndPassword(auth, values.email, values.pass);

      setSubmitButtonDisabled(false);
      history.push("/");
    } catch (error) {
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

        <InputControl
          type="email"
          name="email"
          label="Email"
          placeholder="Enter email address"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

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
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Login
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/register">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
