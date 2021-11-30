export default {
  uploadArt: async (artwork) => {
    return fetch("/api/artwork/upload", {
      method: "post",
      body: JSON.stringify(artwork),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 201) return res.json().then((data) => data)
      else return { message: "A problem occured!" }
    })
  },
  uploadImages: async (images) => {
    const responseArray = []
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    for (const image of images) {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", uploadPreset)

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dw05biri6/image/upload",
        {
          method: "post",
          body: formData,
        }
      )
      if (res.status === 200) {
        const data = await res.json()
        responseArray.push(data.url)
      }
    }
    return responseArray
  },
  getAllArtworks: async () => {
    return fetch("/api/artwork/get-all", {
      method: "get",
    }).then((res) => {
      if (res.status === 200) return res.json().then((data) => data.artworks)
    })
  },
  editArtist: async (artist, id) => {
    return fetch(`/api/artist/edit/${id}`, {
      method: "put",
      body: JSON.stringify(artist),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 201) return res.json().then((data) => data)
      else return { message: "A problem occured!" }
    })
  },
  getAllArtists: async () => {
    return fetch("/api/artist/get-all", {
      method: "get",
    }).then((res) => {
      if (res.status === 200) return res.json().then((data) => data.artists)
    })
  },
  getAllGalleries: async () => {
    return fetch("/api/gallery/get-all", {
      method: "get",
    }).then((res) => {
      if (res.status === 200) return res.json().then((data) => data.galleries)
    })
  },
}
