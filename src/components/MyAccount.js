import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

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
      <div>
        <h1>My Account</h1>

        <h4>Username: </h4>
        <span>{props.username}</span>

        <h4>Account Balance: </h4>
        <span>${accountBalance}</span>

        <h4>Email: </h4>
        <span>{email}</span>

        <h4>Bets Won: </h4>
        <span>{betsWon}</span>

        <h4>Bets Lost: </h4>
        <span>{betsLost}</span>

        <h4>Bets Witnessed: </h4>
        <span>{betsWitnessed}</span>
      </div>
  )
}

export default MyAccount;