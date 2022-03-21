import React, { useContext, useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { FormContainer } from "../../../pages/styles/CollectBidPage.styled"
import PrimaryButton from "../../atoms/PrimaryButton"
import TextInput from "../../inputs/TextInput"
import { AuthContext } from "../../../context/authContext"

export default function CollectBidForm({
  highestBid,
  artworkId,
  bidIncrement,
}) {
  const stripe = useStripe()
  const elements = useElements()

  const { user } = useContext(AuthContext)

  const [stripeError, setStripeError] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [bidAmount, setBidAmount] = useState(highestBid)
  const [disableButton, setDisableButton] = useState(false && !stripe)
  const [isLoading, setIsLoading] = useState(false)

  const changeBid = (e) => {
    setBidAmount(e.target.value)
    if (e.target.value < highestBid) {
      setDisableButton(true)
      setErrorMessage(`Bid amount must be at least ${highestBid}`)
    } else if ((e.target.value - highestBid) % bidIncrement !== 0) {
      setErrorMessage(
        `Bid amount must be atleast ${highestBid} or an increment of ${bidIncrement} from ${highestBid}`
      )
    } else {
      setErrorMessage("")
      setDisableButton(false)
    }
  }

  const submitBid = async (e) => {
    setDisableButton(true)
    setIsLoading(true)
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }

    const clientRootDomain = process.env.REACT_APP_CLIENT_ROOT_DOMAIN

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${clientRootDomain}/bid-state/${artworkId}/${user._id}/${bidAmount}`,
      },
    })

    if (error) {
      setStripeError(error.message)
    }
  }

  return (
    <FormContainer onSubmit={submitBid}>
      <h1>Aniko van Nie Art Agency</h1>
      <p>Please enter bid amount.</p>
      <div style={{ marginBottom: "1em" }}>
        <TextInput
          id={"bid-amount"}
          type={"number"}
          onChange={changeBid}
          value={bidAmount}
          label={"Bid amount (euros)"}
          onKeyDown={"return false"}
          step={bidIncrement}
          min={highestBid}
        />
      </div>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <PaymentElement />
      <p style={{ color: "red" }}>{stripeError}</p>
      <div style={{ marginTop: "1em" }}>
        <PrimaryButton
          submit={true}
          disabled={disableButton}
          buttonText={"SUBMIT"}
          loading={isLoading}
        />
      </div>
    </FormContainer>
  )
}
