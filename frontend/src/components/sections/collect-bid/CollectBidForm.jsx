import React, { useContext, useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { FormContainer } from "../../../pages/styles/CollectBidPage.styled"
import PrimaryButton from "../../atoms/PrimaryButton"
import TextInput from "../../inputs/TextInput"
import paymentService from "../../../services/paymentService"
import { AuthContext } from "../../../context/authContext"

export default function CollectBidForm({ minimumBid, artworkId }) {
  const stripe = useStripe()
  const elements = useElements()

  const { user } = useContext(AuthContext)

  const [stripeError, setStripeError] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [bidAmount, setBidAmount] = useState(minimumBid)
  const [disableButton, setDisableButton] = useState(false && !stripe)

  const changeBid = (e) => {
    setBidAmount(e.target.value)
    if (e.target.value < minimumBid) {
      setErrorMessage("Bid amount must be at least " + minimumBid)
      setDisableButton(true)
    } else {
      setErrorMessage("")
      setDisableButton(false)
    }
  }

  const submitBid = async (e) => {
    e.preventDefault()
    const updateBid = await paymentService.submitNewBid(
      artworkId,
      bidAmount,
      user._id
    )
    if (updateBid.success) {
      if (!stripe || !elements) {
        return
      }

      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/bid-state",
        },
      })

      if (error) {
        setStripeError(error.message)
      }
    }
  }

  return (
    <FormContainer onSubmit={submitBid}>
      <h1>Aniko.Art</h1>
      <p>Please enter bid amount.</p>
      <div style={{ marginBottom: "1em" }}>
        <TextInput
          type={"number"}
          onChange={(e) => changeBid(e)}
          value={bidAmount}
          label={"Bid amount (euros)"}
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
        />
      </div>
    </FormContainer>
  )
}
