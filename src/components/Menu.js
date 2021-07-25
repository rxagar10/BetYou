import React from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css";


function Menu(props) {

  return (
      <ul className="menu-links">
        <li>
          <Link to="/create-bet-button" id="create-bet-button" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getBetFriend("")
                }}
          >Create Bet</Link>
        </li>
        <li>
          <Link to="/" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getBetFriend("")
                }}
          >Home</Link>
        </li>
        <li>
          <Link to="/myAccount" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getBetFriend("")
                }}
          >My Account</Link>
        </li>
        <li>
          <Link to="/friends" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getBetFriend("")
                }}
          >Friends</Link>
        </li>
        <li>
          <Link className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getBetFriend("")
                }}
          >My Bets</Link>
        </li>
      </ul>
  )
}

export default Menu;