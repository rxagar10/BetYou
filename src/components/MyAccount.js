import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config';
import "../styles/myAccount.css";

function MyAccount(props) {

  const [email, setEmail] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [betsWon, setBetsWon] = useState(0)
  const [betsLost, setBetsLost] = useState(0)
  const [betsWitnessed, setBetsWitnessed] = useState(0)

  useEffect(() => {
    axios.post(config.host + config.port + "/myAccount", {
      username: props.username,
    })
    .then(resp => {
      setEmail(resp.data.email);
      setAccountBalance(resp.data.accountBalance);
      setBetsWon(resp.data.betsWon);
      setBetsLost(resp.data.betsLost);
      setBetsWitnessed(resp.data.betsWitnessed)
    })
  })

  return (
      <div className="myAccount">
        <h1 className="page-header">My Account</h1>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Username: </h4>
          <span className="myAccountItem">{props.username}</span>
        </div>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Account Balance: </h4>
          <span className="myAccountItem">${accountBalance}</span>
        </div>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Email: </h4>
          <span className="myAccountItem">{email}</span>
        </div>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Bets Won: </h4>
          <span className="myAccountItem">{betsWon}</span>
        </div>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Bets Lost: </h4>
          <span className="myAccountItem">{betsLost}</span>
        </div>

        <div className="myAccountStat">
          <h4 className="myAccountItemTitle">Bets Witnessed: </h4>
          <span className="myAccountItem">{betsWitnessed}</span>
        </div>

      </div>
  )
}

export default MyAccount;