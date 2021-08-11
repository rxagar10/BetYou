import React, {useEffect, useState} from 'react';
import InfoPopup from "./misc-components/InfoPopup";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import config from "../config";
import {useHistory} from "react-router-dom";

function CreateRec({username}) {

  // const [movie, setMovie] = useState({
  //   genres: "",
  //
  // })
  // setMovie({
  //   ...movie, genres: "sad"
  // })
  const [errorMessage, setErrorMessage] = useState("");
  const [myFriends, setMyFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  const [recType, setRecType] = useState("");

  const [tempTitle, setTempTitle] = useState("");
  const [title, setTitle] = useState("");
  const [titlesList, setTitlesList] = useState([]);

  const [genres, setGenres] = useState("");
  const [overview, setOverview] = useState("");
  const [runtime, setRuntime] = useState("");
  const [year, setYear] = useState("");
  const [numberOfSeasons, setNumberOfSeasons] = useState("");
  const [numberOfEpisodes, setNumberOfEpisodes] = useState("");

  const [image, setImage] = useState("");
  const [comments, setComments] = useState("");

  let history = useHistory()

  useEffect(() => {
    axios.post(config.host + config.port + "/createRec", {
      username
    }).then((resp) => {
      setMyFriends(resp.data.myFriends)
    })
  }, [username])

  const makeTitle = () => {
    if (recType === "") {
      return null
    } else {
      return (
          <div>
            <label htmlFor="title">Title</label>
            <input list="titles" name="title" onChange={(e) => {
              setTempTitle(e.target.value)
              const selectedTitle = titlesList.find(
                  (title) => (title.title === e.target.value))
              if (selectedTitle !== undefined) {
                setTitle(e.target.value)
                setYear(selectedTitle.year)
                setImage(selectedTitle.imagePath)
                getMovieFromTitle(selectedTitle.id)
              }
            }} value={tempTitle}/>

            <datalist id="titles">
              {
                titlesList.map(title => {
                  return (
                      <option label={" (" + title.year + ")"}
                              value={title.title}/>
                  )
                })
              }
            </datalist>

            <button onClick={() => searchTitle()}>Search</button>
          </div>
      )
    }
  }

  const getMovieFromTitle = (id) => {
    axios.post(config.host + config.port + "/getFromId", {
      id,
      recType,
    })
    .then(resp => {
      const titleInfo = resp.data.titleInfo;
      setGenres(titleInfo.genre)
      setOverview(titleInfo.overview)
      setRuntime(titleInfo.runtime)
      setNumberOfEpisodes(titleInfo.numberOfEpisodes)
      setNumberOfSeasons(titleInfo.numberOfSeasons)
    })
  }

  const searchTitle = () => {
    console.log(tempTitle)
    axios.post(config.host + config.port + "/searchTitle", {
      title: tempTitle,
      recType,
    })
    .then((resp) => {
      setTitlesList(resp.data.titlesList)
    })
  }

  const generateRecForm = () => {
    if (recType === "") {
      return <p>Select the type of recommendation</p>
    } else if (title === "") {
      return <p>Search for the title of your recommendation</p>
    } else if (recType === "Movie") {
      return (
          <div className="movieForm">
            <label htmlFor="movieGenre">Genre</label>
            <input type="text" name="movieGenre" onChange={(e) => {
              setGenres(e.target.value)
            }} value={genres}/>

            <label htmlFor="movieOverview">Overview</label>
            <input type="text" name="movieOverview" onChange={(e) => {
              setOverview(e.target.value)
            }} value={overview}/>

            <label htmlFor="movieRuntime">Runtime</label>
            <input type="text" name="movieRuntime" onChange={(e) => {
              setRuntime(e.target.value)
            }} value={runtime}/>

            <label htmlFor="movieYear">Year of Release</label>
            <input type="text" name="movieYear" onChange={(e) => {
              setYear(e.target.value)
            }} value={year}/>

            <label htmlFor="comments">Comments</label>
            <input type="text" name="comments" onChange={(e) => {
              setComments(e.target.value)
            }} value={comments}/>

            <button className="submitRec" onClick={() => submitRec()}>Send Rec
            </button>

            <img src={image} alt="Poster Image" width="400" height="auto"/>
          </div>
      )
    } else if (recType === "TVShow") {
      return (
          <div className="tvShowForm">

            <label htmlFor="tvEpisodeRunTime">Episode Run Time</label>
            <input type="text" name="tvEpisodeRunTime" onChange={(e) => {
              setRuntime(e.target.value)
            }} value={runtime}/>

            <label htmlFor="tvNumberOfSeasons">Number of Seasons</label>
            <input type="text" name="tvNumberOfSeasons" onChange={(e) => {
              setNumberOfSeasons(e.target.value)
            }} value={numberOfSeasons}/>

            <label htmlFor="tvNumberOfEpisodes">Number Of Episodes</label>
            <input type="text" name="tvNumberOfEpisodes" onChange={(e) => {
              setNumberOfEpisodes(e.target.value)
            }} value={numberOfEpisodes}/>

            <label htmlFor="tvGenres">Genres</label>
            <input type="text" name="tvGenre" onChange={(e) => {
              setGenres(e.target.value)
            }} value={genres}/>

            <label htmlFor="comments">Comments</label>
            <input type="text" name="comments" onChange={(e) => {
              setComments(e.target.value)
            }} value={comments}/>

            <button className="submitRec" onClick={() => submitRec()}>Send Rec
            </button>

            <img src={image} alt="Poster Image" width="400" height="auto"/>

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
        friendsList,
        recData: {
          sentFrom: username,
          recType,
          title,
          genre: genres,
          overview,
          runtime,
          year,
          numberOfSeasons,
          numberOfEpisodes,
          comments,
        }
      })
      .then((resp) => {
        if (resp.data.message === 'success') {
          history.push("/")
        }
      })
    }
  }

  return (
      <div className="createRec">
        <h1 className="page-header">Create Rec</h1>

        <p>{errorMessage}</p>


        <label htmlFor="friends" className="createRecFriendLabel">Send Rec to
          Friends</label>

        <Autocomplete
            multiple
            id="friends"
            className="friendsList"
            options={myFriends}
            getOptionLabel={(option) => option.firstName + " "
                + option.lastName}
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
        <input type="radio" name="recOption" id="Movie" value="Movie"
               onClick={() => {
                 setRecType("Movie")
                 setTitle("")
                 setTitlesList([])
                 setTempTitle("")
               }}/>

        <label htmlFor="TVShow">TV Show</label>
        <input type="radio" name="recOption" id="TVShow" value="TVShow"
               onClick={() => {
                 setRecType("TVShow")
                 setTitle("")
                 setTitlesList([])
                 setTempTitle("")
               }}/>

        <label htmlFor="Music">Music</label>
        <input type="radio" name="recOption" id="Music" value="Music"
               onClick={() => {
                 setRecType("Music")
                 setTitle("")
                 setTitlesList([])
                 setTempTitle("")
               }}/>

        <label htmlFor="Book">Book</label>
        <input type="radio" name="recOption" id="Book" value="Book"
               onClick={() => {
                 setRecType("Book")
                 setTitle("")
                 setTitlesList([])
                 setTempTitle("")
               }}/>

        <label htmlFor="Restaurant">Restaurant</label>
        <input type="radio" name="recOption" id="Restaurant" value="Restaurant"
               onClick={() => {
                 setRecType("Restaurant")
                 setTitle("")
                 setTitlesList([])
                 setTempTitle("")
               }}/>

        <label htmlFor="Games">Game</label>
        <input type="radio" name="recOption" id="Game" value="Game"
               onClick={() => {
                 setRecType("Game")
                 setTitle("")
                 setTitlesList([])
                 setTempTitle("")
               }}/>

        <label htmlFor="Other">Other</label>
        <input type="radio" name="recOption" id="Other" value="Other"
               onClick={() => {
                 setRecType("Other")
                 setTitle("")
                 setTitlesList([])
                 setTempTitle("")
               }}/>

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