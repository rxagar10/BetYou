import React, {useState} from 'react';
import "../styles/header.css";
import Drawer from '@material-ui/core/Drawer';
import {makeStyles} from '@material-ui/core/styles';
import Menu from "./Menu";
import {
  BrowserRouter as Router,
  Switch, Link, Route
}
  from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import MyAccount from "./MyAccount";
import CreateBet from "./CreateBet";

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

  const useStyles = makeStyles({
    paper: {
      background: "#CDD2D8"
    }
  })

  return (
      <Router>
        <div className="header">
          <div className="menuButton" onClick={() => toggleDrawer()}>
            <div className="menuLines"/>
            <div className="menuLines"/>
            <div className="menuLines"/>
          </div>
          {/*<button className="menuButton" onClick={() => toggleDrawer()}>Menu</button>*/}
          <Drawer className="menu-drawer" open={drawerOpen}
                  onClose={() => toggleDrawer()}
                  classes={{paper: useStyles().paper}}
          >
            <Menu toggleDrawer={toggleDrawer} />
          </Drawer>
          <h1 className="BetYouTitle">BetYou</h1>
          {
            username === undefined || username === ""
                ?
                <div className="accountButtons">
                  <Link to="/signup" className="signup">Sign Up</Link>
                  <Link to="/login" className="login">Log In</Link>
                </div>
                :
                <div className="accountButtons" id="userButton" onClick={() => logOut()}>
                  {username}
                </div>
          }
        </div>

        <div className="body-page">
          <Switch>
            <Route exact path="/">
              <div>Home page</div>
            </Route>
            <Route exacct path="/signup">
              <SignUp/>
            </Route>
            <Route exacct path="/login">
              <Login/>
            </Route>
            <Route exact path="/myAccount">
              &nbsp;
              <MyAccount username={username}/>
            </Route>
            <Route exact path="/create-bet-button">
              &nbsp;
              <CreateBet username={username}/>
            </Route>
          </Switch>
        </div>
      </Router>

  )
}


export default Header;