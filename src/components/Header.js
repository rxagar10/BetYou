import React, { useState } from 'react';
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
import CreateRec from "./CreateRec";
import Friends from "./Friends";
import MyBets from "./MyBets";

function Header(props) {

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

  return (
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
          <h1 className="RecommenderTitle">Recommender</h1>
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
            <Route exact path="/create-rec-button">
              &nbsp;
              <CreateRec username={username} friend={friend}/>
            </Route>
            <Route exact path="/friends">
              &nbsp;
              <Friends username={username} getFriend={getFriend}/>
            </Route>
            <Route exact path="/myRecs">
              &nbsp;
              <MyBets username={username}/>
            </Route>
          </Switch>
        </div>
      </Router>

  )
}


export default Header;