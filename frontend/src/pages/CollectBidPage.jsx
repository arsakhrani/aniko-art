import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useLocation } from "react-router-dom"
import CollectBidForm from "../components/sections/collect-bid/CollectBidForm"
import theme from "../components/common/theme"

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

export default function CollectBidPage() {
  const location = useLocation()

  const options = {
    clientSecret: location.state.secret,
    appearance: {
      theme: "flat",
      rules: {
        ".Input": {
          border: `1px solid ${theme.color.darkGrey}`,
        },
        ".Input:focus": {
          border: `1px solid ${theme.color.orange}`,
          outline: `1px solid ${theme.color.orange}`,
          boxShadow: `0px 1px 1px rgba(242, 161, 107, 0.03)`,
        },
      },
    },
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
