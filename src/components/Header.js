import React, { useState } from 'react';
import "../styles/header.scss";
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
import CreateRec from "./CreateRec";
import Friends from "./Friends";
import MyRecs from "./MyRecs";
import Home from "./Home";
import InfoPopup from "./misc-components/InfoPopup";

function Header() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState(
      localStorage.getItem("username") || "");
  const [friend, setFriend] = useState(localStorage.getItem("friend") || "");

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

  const getFriend = (fri) => {
    setFriend(fri);
    localStorage.setItem("friend", fri)
  }

  const checkSignedIn = (comp) => {
    if (username === "") {
      return (
          <div>
            <Link to="/signup" className="signup">Sign Up</Link>
            <Link to="/login" className="login">Log In</Link>
          </div>
      )
    } else {
      return comp;
    }
  }


  return (
      <div className="page">
      <Router>
        <div className="header">
          <div className="menuButton" onClick={() => toggleDrawer()}>
            <div className="menuLines"/>
            <div className="menuLines"/>
            <div className="menuLines"/>
          </div>
          <Drawer className="menu-drawer" open={drawerOpen}
                  onClose={() => toggleDrawer()}
                  classes={{paper: useStyles().paper}}
          >
            <Menu toggleDrawer={toggleDrawer} getFriend={getFriend} />
          </Drawer>
          <h1 className="RecommenderTitle"><a href={"/"}>Recommendr</a></h1>
          {/*
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
          */}

          <Link to="/create-rec-button" id="create-rec-button" className="menu-item"
                onClick={() => {
                  getFriend("")
                }}
          >Create Rec</Link>
        </div>

        <div className="body-page">
          <Switch>
            <Route exact path="/">
              {checkSignedIn(<Home username={username} />)}
            </Route>
            <Route exact path="/signup">
              <SignUp/>
            </Route>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/myAccount">
              &nbsp;
              {checkSignedIn(<MyAccount username={username} logOut={logOut}/>)}
            </Route>
            <Route exact path="/create-rec-button">
              &nbsp;
              {checkSignedIn(<CreateRec username={username} friend={friend}/>)}
            </Route>
            <Route exact path="/friends">
              &nbsp;
              {checkSignedIn(<Friends username={username} getFriend={getFriend}/>)}
            </Route>
            {/*<Route exact path="/myRecs">*/}
            {/*  &nbsp;*/}
            {/*  {checkSignedIn(<MyRecs username={username}/>)}*/}
            {/*</Route>*/}
          </Switch>
        </div>
      </Router>
      </div>
  )
}


export default Header;