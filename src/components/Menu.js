import React from "react";
import { Link } from "react-router-dom";
import "../styles/menu.css";


function Menu({ toggleDrawer, getFriend}) {

  return (
      <ul className="menu-links">
        <li>
          <Link to="/" className="menu-item"
                onClick={() => {
                  toggleDrawer();
                  getFriend("")
                }}
          >Home</Link>
        </li>

        <li>
          <Link to="/friends" className="menu-item"
                onClick={() => {
                  toggleDrawer();
                  getFriend("")
                }}
          >Friends</Link>
        </li>

        <li>
          <Link to="/myAccount" className="menu-item"
                onClick={() => {
                  toggleDrawer();
                  getFriend("")
                }}
          >My Account</Link>
        </li>
        {/*<li>*/}
        {/*  <Link to="/myRecs" className="menu-item"*/}
        {/*        onClick={() => {*/}
        {/*          toggleDrawer();*/}
        {/*          getFriend("")*/}
        {/*        }}*/}
        {/*  >My Recs</Link>*/}
        {/*</li>*/}
      </ul>
  )
}

export default Menu;