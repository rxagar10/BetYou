import React, {useState} from 'react';
import "../styles/header.css";
import Drawer from '@material-ui/core/Drawer';
import Menu from "./Menu";
import {
  BrowserRouter as Router,
  Switch, Link, Route
}
  from "react-router-dom";
import SignUp from "./SignUp";

function Header(props) {

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  return (
      <Router>
        <div className="header">
          <button onClick={() => toggleDrawer()}>Menu</button>
          <Drawer className="menu-drawer" open={drawerOpen} onClose={() => toggleDrawer()}>
            <Menu/>
          </Drawer>
          <h1>BetYou</h1>
          <Link to="/sign-up">Sign Up</Link>
          <Link>Log In</Link>
        </div>

        <div className="main-page">
          <Switch>
            <Route exact path="/">
              <div>Home page</div>
            </Route>
            <Route exacct path="/sign-up">
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Router>

  )
}

export default Header;