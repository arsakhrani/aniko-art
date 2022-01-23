import React, { useState, useEffect } from "react"
import { useStripe } from "@stripe/react-stripe-js"
import paymentService from "../../../services/paymentService"
import PrimaryButton from "../../atoms/PrimaryButton"
import { useParams } from "react-router"
import { Container } from "./styles/BidState.styled"

export default function PaymentStatus({}) {
  const stripe = useStripe()
  const [message, setMessage] = useState("")
  const [disabled, setDisabled] = useState(true)

  const { artworkId } = useParams()
  const { userId } = useParams()
  const { price } = useParams()

  const initialization = async () => {
    try {
      if (!stripe) {
        setMessage(
          "Sorry, our bidding system seems to be down. Your bid has not been registered. Please try again at a later time."
        )
        return
      }

      const clientSecret = new URLSearchParams(window.location.search).get(
        "setup_intent_client_secret"
      )

      const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret)

      switch (setupIntent.status) {
        case "succeeded":
          setMessage(
            "Success! Your payment method has been saved and your bid has been registered. Please make sure to review your shipping details in your profile manager."
          )
          break
        case "processing":
          setMessage(
            "Processing payment details. We'll update you when processing is complete."
          )
          break
        case "requires_payment_method":
          setMessage(
            "Failed to process payment details. Please try another payment method."
          )
          break
      }
    } catch (e) {
      console.log(e)
      alert(
        "Sorry, our bidding system seems to be down. Your bid has not been registered. Please try again at a later time."
      )
    }
  }

  const sendBidDetails = async () => {
    if (message.includes("Success")) {
      await paymentService.submitNewBid(artworkId, price, userId)
    }

    setDisabled(false)
  }

  useEffect(() => {
    initialization()
  }, [stripe])

  useEffect(() => {
    sendBidDetails()
  }, [message])

  return (
    <Container>
      <p>{message}</p>
      <a href={"/"}>
        <PrimaryButton disabled={disabled} buttonText={"Home"} />
      </a>
    </Container>
  )
}
