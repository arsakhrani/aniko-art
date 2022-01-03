import React, { useState, useEffect } from "react"
import { useStripe } from "@stripe/react-stripe-js"
import paymentService from "../../../services/paymentService"
import { Link } from "react-router-dom"
import PrimaryButton from "../../atoms/PrimaryButton"

export default function PaymentStatus({ artworkId, userId, price }) {
  const stripe = useStripe()
  const [message, setMessage] = useState(null)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "setup_intent_client_secret"
    )

    stripe
      .retrieveSetupIntent(clientSecret)
      .then(({ setupIntent }) => {
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
      })
      .then(() => {
        if (
          message ===
          "Success! Your payment method has been saved and your bid has been registered. Please make sure to review your shipping details in your profile manager."
        ) {
          const updateBid = paymentService.submitNewBid(
            artworkId,
            price,
            userId
          )
          return updateBid
        } else return
      })
      .then((bidStatus) => {
        if (bidStatus.success) {
          setDisabled(false)
        }
      })
  }, [stripe])

  return (
    <div>
      <p>{message}</p>
      <Link to={"/"}>
        <PrimaryButton disabled={disabled} buttonText={"Home"} />
      </Link>
    </div>
  )
}
