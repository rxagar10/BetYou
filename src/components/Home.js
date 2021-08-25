import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { recOptions } from "../App";
import "../styles/recBlock.scss";
import "../styles/home.scss";

function Home({ username }) {

  const [recsFeed, setRecsFeed] = useState([]);
  const [recsFiltered, setRecsFiltered] = useState([]);

  useEffect(() => {
    axios.post(config.host + config.port + "/home", {
      username
    })
    .then(resp => {
      setRecsFeed(resp.data.recsFeed);
      setRecsFiltered(resp.data.recsFeed);
    })
  }, [username])

  const filterRecs = (selected) => {
    const value = selected.target.value;
    if (value === "") {
      setRecsFiltered(recsFeed);
    } else {
      setRecsFiltered(recsFeed.filter(rec => rec.recType === value));
    }
  }

  const selectRecType = () => {
    return (
        <select className="selectRec" onChange={(e) => filterRecs(e)}>
          <option value="">All</option>
          <option value={recOptions.MOVIE}>{recOptions.MOVIE}</option>
          <option value={recOptions.TVSHOW}>{recOptions.TVSHOW}</option>
          <option value={recOptions.MUSIC}>{recOptions.MUSIC}</option>
          <option value={recOptions.BOOK}>{recOptions.BOOK}</option>
          <option value={recOptions.REST}>{recOptions.REST}</option>
          <option value={recOptions.GAME}>{recOptions.GAME}</option>
          <option value={recOptions.OTHER}>{recOptions.OTHER}</option>
        </select>
    )
  }

  const displayHome = () => {
    if (recsFiltered.length === 0) {
      return (
          <div>
            {selectRecType()}
            <p>You have nothing in your feed</p>
          </div>
      )
    } else {
      return (
          <div className="home">
            {selectRecType()}
            {
              recsFiltered.map(rec => {
                let recItems = [];
                for (const key in rec) {
                  if (rec.hasOwnProperty(key)) {
                    if (key !== "title" && key !== "sentFrom" && key !== "share" && key !== "recType" && key !== "overview" && key !== "id" && key !== "sentTo" && key !== "image") {
                      recItems.push({ key: key, val: rec[key] });
                    }
                  }
                }

                return (
                    <div className={"rec "  + rec.recType}>
                      <h3 className="recType">{rec.recType}</h3>
                      <h3 className="recTitle">{rec.title}</h3>
                      <p className="sentFrom">Sent from {rec.sentFrom}</p>
                      {
                        rec.image ? <img src={rec.image} alt={rec.image} width="200px" height="auto"/> : null
                      }
                      <p className="overview">{rec.overview}</p>

                      {
                        recItems.map(item => {
                          return <p className="recItems">{item.key[0].toUpperCase() + item.key.substring(1)}: {item.val}</p>
                        })
                      }

                      {
                        rec.share ? <p className="recItems">Link: <a href={rec.share}>{rec.share}</a></p> : null
                      }


                    </div>
                )
              })
            }
          </div>
      )
    }
  }

  return displayHome();
}

export default Home;