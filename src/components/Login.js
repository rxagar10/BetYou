import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import config from "../config";


function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const changeText = (setField, text) => {
    setField(text);
  }

  const submitForm = () => {
    if (username.length === 0
        || password.length === 0) {
      setErrorMessage("Please fill in all fields")
    } else {
      axios.post(config.host + config.port + "/login", {
        username: username,
        password: password,
      })
      .then(resp => {
        const loginMessage = resp.data.loginMessage;

        if (loginMessage === "success") {
          localStorage.setItem("username", username);
          history.push("/")
          window.location.reload();
        } else {
          setErrorMessage(resp.data.loginMessage);
        }
      })
    }
  }

  return (
      <div className="signup">
        <p>{errorMessage}</p>

        <label for="username">Username:</label>
        <input type="text" name="username"
               onChange={(e) => {
                 changeText(setUsername, e.target.value)
               }}
        />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password"
               onChange={(e) => {
                 changeText(setPassword, e.target.value)
               }}
        />

        <button className="loginButton"
                onClick={() => submitForm()}
        >
          Login
        </button>
      </div>
  )
}

export default Login;