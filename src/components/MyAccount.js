import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import "../styles/myAccount.css";

function MyAccount({ username }) {

  const [email, setEmail] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    axios.post(config.host + config.port + "/myAccount", {
      username,
    })
    .then(resp => {
      setEmail(resp.data.email);
      setAccountBalance(resp.data.accountBalance);
    })
  }, [username])

  return (
      <div className="myAccount">
        <h1 className="page-header">My Account</h1>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Username: </h4>
          <span className="myAccountItem">{username}</span>
        </div>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Email: </h4>
          <span className="myAccountItem">{email}</span>
        </div>

      </div>
  )
}

export default MyAccount;