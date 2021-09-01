import React, {useEffect, useState} from 'react';
import "../styles/createRec.scss"
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import config from "../config";
import {useHistory} from "react-router-dom";
import {recOptions} from "../App";

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

  const [recType, setRecType] = useState(null);

  const [state, setState] = useState("")

  const [tempTitle, setTempTitle] = useState("");
  const [title, setTitle] = useState("");
  const [titlesList, setTitlesList] = useState([]);

  const [genres, setGenres] = useState("");
  const [overview, setOverview] = useState("");
  const [runtime, setRuntime] = useState("");
  const [year, setYear] = useState("");
  const [numberOfSeasons, setNumberOfSeasons] = useState("");
  const [numberOfEpisodes, setNumberOfEpisodes] = useState("");

  const [musicType, setMusicType] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [numAlbums, setNumAlbums] = useState("")
  const [numTracks, setNumTracks] = useState("")
  const [explicit, setExplicit] = useState("")
  const [share, setShare] = useState("")

  const [pageCount, setPageCount] = useState("");

  const [priceRange, setPriceRange] = useState("");

  const [image, setImage] = useState("");
  const [comments, setComments] = useState("");

  let history = useHistory()

  useEffect(() => {
    axios.post(config.host + config.port + "/createRec", {
      username
    }).then((resp) => {
      setMyFriends(
          [{firstName: "All Friends", lastName: ""}, ...resp.data.myFriends])
    })
  }, [username])

  const makeTitle = () => {
    if (recType === null) {
      return null
    } else if (recType === recOptions.OTHER) {
      return (
          <div className="titleDiv">
            <label htmlFor="title">Title</label>
            <input list="titles" name="title" onChange={(e) => {
              setTempTitle(e.target.value)}} value={tempTitle}/>

            <button onClick={() => setTitle(tempTitle)}>Search</button>
          </div>
      )
    } else {
      return (
          <div className="titleDiv">
            <label htmlFor="title">Title</label>
            <input list="titles" name="title" onChange={(e) => {
              setTempTitle(e.target.value)
              const selectedTitle = titlesList.find(
                  (title) => (title.title === e.target.value))
              if (selectedTitle !== undefined) {
                setTitle(e.target.value)
                setYear(selectedTitle.year)
                setImage(selectedTitle.imagePath)
                if (selectedTitle.overview) {
                  setOverview(selectedTitle.overview)
                }
                getFromTitle(selectedTitle.id)
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
            {
              recType === recOptions.REST ?
                  <div>
                    <label htmlFor="stateInput">
                      State
                    </label>
                    <input type="text"
                           onChange={(e) => setState(e.target.value)}
                           name="stateInput"/>
                  </div>
                  : null
            }

            <button onClick={() => searchTitle()}>Search</button>
          </div>
      )
    }
  }

  const searchTitle = () => {
    axios.post(config.host + config.port + "/searchTitle", {
      title: tempTitle,
      recType,
      musicType,
      state,
    })
    .then((resp) => {
      setTitlesList(resp.data.titlesList)
    })
  }

  const getFromTitle = (id) => {
    axios.post(config.host + config.port + "/getFromId", {
      id,
      recType,
      musicType,
    })
    .then(resp => {
      const titleInfo = resp.data.titleInfo;
      setGenres(titleInfo.genre)
      setOverview(titleInfo.overview)
      setRuntime(titleInfo.runtime)
      setNumberOfEpisodes(titleInfo.numberOfEpisodes)
      setNumberOfSeasons(titleInfo.numberOfSeasons)
      setArtist(titleInfo.artist)
      setAlbum(titleInfo.album)
      setNumAlbums(titleInfo.numberOfAlbum)
      setNumTracks(titleInfo.numberOfTracks)
      setExplicit(titleInfo.explicit)
      setShare(titleInfo.share)
      setPageCount(titleInfo.pageCount)
      setPriceRange(titleInfo.priceRange)
      if (titleInfo.image) {
        setImage(titleInfo.image)
      }
      if (titleInfo.year) {
        setYear(titleInfo.year)
      }
    })
  }

  const generateRecForm = () => {
    if (recType === null) {
      return <p>Select the type of recommendation</p>
    } else if (recType === recOptions.MUSIC && musicType === "") {
      return <p>Select the type of music recommendation</p>
    } else if (title === "") {
      return <p>Search for the title of your recommendation</p>
    } else if (recType === recOptions.MOVIE) {
      return (
          <div className="recForm movieForm">
            <label htmlFor="movieGenre" className="formLabel">Genre</label>
            <input type="text" name="movieGenre" className="formInput" onChange={(e) => {
              setGenres(e.target.value)
            }} value={genres}/>
            <br/>

            <label htmlFor="movieOverview" className="formLabel">Overview</label>
            <textarea name="movieOverview" className="formInput" onChange={(e) => {
              setOverview(e.target.value)
            }} value={overview}/>
            <br/>

            <label htmlFor="movieRuntime" className="formLabel">Runtime</label>
            <input type="text" name="movieRuntime" className="formInput" onChange={(e) => {
              setRuntime(e.target.value)
            }} value={runtime}/>
            <br/>

            <label htmlFor="movieYear" className="formLabel">Year of Release</label>
            <input type="text" name="movieYear" className="formInput" onChange={(e) => {
              setYear(e.target.value)
            }} value={year}/>
            <br/>

            <label htmlFor="comments" className="formLabel">Comments</label>
            <input type="text" name="comments" className="formInput" onChange={(e) => {
              setComments(e.target.value)
            }} value={comments}/>
            <br/>

            <button className="submitRec" onClick={() => submitRec()}>Send Rec
            </button>
            <br/>

            <img src={image} className="recImage" alt="Poster Image" width="400" height="auto"/>
          </div>
      )
    } else if (recType === recOptions.TVSHOW) {
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
    } else if (recType === recOptions.MUSIC) {
      switch (musicType) {
        case "artist":
          return (
              <div className="musicForm">
                <label htmlFor="numAlbums">Number of Albums</label>
                <input type="text" name="numAlbums" onChange={(e) => {
                  setNumAlbums(e.target.value)
                }} value={numAlbums}/>
                <label htmlFor="comments">Comments</label>
                <input type="text" name="comments" onChange={(e) => {
                  setComments(e.target.value)
                }} value={comments}/>

                <button className="submitRec" onClick={() => submitRec()}>Send
                  Rec
                </button>

                <img src={image} alt="Poster Image" width="400"
                     height="auto"/>
              </div>
          )
          break;
        case "album":
          return (
              <div className="musicForm">
                <label htmlFor="artist">Artist</label>
                <input type="text" name="artist" onChange={(e) => {
                  setArtist(e.target.value)
                }} value={artist}/>
                <label htmlFor="numTracks">Number of Tracks</label>
                <input type="text" name="numTracks" onChange={(e) => {
                  setNumTracks(e.target.value)
                }} value={numTracks}/>
                <label htmlFor="genre">Genre</label>
                <input type="text" name="genre" onChange={(e) => {
                  setGenres(e.target.value)
                }} value={genres}/>
                <label htmlFor="year">Year</label>
                <input type="text" name="year" onChange={(e) => {
                  setYear(e.target.value)
                }} value={year}/>
                <label htmlFor="explicit">Explicit?</label>
                <input type="text" name="explicit" onChange={(e) => {
                  setExplicit(e.target.value)
                }} value={explicit}/>
                <label htmlFor="comments">Comments</label>
                <input type="text" name="comments" onChange={(e) => {
                  setComments(e.target.value)
                }} value={comments}/>

                <button className="submitRec" onClick={() => submitRec()}>Send
                  Rec
                </button>

                <img src={image} alt="Poster Image" width="400"
                     height="auto"/>
              </div>
          )
          break;
        case "track":
          return (
              <div className="musicForm">
                <label htmlFor="artist">Artist</label>
                <input type="text" name="artist" onChange={(e) => {
                  setArtist(e.target.value)
                }} value={artist}/>
                <label htmlFor="album">Album</label>
                <input type="text" name="album" onChange={(e) => {
                  setAlbum(e.target.value)
                }} value={album}/>
                <label htmlFor="year">Year</label>
                <input type="text" name="year" onChange={(e) => {
                  setYear(e.target.value)
                }} value={year}/>
                <label htmlFor="explicit">Explicit?</label>
                <input type="text" name="explicit" onChange={(e) => {
                  setExplicit(e.target.value)
                }} value={explicit}/>
                <label htmlFor="share">Share Link</label>
                <input type="text" name="share" onChange={(e) => {
                  setShare(e.target.value)
                }} value={share}/>
                <label htmlFor="comments">Comments</label>
                <input type="text" name="comments" onChange={(e) => {
                  setComments(e.target.value)
                }} value={comments}/>
                <button className="submitRec" onClick={() => submitRec()}>Send
                  Rec
                </button>

                <img src={image} alt="Poster Image" width="400"
                     height="auto"/>
              </div>
          )
          break;
      }
    } else if (recType === recOptions.BOOK) {
      return (
          <div className="booksForm">
            <label htmlFor="booksAuthor">Author</label>
            <input type="text" name="booksAuthor" onChange={(e) => {
              setArtist(e.target.value)
            }} value={artist}/>

            <label htmlFor="booksGenre">Genre</label>
            <input type="text" name="booksGenre" onChange={(e) => {
              setGenres(e.target.value)
            }} value={genres}/>

            <label htmlFor="booksOverview">Overview</label>
            <input type="text" name="booksOverview" onChange={(e) => {
              setOverview(e.target.value)
            }} value={overview}/>

            <label htmlFor="booksPageCount">Page Count</label>
            <input type="text" name="booksPageCount" onChange={(e) => {
              setPageCount(e.target.value)
            }} value={pageCount}/>

            <label htmlFor="booksYear">Year</label>
            <input type="text" name="booksYear" onChange={(e) => {
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
    } else if (recType === recOptions.REST) {
      return (
          <div className="restForm">
            <label htmlFor="restCuisine">Cuisine</label>
            <input type="text" name="restCuisine" onChange={(e) => {
              setGenres(e.target.value)
            }} value={genres}/>

            <label htmlFor="restAddress">Address</label>
            <input type="text" name="restAddress" onChange={(e) => {
              setOverview(e.target.value)
            }} value={overview}/>

            <label htmlFor="restPriceRange">Price Range</label>
            <input type="text" name="restPriceRange" onChange={(e) => {
              setPriceRange(e.target.value)
            }} value={priceRange}/>

            <label htmlFor="restWebsite">Website</label>
            <input type="text" name="restWebsite" onChange={(e) => {
              setShare(e.target.value)
            }} value={share}/>

            <label htmlFor="comments">Comments</label>
            <input type="text" name="comments" onChange={(e) => {
              setComments(e.target.value)
            }} value={comments}/>

            <button className="submitRec" onClick={() => submitRec()}>Send Rec
            </button>

          </div>
      )
    } else if (recType === recOptions.GAME) {
      return (
          <div className="gamesForm">

            <label htmlFor="gamesGenre">Genre</label>
            <input type="text" name="gamesGenre" onChange={(e) => {
              setGenres(e.target.value)
            }} value={genres}/>

            <label htmlFor="gamesOverview">Overview</label>
            <input type="text" name="gamesOverview" onChange={(e) => {
              setOverview(e.target.value)
            }} value={overview}/>

            <label htmlFor="gamesYear">Year</label>
            <input type="text" name="gamesYear" onChange={(e) => {
              setYear(e.target.value)
            }} value={year}/>

            <label htmlFor="siteLink">Site Link</label>
            <input type="text" name="siteLink" onChange={(e) => {
              setShare(e.target.value)
            }} value={share}/>

            <label htmlFor="comments">Comments</label>
            <input type="text" name="comments" onChange={(e) => {
              setComments(e.target.value)
            }} value={comments}/>

            <button className="submitRec" onClick={() => submitRec()}>Send Rec
            </button>

            <img src={image} alt="Poster Image" width="400" height="auto"/>
          </div>
      )
    } else if (recType === recOptions.OTHER) {
      return (
          <div className="otherForm">

            <label htmlFor="otherOverview">Overview</label>
            <input type="text" name="otherOverview" onChange={(e) => {
              setOverview(e.target.value)
            }} value={overview}/>

            <label htmlFor="comments">Comments</label>
            <input type="text" name="comments" onChange={(e) => {
              setComments(e.target.value)
            }} value={comments}/>

            <button className="submitRec" onClick={() => submitRec()}>Send Rec
            </button>

          </div>
      )
    }
  }

  const submitRec = () => {
    if (title === "" || friendsList.length === 0) {
      setErrorMessage("Please fill in the required fields")
    } else {
      const numYear = isNaN(Number(year)) ? year : "";
      console.log(friendsList)
      axios.post(config.host + config.port + "/submitRec", {
        friendsList,
        recData: {
          sentFrom: username,
          recType,
          musicType,
          title,
          genre: genres,
          overview,
          runtime,
          numYear,
          numberOfSeasons,
          numberOfEpisodes,
          comments,
          image,
          album,
          artist,
          numAlbums,
          numTracks,
          explicit,
          share,
          pageCount,
          priceRange
        }
      })
      .then((resp) => {
        if (resp.data.message === 'success') {
          history.push("/")
        }
      })
    }
  }

  const musicButtons = () => {
    if (recType === recOptions.MUSIC) {
      return (
          <div>
            <label htmlFor="artist">Artist</label>
            <input type="radio" name="musicOption" id="artist" value="artist"
                   onClick={() => {
                     setMusicType("artist")
                     setArtist("")
                     setImage("")
                     setTitle("")
                     setGenres("")
                     setYear("")
                     setNumAlbums("")
                     setNumTracks("")
                     setExplicit("")
                     setShare("")
                     setComments("")
                     setTempTitle("")
                   }}/>
            <label htmlFor="album">Album</label>
            <input type="radio" name="musicOption" id="album" value="album"
                   onClick={() => {
                     setMusicType("album")
                     setArtist("")
                     setImage("")
                     setTitle("")
                     setGenres("")
                     setYear("")
                     setNumAlbums("")
                     setNumTracks("")
                     setExplicit("")
                     setShare("")
                     setComments("")
                     setTempTitle("")
                   }}/>
            <label htmlFor="track">Track</label>
            <input type="radio" name="musicOption" id="track" value="track"
                   onClick={() => {
                     setMusicType("track")
                     setArtist("")
                     setImage("")
                     setTitle("")
                     setGenres("")
                     setYear("")
                     setNumAlbums("")
                     setNumTracks("")
                     setExplicit("")
                     setShare("")
                     setComments("")
                     setTempTitle("")
                   }}/>
          </div>
      )
    } else {
      return null;
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
            style={{
              width: "300px",
              margin: "0 auto"
            }}
            options={myFriends}
            getOptionLabel={(option) => option.firstName + " "
                + option.lastName}
            onChange={(event, newValue) => {
              if (newValue.some(val => val.firstName === "All Friends")) {
                setFriendsList(myFriends.filter(
                    friend => friend.firstName !== "All Friends"));
              } else {
                setFriendsList(newValue)
              }
              console.log(friendsList)

            }}
            renderInput={(params) =>
                <TextField {...params} label="Friends" variant="outlined"/>}
        />

        <div className="recOptions">
          <div className="radioButtons">
          <label htmlFor="Movie" className="radioLabel movie">Movie</label>
          <input type="radio" name="recOption" id="Movie" value="Movie" className="radioInput movie"
                 onClick={() => {
                   setRecType(recOptions.MOVIE)
                   setTitle("")
                   setTitlesList([])
                   setTempTitle("")
                 }}/>

          <label htmlFor="TVShow" className="radioLabel tvshow">TV Show</label>
          <input type="radio" name="recOption" id="TVShow" value="TVShow" className="radioInput tvshow"
                 onClick={() => {
                   setRecType(recOptions.TVSHOW)
                   setTitle("")
                   setTitlesList([])
                   setTempTitle("")
                 }}/>

          <label htmlFor="Music" className="radioLabel music">Music</label>
          <input type="radio" name="recOption" id="Music" value="Music" className="radioInput music"
                 onClick={() => {
                   setRecType(recOptions.MUSIC)
                   setTitle("")
                   setTitlesList([])
                   setTempTitle("")
                 }}/>

          <label htmlFor="Book" className="radioLabel book">Book</label>
          <input type="radio" name="recOption" id="Book" value="Books" className="radioInput books"
                 onClick={() => {
                   setRecType(recOptions.BOOK)
                   setTitle("")
                   setTitlesList([])
                   setTempTitle("")
                 }}/>

          <label htmlFor="Restaurant" className="radioLabel restaurant">Restaurant</label>
          <input type="radio" name="recOption" id="Restaurant" className="radioInput restaurant"
                 value="Restaurant"
                 onClick={() => {
                   setRecType(recOptions.REST)
                   setTitle("")
                   setTitlesList([])
                   setTempTitle("")
                 }}/>

          <label htmlFor="Games" className="radioLabel games">Game</label>
          <input type="radio" name="recOption" id="Game" value="Game" className="radioInput games"
                 onClick={() => {
                   setRecType(recOptions.GAME)
                   setTitle("")
                   setTitlesList([])
                   setTempTitle("")
                 }}/>

          <label htmlFor="Other" className="radioLabel other">Other</label>
          <input type="radio" name="recOption" id="Other" value="Other" className="radioInput other"
                 onClick={() => {
                   setRecType(recOptions.OTHER)
                   setTitle("")
                   setTitlesList([])
                   setTempTitle("")
                 }}/>
          </div>
          {
            musicButtons()
          }

          {
            makeTitle()
          }
          {
            generateRecForm()
          }
        </div>

      </div>
  )
}

export default CreateRec;