export default {
  submitNewBid: async (artworkId, minimumBid, userId) => {
    return fetch(`/api/artwork/set-new-bid`, {
      method: "put",
      body: JSON.stringify({ artworkId, minimumBid, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) return res.json().then((data) => data)
      else return { message: "A problem occured!" }
    })
  },
}
