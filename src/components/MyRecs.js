import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config";


function MyRecs({ username }) {

  const [myRecs, setMyRecs] = useState([]);

  useEffect(() => {
    axios.post(config.host + config.port + "/myRecs", {
      username
    })
    .then(resp => {
      setMyRecs(resp.data.myRecs);
    })
  }, [username])

  return (
      <div className="myRecs">
        <h2>My Recs</h2>
        {
          myRecs.map(rec => {
            let recItems = [];
            for (const key in rec) {
              if (rec.hasOwnProperty(key)) {
                if (rec[key] !== null && key !== "title" && key !== "sentTo" && key !== "image" && key !== "id") {
                  recItems.push({ key: key, val: rec[key] });
                }
              }
            }

            return (
                <div className="rec">
                  <p>Sent to {rec.sentTo}</p>
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

export default MyRecs;