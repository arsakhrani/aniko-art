export default {
  submitNewBid: async (artworkId, highestBid, userId) => {
    const response = await fetch(`/api/artwork/set-new-bid`, {
      method: "PUT",
      body: JSON.stringify({ artworkId, highestBid, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status === 200) {
      const data = await response.json()
      return data
    } else {
      return { message: "A problem occured!" }
    }
  },
  acceptBid: async (artInfo) => {
    const response = await fetch("/api/checkout/accept-bid", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artwork: artInfo }),
    })

    const data = await response.json()
    return data
  },
  createCheckoutSaveSession: async (userId) => {
    try {
      const response = await fetch(
        `/api/checkout/create-checkout-save-session/${userId}`
      )
      const secret = await response.json()
      return secret
    } catch (e) {
      console.log(e)
      alert(
        "Sorry, the bidding service seems to be down right now. We are currently trying to fix this problem."
      )
    }
  },
  finalizeSale: async (artworkId, buyerId) => {
    const response = await fetch("/api/artwork/finalize-sale/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artworkId,
        buyerId,
      }),
    })

    const data = await response.json()
    return data
  },
  redirectToStripe: async (user, artInfo) => {
    try {
      const response = await fetch(
        "/api/checkout/create-checkout-buy-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            artworkId: artInfo._id,
            userId: user._id,
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        window.location = data.url
      }
    } catch (e) {
      console.log(e)
      alert(
        "Sorry, our system seems to be down right now. We are currently trying to fix this problem."
      )
    }
  },
}
