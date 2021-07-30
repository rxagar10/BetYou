import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from "../config";
import {useHistory} from 'react-router-dom';
import {Modal} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function Friends(props) {

  const [myFriends, setMyFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [pendingModalOpen, setPendingModalOpen] = useState(false);
  const [sendRequestModal, setSendRequestModal] = useState(false);

  let history = useHistory();

  useEffect(() => {
    axios.post(config.host + config.port + "/friends", {
      username: props.username,
    })
    .then(resp => {
      setMyFriends(resp.data.myFriends);
      setPendingFriends(resp.data.pendingFriends);
      setAllUsers(resp.data.allUsers);
    })
  }, [])

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
                    <h3>{friend.firstName + " " + friend.lastName}</h3>
                    <p>{friend.username}</p>
                    <button className="recFriendButton" onClick={() => {
                      props.getFriend(friend.username);
                      history.push("/create-rec-button");

                    }}>Send a Rec to This Friend
                    </button>
                  </div>
              )
            })
          }
        </div>
    )
  }

  const makePendingFriendsList = () => {
    return (
        <div>
          {
            pendingFriends.map(friend => {
              return (
                  <div>
                    <h3>{friend.firstName + " " + friend.lastName}</h3>
                    <p>{friend.username}</p>
                    <button onClick={() => handlePending("accept",
                        friend.username)}>Accept
                    </button>
                    <button onClick={() => handlePending("decline",
                        friend.username)}>Decline
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
      username: props.username,
      friendUsername: friendUsername,
      status: status,
    })
    .then(resp => {
      setMyFriends(resp.data.myFriends);
      setPendingFriends(resp.data.pendingFriends);
    })
  }

  const makeFriendRequest = () => {
    let friendUser = "";
    return (
        <div>
          <Autocomplete
              id="friendRequestInput"
              value={friendUser}
              className="friendRequestInputBox"
              options={allUsers}
              getOptionLabel={(option) => option === "" ? "" : option.firstName + " " + option.lastName + " | " + option.username}
              onChange={(event, newValue) => {
                friendUser = newValue;
              }}
              renderInput={(params) =>
                  <TextField {...params} label="Friends" variant="outlined"/>
              }
          />
          <button onClick={() => {
            sendRequest(friendUser)
            friendUser = "";
          }}>Submit Friend Request</button>
        </div>
    )
  }

  const sendRequest = (friend) => {
    axios.post(config.host + config.port + "/sendRequest", {
      username: props.username,
      friend: friend,
    })
    .then((resp) => {
      setAllUsers(resp.data.allUsers);
    })
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
          <div style={{
            position: "absolute",
            backgroundColor: "white",
            width: "60%",
            height: "60%",
            left: "20%",
            top: "20%"
          }}>
            {makePendingFriendsList()}
          </div>
        </Modal>

        <button className="sendFriendRequest"
                onClick={() => toggleSendRequestModal()}>Send Friend Requests
        </button>
        <Modal
            open={sendRequestModal}
            onClose={() => toggleSendRequestModal()}
        >
          <div style={{
            position: "absolute",
            backgroundColor: "white",
            width: "60%",
            height: "60%",
            left: "20%",
            top: "20%"
          }}>
            {makeFriendRequest()}
          </div>
        </Modal>

        {makeListOfFriends()}
      </div>
  )
}

export default Friends;