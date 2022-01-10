import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import BidState from "../components/sections/collect-bid/BidState"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function CollectBidPage() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <BidState />
      </Elements>
    </div>
  )
}
