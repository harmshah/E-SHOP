import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../InputControl"; // Import the InputControl component
import { auth } from "../../services/firebase"; // Import the auth object from "../firebase"

import styles from "./Register.module.css"; // Import the CSS module for styling

function Register() {
  const history = useHistory();

  const [userdata, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    pass: "",
  });

  const postUserData = async () => {
    const { firstname, lastname, email, pass } = userdata;

    const response = await fetch("https://authenticationdemo-76bc7-default-rtdb.firebaseio.com/userlist.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        pass,
      }),
    });

    if (response.ok) {
      alert("Data stored successfully!");
    } else {
      alert("Please fill in all data.");
    }
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async (event) => {
    event.preventDefault();

    const { firstname, lastname, email, pass } = userdata;

    if (!firstname || !lastname || !email || !pass) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);

    try {
      const authResponse = await createUserWithEmailAndPassword(auth, email, pass);

      const user = authResponse.user;
      await updateProfile(user, {
        displayName: firstname,
      });

      await postUserData();

      setSubmitButtonDisabled(false);
      history.push("/");
    } catch (error) {
      setSubmitButtonDisabled(false);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          type="text"
          name="firstname"
          label="First Name"
          placeholder="Enter your first name"
          value={userdata.firstname}
          onChange={(e) => setUserData({ ...userdata, firstname: e.target.value })}
        />

        <InputControl
          type="text"
          name="lastname"
          label="Last Name"
          placeholder="Enter your last name"
          value={userdata.lastname}
          onChange={(e) => setUserData({ ...userdata, lastname: e.target.value })}
        />

        <InputControl
          type="email"
          name="email"
          label="Email"
          placeholder="Enter email address"
          value={userdata.email}
          onChange={(e) => setUserData({ ...userdata, email: e.target.value })}
        />

        <InputControl
          type="password"
          name="pass"
          label="Password"
          placeholder="Enter password"
          value={userdata.pass}
          onChange={(e) => setUserData({ ...userdata, pass: e.target.value })}
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
