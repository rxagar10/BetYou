import React from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css";


function Menu(props) {

  return (
      <ul className="menu-links">
        <li>
          <Link to="/create-rec-button" id="create-rec-button" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getFriend("")
                }}
          >Create Rec</Link>
        </li>
        <li>
          <Link to="/" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getFriend("")
                }}
          >Home</Link>
        </li>
        <li>
          <Link to="/myAccount" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getFriend("")
                }}
          >My Account</Link>
        </li>
        <li>
          <Link to="/friends" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getFriend("")
                }}
          >Friends</Link>
        </li>
        <li>
          <Link to="/myRecs" className="menu-item"
                onClick={() => {
                  props.toggleDrawer();
                  props.getFriend("")
                }}
          >My Recs</Link>
        </li>
      </ul>
  )
}

export default Menu;