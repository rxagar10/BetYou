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
import Login from "./Login";
import MyAccount from "./MyAccount";

function Header(props) {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState(
      localStorage.getItem("username") || "");

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  }

  const logOut = () => {
    setUsername("")
    localStorage.setItem("username", "");
  }

  return (
      <Router>
        <div className="header">
          <button onClick={() => toggleDrawer()}>Menu</button>
          <Drawer className="menu-drawer" open={drawerOpen}
                  onClose={() => toggleDrawer()}>
            <Menu />
          </Drawer>
          <h1>BetYou</h1>
          {
            username === undefined || username === ""
                ?
                <div>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/login">Log In</Link>
                </div>
                :
                <a onClick={() => logOut()}>
                  {username}
                </a>
          }
        </div>

        <div className="main-page">
          <Switch>
            <Route exact path="/">
              <div>Home page</div>
            </Route>
            <Route exacct path="/signup">
              <SignUp />
            </Route>
            <Route exacct path="/login">
              <Login />
            </Route>
            <Route exact path="/myAccount">
              <MyAccount username={username} />
            </Route>
          </Switch>
        </div>
      </Router>

  )
}

export default Header;