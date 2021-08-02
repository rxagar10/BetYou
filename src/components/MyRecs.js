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
        <h1>My Recs</h1>
        {
          myRecs.map(rec => {
            let recItems = [];
            for (const key in rec) {
              if (rec.hasOwnProperty(key)) {
                if (rec[key] !== null && key !== "title" && key !== "to") {
                  recItems.push({ key: key, val: rec[key] });
                }
              }
            }

            return (
                <div className="rec">
                  <p>Sent to {rec.to}</p>
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

export default MyRecs;