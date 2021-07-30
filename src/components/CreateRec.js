import React, { useState } from 'react';
import InfoPopup from "./misc-components/InfoPopup";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import config from "../config";

function CreateRec(props) {

  const [errorMessage, setErrorMessage] = useState("");
  const [myFriends, setMyFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const [recType, setRecType] = useState("");

  const [tempTitle, setTempTitle] = useState("");
  const [title, setTitle] = useState("");
  const [titlesList, setTitlesList] = useState([]);

  const [genres, setGenres] = useState([]);
  const [overview, setOverview] = useState("");
  const [runtime, setRuntime] = useState("");
  const [year, setYear] = useState("");
  const [numberOfSeasons, setNumberOfSeasons] = useState("");
  const [numberOfEpisodes, setNumberOfEpisodes] = useState("");
  const [comments, setComments] = useState("");

  const makeTitle = () => {
    if (recType === "") {
      return null
    } else {
      return (
          <div>
            <label htmlFor="title">Title</label>
            <input list="titles" name="title" onChange={(e) => setTempTitle(e.target.value)}/>

            <datalist id="titles">
              {
                titlesList.map(title => {
                  return <option value={title.title + " (" + title.year + ")"} onClick={() => setTitle(title.title)} />
                })
              }
            </datalist>

            <button onClick={() => searchTitle()}>Search</button>
          </div>
      )
    }
  }

  const searchTitle = () => {
    axios.post(config.host + config.port + "/searchTitle", {
      title
    })
    .then((resp) => {
      setTitlesList(resp.data.titlesList)
    })
  }

  const generateRecForm = () => {
    console.log(title)
    console.log(recType)
    if (recType === "") {
      return <p>Select the type of recommendation</p>
    } else if (title === "") {
      return <p>Search for the title of your recommendation</p>
    } else if (recType === "Movie") {
      return (
          <div className="movieForm">
            <label htmlFor="movieGenre">Genre</label>
            <input type="text" name="movieGenre" />

            <label htmlFor="movieOverview">Overview</label>
            <input type="text" name="movieOverview" />

            <label htmlFor="movieRuntime">Runtime</label>
            <input type="text" name="movieRuntime" />

            <label htmlFor="movieYear">Year of Release</label>
            <input type="text" name="movieYear" />

            <label htmlFor="comments">Comments</label>
            <input type="text" name="comments" />

            <button className="submitRec" onClick={() => submitRec()}>Send Rec</button>
          </div>
      )
    } else if (recType === "TVShow") {
      return (
          <div className="tvShowForm">

            <label htmlFor="tvEpisodeRunTime">Episode Run Time</label>
            <input type="text" name="tvEpisodeRunTime" />

            <label htmlFor="tvNumberOfSeasons">Number of Seasons</label>
            <input type="text" name="tvNumberOfSeasons" />

            <label htmlFor="tvNumberOfEpisodes">Number Of Episodes</label>
            <input type="text" name="tvNumberOfEpisodes" />

            <label htmlFor="tvGenres">Genres</label>
            <input type="text" name="tvGenre" />

            <label htmlFor="comments">Comments</label>
            <input type="text" name="comments" />

            <button className="submitRec" onClick={() => submitRec()}>Send Rec</button>

          </div>
      )
    } else if (recType === "Music") {

    } else if (recType === "Book") {

    } else if (recType === "Restaurant") {

    } else if (recType === "Game") {

    } else if (recType === "Other") {

    }
  }

  const submitRec = () => {
    if (title === "" || friendsList.length === 0) {
      setErrorMessage("Please fill in the required fields")
    } else {
      axios.post(config.host + config.port + "/submitRec", {
        username: props.username,
        recType,
        title,
        genres,
        overview,
        runtime,
        year,
        numberOfSeasons,
        numberOfEpisodes,
        comments,
        friendsList,
      })
      .then((resp) => {

      })
    }
  }

  return (
      <div className="createRec">
        <h1 className="page-header">Create Rec</h1>

        <p>{errorMessage}</p>


        <label htmlFor="friends" className="createRecFriendLabel">Send Rec to Friends</label>

        <Autocomplete
            multiple
            id="friends"
            className="friendsList"
            options={myFriends}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => {
              if (friendsList.includes(newValue)) {
                setFriendsList(friendsList.filter(fri => fri !== newValue))
              } else {
                setFriendsList([...friendsList, newValue])
              }

            }}
            renderInput={(params) =>
                <TextField {...params} label="Friends" variant="outlined"/>}
        />

        <label htmlFor="Movie">Movie</label>
        <input type="radio" name="recOption" id="Movie" value="Movie" onClick={() => setRecType("Movie")}/>

        <label htmlFor="TVShow">TV Show</label>
        <input type="radio" name="recOption" id="TVShow" value="TVShow" onClick={() => setRecType("TVShow")}/>

        <label htmlFor="Music">Music</label>
        <input type="radio" name="recOption" id="Music" value="Music" onClick={() => setRecType("Music")}/>

        <label htmlFor="Book">Book</label>
        <input type="radio" name="recOption" id="Book" value="Book" onClick={() => setRecType("Book")}/>

        <label htmlFor="Restaurant">Restaurant</label>
        <input type="radio" name="recOption" id="Restaurant" value="Restaurant" onClick={() => setRecType("Restaurant")}/>

        <label htmlFor="Games">Game</label>
        <input type="radio" name="recOption" id="Game" value="Game" onClick={() => setRecType("Game")}/>

        <label htmlFor="Other">Other</label>
        <input type="radio" name="recOption" id="Other" value="Other" onClick={() => setRecType("Other")}/>

        {
          makeTitle()
        }

        {
          generateRecForm()
        }
      </div>
  )
}


export default CreateRec;