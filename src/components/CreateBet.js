import React, {useState, useEffect} from "react"
import axios from "axios";
import config from "../config";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useHistory} from "react-router-dom";
import "../styles/createBet.css";
import InfoPopup from "./misc-components/InfoPopup";

function CreateRec(props) {

  const [myFriends, setMyFriends] = useState([]);

  const [friendBet, setFriendBet] = useState(props.betFriend || "");
  const [witness, setWitness] = useState([]);
  const [betTitle, setBetTitle] = useState("");
  const [terms, setTerms] = useState("");
  const [amount, setAmount] = useState("");
  const [friendAmount, setFriendAmount] = useState("");
  const [settleDate, setSettleDate] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory()

  useEffect(() => {
    axios.post(config.host + config.port + "/createBet", {
      username: props.username
    }).then((resp) => {
      setMyFriends(resp.data.myFriends)
    })
  }, [])

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
        if (resp.data.betSubmitMessage === "success") {
          history.push("/")
          window.location.reload()
        } else {
          setErrorMessage(resp.data.betSubmitMessage)
        }
      })
    }
  }

  return (
      <div className="createBet">
        <h1 className="page-header">Create Bet</h1>

        <p>{errorMessage}</p>

        <label htmlFor="betTitle" className="createBetTitle">Bet Title</label>
        <input type="text" name="betTitle"
               onChange={e => setBetTitle(e.target.value)}
               className="createBetTitleInput"
        />

        <label htmlFor="betFriend" className="createBetFriendLabel">Choose a
          friend to challenge</label>
        <InfoPopup
            text="Choose who you want to send this bet to from your list of friends. If no friends are shown head over to the My Friends page to start add people you know."
            className="createBetFriendInfo"
        />
        <Autocomplete
            id="betFriend"
            value={props.betFriend}
            className="createBetFriendSelect"
            options={myFriends}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => {
              setFriendBet(newValue)
            }}
            renderInput={(params) =>
                <TextField {...params} label="Bet Friend" variant="outlined"/>
            }
        />

        <label htmlFor="termsOfBet" className="termsLabel">Terms of Bet</label>
        <textarea
            name="termsOfBet"
            className="terms"
            id="TermsOfBet"
            onChange={e => setTerms(e.target.value)}
        />

        <label htmlFor="betWitness" className="witnessesLabel">Choose
          witnesses</label>
        <InfoPopup
            text="Choose friends to 'witness' your bet. These friends will be able to decide the winner of the bet to settle any disputes between the participants of the bet."
            className="witnessesInfo"
        />
        <Autocomplete
            multiple
            id="betWitness"
            className="witnesses"
            options={myFriends.filter(friend => friend !== friendBet)}
            getOptionLabel={(option) => option}
            onChange={(event, newValue) => {
              if (witness.includes(newValue)) {
                setWitness(witness.filter(wit => wit !== newValue))
              } else {
                setWitness([...witness, newValue])
              }

            }}
            renderInput={(params) =>
                <TextField {...params} label="Bet Witnesses" variant="outlined"/>}
        />

        <label htmlFor="amountYouBet" className="amountLabel">Amount you are betting</label>
        <InfoPopup
            className="amountInfo"
            text="This is the amount you are betting. This is how much you will give up if you lose the bet."
          />
        <input type="number" name="amountYouBet" className="amount"
               onChange={e => setAmount(e.target.value)}/>


        <label htmlFor="amountOppBet" className="oppAmountLabel">Amount your opponent will bet</label>
        <InfoPopup
          className="oppAmountInfo"
          text="This is the amount your opponent will bet. This is what you would get if you win the bet. This does not need to be the same as the amount your are betting, but remember that if the bet is not fair your opponent will not accept it."
          />
        <input type="number" name="amountOppBet" className="oppAmount"
               onChange={e => setFriendAmount(e.target.value)}/>

        <label htmlFor="settleDate" className="settleDateLabel">Settle
          date</label>
        <input type="date" name="settleDate" className="settleDate"
               onChange={e => setSettleDate(e.target.value)}/>

        <button className="submitBet" onClick={() => submitBet()}>Submit
        </button>
      </div>
  )

}

export default CreateRec