import React,{useState, useEffect} from "react"
import axios from "axios";
import config from "../config";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useHistory} from "react-router-dom";

function CreateBet(props) {

  const [myFriends, setMyFriends] = useState([])

  const [friendBet, setFriendBet] = useState("")

  const [witness, setWitness] = useState([])

  const [betTitle, setBetTitle] = useState("")

  const [terms, setTerms] = useState("")

  const [amount, setAmount] = useState("")

  const [friendAmount, setFriendAmount] = useState("")

  const [settleDate, setSettleDate] = useState(null)

  const [errorMessage, setErrorMessage] = useState("")

  let history = useHistory()

  useEffect(() => {
    axios.post(config.host + config.port + "/createBet", {
      username: props.username
    }).then((resp) => {
      setMyFriends(resp.data.myFriends)
    })
      })

  const submitBet = () => {
    if (friendBet === "" ||
    betTitle === "" ||
    terms === "" ||
    isNaN(Number(amount)) ||
    isNaN(Number(friendAmount)) ||
    settleDate === null) {
      setErrorMessage("Invalid Inputs")
    } else {
      axios.post(config.host + config.port + "/submitBet", {
        username: props.username,
        friendBet: friendBet,
        witness: witness,
        betTitle: betTitle,
        terms: terms,
        amount: amount,
        friendAmount: friendAmount,
        settleDate: settleDate
      }).then(resp => {
        if(resp.data.betSubmitMessage === "success") {
          history.push("/")
          window.location.reload()
        } else {
         setErrorMessage(resp.data.betSubmitMessage)
        }
      })
    }
  }


  return (
      <div className="createBet" >
        <h1 className="page-header">
          Create Bet
        </h1>
        <p>{errorMessage}</p>
        <label htmlFor="betTitle">
          Bet Title
        </label>
        <input type="text" name="betTitle"
        onChange={e => setBetTitle(e.target.value)}/>

        <Autocomplete
            id="betFriend"
            options={myFriends}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => {
              setFriendBet(newValue)
            }}
            renderInput={(params) => <TextField {...params} label="betFriend" variant="outlined" />}
        />

        <label htmlFor="termsOfBet">
          Terms of Bet
        </label>
        <textarea name="termsOfBet" id="TermsOfBet"
                  onChange={e => setTerms(e.target.value)}/>

        <Autocomplete
            multiple
            id="betWitness"
            options={myFriends.filter(friend => friend !== friendBet)}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => {
              if(witness.includes(newValue)) {
                setWitness(witness.filter(wit => wit !== newValue))
              } else {
                setWitness([...witness, newValue])
              }

            }}
            renderInput={(params) => <TextField {...params} label="betWitness" variant="outlined" />}
        />

        <label htmlFor="amountYouBet">
          Amount you want to Bet
        </label>
        <input type="number" name="amountYouBet"
               onChange={e => setAmount(e.target.value)}/>
        <label htmlFor="amountOppBet">
          Amount your other person bet
        </label>
        <input type="number" name="amountOppBet"
               onChange={e => setFriendAmount(e.target.value)}/>
        <label htmlFor="settleDate">
          Settle date
        </label>
        <input type="date" name="settleDate"
               onChange={e => setSettleDate(e.target.value)}/>
        <button className="submitBet"
        onClick={() => submitBet()}>
          Submit
        </button>
      </div>
  )


}

export default CreateBet