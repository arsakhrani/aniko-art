import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import BidState from "../components/sections/collect-bid/BidState"
import { useParams } from "react-router-dom"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function CollectBidPage() {
  const artworkId = useParams(artworkId)
  const userId = useParams(userId)
  const price = useParams(price)

  return (
    <div>
      <Elements stripe={stripePromise}>
        <BidState artworkId={artworkId} userId={userId} price={price} />
      </Elements>
    </div>
  )
}
