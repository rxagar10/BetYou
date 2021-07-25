import React from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css";


function Menu(props) {

  return (
      <ul className="menu-links">
        <li>
          <Link to="/create-bet-button" id="create-bet-button" className="menu-item" onClick={() => props.toggleDrawer()}>Create Bet</Link>
        </li>
        <li>
          <Link to="/" className="menu-item" onClick={() => props.toggleDrawer()}>Home</Link>
        </li>
        <li>
          <Link to="/myAccount" className="menu-item" onClick={() => props.toggleDrawer()}>My Account</Link>
        </li>
        <li>
          <Link className="menu-item" onClick={() => props.toggleDrawer()}>Friends</Link>
        </li>
        <li>
          <Link className="menu-item" onClick={() => props.toggleDrawer()}>Current Bets</Link>
        </li>
        <li>
          <Link className="menu-item" onClick={() => props.toggleDrawer()}>Bet History</Link>
        </li>
      </ul>
  )
}

export default Menu;