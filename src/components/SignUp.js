import React, { useState } from 'react';
import axios from "axios";

function SignUp(props) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changeText = (setField, text) => {
    setField(text);
  }

  const submitForm = () => {

  }

  return (
      <div className="signup">
        <label for="username">Username:</label>
        <input type="text" name="username"
               onChange={(e) => {
                 changeText(setUsername, e.target.value)
               }}
        />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email"
               onChange={(e) => {
                 changeText(setEmail, e.target.value)
               }}
        />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" minLength="5" required
               onChange={(e) => {
                 changeText(setPassword, e.target.value)
               }}
        />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" name="confirmPassword" minLength="5" required
               onChange={(e) => {
                 changeText(setConfirmPassword, e.target.value)
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