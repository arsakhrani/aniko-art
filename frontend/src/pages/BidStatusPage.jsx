import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import BidState from "../components/sections/collect-bid/BidState"
import PrimaryButton from "../components/atoms/PrimaryButton"
import { Link } from "react-router-dom"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function CollectBidPage() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <BidState />
        <Link to={"/"}>
          <PrimaryButton buttonText={"Home"} />
        </Link>
      </Elements>
    </div>
  )
}
