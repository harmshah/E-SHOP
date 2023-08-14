import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import necessary functions from Firebase auth module

import InputControl from "../Input/InputControl"; // Import the InputControl component
import { auth } from "../../services/firebase"; // Import the auth object from the "../firebase" module

import styles from "./Register.module.css"; // Import the CSS module for styling

function Register() {
  const history = useHistory(); // Get the history object to redirect after successful signup

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
    event.preventDefault(); // Prevent the default form submission behavior

    const { firstname, lastname, email, pass } = userdata;

    if (!firstname || !lastname || !email || !pass) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true); // Disable the submit button while processing

    try {
      const authResponse = await createUserWithEmailAndPassword(auth, email, pass); // Create a new user with email and password

      const user = authResponse.user;
      await updateProfile(user, {
        displayName: firstname, // Update user's display name
      });

      await postUserData(); // Call the function to store user data in the database

      setSubmitButtonDisabled(false); // Re-enable the submit button
      history.push("/"); // Redirect to the home page after successful signup
    } catch (error) {
      setSubmitButtonDisabled(false); // Re-enable the submit button
      setErrorMsg(error.message); // Display any error messages
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        {/* Input fields for user information */}
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

        {/* Display error message, signup button, and login link */}
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
