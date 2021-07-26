import React, {useEffect, useState} from "react"
import axios from "axios";
import config from "../config";
import {Modal} from "@material-ui/core";

function MyBets(props) {

  const [currentBets, setCurrentBets] = useState([])

  const [pastBets, setPastBets] = useState([])

  const [betRequests, setBetRequests] = useState([])

  //const [witnessRequests, setWitnessRequests] = useState([])

  const [openBet, setOpenBet] = useState(null)

  const [betModalOpen, setBetModalOpen] = useState(false)

  //const [witnessModalOpen, setWitnessModalOpen] = useState(false)

  useEffect(() => {
    axios.post(config.host + config.port + "/myBets", {
      username: props.username
    })
    .then((resp) => {
      setCurrentBets(resp.data.currentBets)
      setPastBets(resp.data.pastBets)
      setBetRequests(resp.data.betRequests)
      //setWitnessRequests(resp.data.witnessRequests)
    })
  }, [])

  const makeCurrentBetLists = () => {
    return (
        <div className="makeCurrentBets">
          <h3>
            Current Bets
          </h3>
          {
            currentBets.map(bet => {
              return (
                  makeBet(bet)
              )
            })
          }
        </div>
    )
  }

  const makeBetHistoryList = () => {
    return (
        <div className="makeBetHistoryList">
          <h3>
            Bet History
          </h3>
          {
            pastBets.map(bet => {
              return (
                  makeBet(bet)
              )
            })
          }
        </div>
    )
  }

  const makeBet = (bet, isWitness) => {
    return (
        <div className="makeBet">
          <div className="betHeader" onClick={() => {
            if(openBet === bet.betId) {
              setOpenBet(null)
            } else {
              setOpenBet(bet.betId)
            }
          }}>
            <h4 className="title">
              {bet.title}
            </h4>
            <h5>
              {bet.friend}
              {bet.settleDate}
            </h5>
          </div>
          {
            openBet !== bet.betId ? null : (
                <div className="betBody">
                  {bet.amount === bet.friendAmount ?
                      (<h4>
                        {
                          bet.amount
                        }
                      </h4>) :
                      (<h4>
                        {
                          "Amount You Bet " + bet.amount
                        }
                        <br/>
                        {
                          "Amount Friend Bet " + bet.friendAmount
                        }
                      </h4>)}
                  <p>
                    {bet.terms}
                  </p>
                  <h5>
                    {bet.witness.map((witness) => {
                      return <p>
                        {
                          witness.firstName + " " + witness.lastName
                        }
                      </p>
                    })}
                  </h5>
                </div>
            )
          }
        </div>
    )
  }

  const toggleBetModal = () => {
    setBetModalOpen(!betModalOpen)
  }

  // const toggleWitnessModal = () => {
  //   setWitnessModalOpen(!witnessModalOpen)
  // }


  const makeBetRequestList = () => {
    return (
        <div>
          {
            betRequests.map((bet) => {
              return (<div>
                {
                  makeBet(bet)
                }
                <button className="accept" onClick={() => {handleBetRequest("accept", bet.betId)}}>
                  Accept
                </button>
                <button className="decline" onClick={() => {handleBetRequest("decline", bet.betId)}}>
                  Decline
                </button>
              </div>)
            })
          }
        </div>
    )
  }

  const handleBetRequest = (status, betId) => {
    axios.post(config.host + config.port + "/handleBetRequest", {
      username: props.username,
      status: status,
      betId: betId
    }).then((resp) => {
      setCurrentBets(resp.data.currentBets)
      setBetRequests(resp.data.betRequests)
    })
  }

  // const makeWitnessRequestList = () => {
  //   return (
  //       <div>
  //         {
  //           witnessRequests.map((bet) => {
  //             return (<div>
  //               {
  //                 makeBet(bet)
  //               }
  //               <button className="accept" onClick={() => {handleWitnessRequest("accept", bet.betId)}}>
  //                 Accept
  //               </button>
  //               <button className="decline" onClick={() => {handleWitnessRequest("decline", bet.betId)}}>
  //                 Decline
  //               </button>
  //             </div>)
  //           })
  //         }
  //       </div>
  //   )
  // }

  return (
      <div className="myBets">
        <button className="betRequests" onClick={() => toggleBetModal()}>
          Bet Requests
        </button>

        <Modal open={betModalOpen} onClose={() => toggleBetModal()}>
          <div style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: '60%',
            height: '60%',
            left: '20%',
            top: '20%'
          }}>
            {
              makeBetRequestList()
            }
          </div>
        </Modal>

        {/*<button className="witnessesRequests" onClick={() => toggleWitnessModal()}>*/}
        {/*  Witness Requests*/}
        {/*</button>*/}

        {/*<Modal open={witnessModalOpen} onClose={() => toggleWitnessModal()}>*/}
        {/*  <div style={{*/}
        {/*    position: 'absolute',*/}
        {/*    backgroundColor: 'white',*/}
        {/*    width: '60%',*/}
        {/*    height: '60%',*/}
        {/*    left: '20%',*/}
        {/*    top: '20%'*/}
        {/*  }}>*/}
        {/*    {*/}
        {/*      makeWitnessRequestList()*/}
        {/*    }*/}
        {/*  </div>*/}
        {/*</Modal>*/}

        {
          makeCurrentBetLists()
        }
        {
          makeBetHistoryList()
        }
      </div>
  )
}

export default MyBets