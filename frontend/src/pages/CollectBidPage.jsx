import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useLocation } from "react-router-dom"
import CollectBidForm from "../components/sections/collect-bid/CollectBidForm"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function CollectBidPage() {
  const location = useLocation()

  const options = {
    clientSecret: location.state.secret,
    appearance: {},
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CollectBidForm
        minimumBid={location.state.minimumBid}
        artworkId={location.state.artworkId}
      />
    </Elements>
  )
}
