import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch
} from "react-router-dom";
import "../styles/menu.css";


function Menu(props) {

  return (
      <ul className="menu-links">
        <li>
          <Link id="create-bet-button" className="menu-item">Create Bet</Link>
        </li>
        <li>
          <Link className="menu-item">Home</Link>
        </li>
        <li>
          <Link className="menu-item">My Account</Link>
        </li>
        <li>
          <Link className="menu-item">Friends</Link>
        </li>
        <li>
          <Link className="menu-item">Current Bets</Link>
        </li>
        <li>
          <Link className="menu-item">Bet History</Link>
        </li>
      </ul>
  )
}

export default Menu;