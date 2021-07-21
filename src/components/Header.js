import React, { useState } from 'react';
import "../styles/header.css";
import Drawer from '@material-ui/core/Drawer';
import Menu from "./Menu";
import {
  BrowserRouter as Router,
  Switch, Link, Route }
  from "react-router-dom";
import SignUp from "./SignUp";

function Header(props) {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
      <div className="header">
        <button onClick={() => toggleDrawer()}>Menu</button>
        <Drawer open={drawerOpen} onClose={() => toggleDrawer()}>
          <Menu />
        </Drawer>
        <h1>BetYou</h1>

        <Router>
          <Link to="/sign-up">Sign Up</Link>
          <Link>Log In</Link>

          <Switch>
            <Route path="/sign-up">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </div>
  )
}

export default Header;