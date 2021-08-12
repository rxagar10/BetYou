import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

function Home({ username }) {

  const [recsFeed, setRecsFeed] = useState([]);

  useEffect(() => {
    axios.post(config.host + config.port + "/home", {
      username
    })
    .then(resp => {
      setRecsFeed(resp.data.recsFeed);
    })
  }, [username])

  return (
      <div className="home">
        {
          recsFeed.map(rec => {
            let recItems = [];
            for (const key in rec) {
              if (rec.hasOwnProperty(key)) {
                if (key !== "title" && key !== "sentFrom" && key !== "id" && key !== "sentTo" && key !== "image") {
                  recItems.push({ key: key, val: rec[key] });
                }
              }
            }

            return (
                <div className="rec">
                  <p>Sent from {rec.sentFrom}</p>
                  <h3>{rec.title}</h3>
                  <img src={rec.image} alt={rec.image} width="200px" height="auto"/>
                  {
                    recItems.map(item => {
                      return <p>{item.key}: {item.val}</p>
                    })
                  }

                </div>
            )
          })
        }
      </div>
  )
}

export default Home;