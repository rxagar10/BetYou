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
                if (rec[key] !== null && key !== "title" && key !== "from") {
                  recItems.push({ key: key, val: rec[key] });
                }
              }
            }

            return (
                <div className="rec">
                  <p>Sent from {rec.from}</p>
                  <h3>{rec.title}</h3>

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