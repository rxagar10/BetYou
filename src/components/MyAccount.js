import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import "../styles/myAccount.scss";
import MyRecs from "./MyRecs";

function MyAccount({ username, logOut }) {

  const [email, setEmail] = useState("");

  useEffect(() => {
    axios.post(config.host + config.port + "/myAccount", {
      username,
    })
    .then(resp => {
      setEmail(resp.data.email);
    })
  }, [username])

  return (
      <div className="myAccount">
        <h1 className="page-header">My Account</h1>

        <div className="myAccountDiv">
          <h4 className="myAccountItemTitle">Username: </h4>
          <span className="myAccountItem">{username}</span>
        </div>

        <div className="myAccountDiv">
          <h4 className="myAccountItemTitle">Email: </h4>
          <span className="myAccountItem">{email}</span>
        </div>

        <button className="logOutButton" onClick={() => logOut()}>Log Out</button>

        <MyRecs username={username} />

      </div>
  )
}

export default MyAccount;