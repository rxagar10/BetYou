import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from "../config";
import {useHistory} from 'react-router-dom';
import {Modal} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "../styles/friends.scss";

function Friends({username, getFriend}) {

  const [myFriends, setMyFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [sendRequestModal, setSendRequestModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (username !== "") {
      axios.post(config.host + config.port + "/friends", {
        username,
      })
      .then(resp => {
        setMyFriends(resp.data.myFriends);
        setPendingFriends(resp.data.pendingFriends);
        setAllUsers(resp.data.allUsers);
      })
    }
  }, [username])

  const togglePendingModal = () => {
    setPendingModalOpen(!pendingModalOpen);
  }

  const toggleSendRequestModal = () => {
    setSendRequestModal(!sendRequestModal);
  }

  const makeListOfFriends = () => {
    return (
        <div className="friendsList">
          {
            myFriends.map(friend => {
              return (
                  <div className="friend">
                    <h3 className="friendName">{friend.firstName + " "
                    + friend.lastName} | {friend.username}</h3>
                    <button className="recFriendButton" onClick={() => {
                      getFriend(friend.username);
                      history.push("/create-rec-button");

                    }}>Send a Rec
                    </button>
                  </div>
              )
            })
          }
        </div>
    )
  }

  const makePendingFriendsList = () => {
    if (pendingFriends.length === 0) {
      return <p>No Pending Friend Requests</p>
    }
    return (
        <div>
          <h2 className="friendsModalTitle">Pending Requests</h2>
          {
            pendingFriends.map(friend => {
              return (
                  <div className="pendingFriend">
                    <h3 className="pendingFriendName">{friend.firstName + " "
                    + friend.lastName} | {friend.username}</h3>
                    <button
                        className="handlePendingButton accept"
                        onClick={() => handlePending("accept", friend.username)}
                    >
                      Accept
                    </button>
                    <button
                        className="handlePendingButton decline"
                        onClick={() => handlePending("decline",
                            friend.username)}
                    >
                      Decline
                    </button>
                  </div>
              )
            })
          }
        </div>
    )
  }

  const handlePending = (status, friendUsername) => {
    axios.post(config.host + config.port + "/pendingStatus", {
      username,
      friendUsername,
      status,
    })
    .then(resp => {
      setMyFriends(resp.data.myFriends);
      setPendingFriends(resp.data.pendingFriends);
      setAllUsers(resp.data.allUsers);
    })
  }

  const makeFriendRequest = () => {
    let friendUser = "";
    return (
        <div>
          <h2 className="friendsModalTitle">Send Friend Request</h2>
          <Autocomplete
              id="friendRequestInput"
              value={friendUser}
              className="friendRequestInputBox"
              options={allUsers}
              getOptionLabel={(option) => option === "" ? "" : option.firstName
                  + " " + option.lastName + " | " + option.username}
              onChange={(event, newValue) => {
                friendUser = newValue;
              }}
              renderInput={(params) =>
                  <TextField {...params} label="Friends" variant="outlined"/>
              }
          />
          <button
              className="sendRequestButton"
              onClick={() => {
                sendRequest(friendUser)
                friendUser = "";
              }}
          >Submit Friend Request
          </button>
        </div>
    )
  }

  const sendRequest = (friend) => {
    if (friend !== "") {
      axios.post(config.host + config.port + "/sendRequest", {
        username,
        friend,
      })
      .then((resp) => {
        setMyFriends(resp.data.myFriends);
        setPendingFriends(resp.data.pendingFriends);
        setAllUsers(resp.data.allUsers);
      })
    }
  }

  return (
      <div className="friends">

        <button className="pendingFriendRequests"
                onClick={() => togglePendingModal()}>Pending Requests
        </button>
        <Modal
            open={pendingModalOpen}
            onClose={() => togglePendingModal()}
        >
          <div className="friendsModal">
            {makePendingFriendsList()}
          </div>
        </Modal>

        <button className="sendFriendRequest"
                onClick={() => toggleSendRequestModal()}>Send Requests
        </button>
        <Modal
            open={sendRequestModal}
            onClose={() => toggleSendRequestModal()}
        >
          <div className="friendsModal">
            {makeFriendRequest()}
          </div>
        </Modal>

        {makeListOfFriends()}
      </div>
  )
}

export default Friends;