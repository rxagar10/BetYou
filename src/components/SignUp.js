import React, { useState } from 'react';
import axios from "axios";
import config from "../config";
import { useHistory } from "react-router-dom";

function SignUp() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const submitForm = () => {
    if (firstName.length === 0
        || lastName.length === 0
        || username.length === 0
        || email.length === 0
        || password.length === 0
        || confirmPassword.length === 0) {
      setErrorMessage("Please fill in all fields")
    } else if (password !== confirmPassword || password.length < 5 || confirmPassword.length < 5) {
      setErrorMessage("Invalid Password")
    }
    else {

      axios.post(config.host + config.port + "/signup", {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .then(resp => {
        const signupMessage = resp.data.signupMessage;

        if (signupMessage === "success") {
          localStorage.setItem("username", username);
          history.push("/")
          window.location.reload();
        } else {
          setErrorMessage(resp.data.signupMessage);
        }
      })
    }
  }

  return (
      <div className="signup">
        <p>{errorMessage}</p>

        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName"
               onChange={(e) => {
                 setFirstName(e.target.value)
               }}
        />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName"
               onChange={(e) => {
                 setLastName(e.target.value)
               }}
        />

        <label for="username">Username:</label>
        <input type="text" name="username"
               onChange={(e) => {
                 setUsername(e.target.value)
               }}
        />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email"
               onChange={(e) => {
                 setEmail(e.target.value)
               }}
        />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password"
               onChange={(e) => {
                 setPassword(e.target.value)
               }}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword"
               onChange={(e) => {
                 setConfirmPassword(e.target.value)
               }}
        />

        <button className="signupButton"
                onClick={() => submitForm()}
        >
          Sign Up
        </button>
      </div>
  )

}

export default SignUp;