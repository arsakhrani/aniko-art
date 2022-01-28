const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
const cloudinaryRootDomain = process.env.REACT_APP_CLOUDINARY_ROOT_DOMAIN

export default {
  uploadArt: async (artwork) => {
    const response = await fetch("/api/artwork/upload", {
      method: "POST",
      body: JSON.stringify(artwork),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return { success: false }
    }
  },
  uploadImages: async (images) => {
    try {
      const responseArray = []
      for (const image of images) {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", uploadPreset)

        const res = await fetch(`${cloudinaryRootDomain}/image/upload`, {
          method: "POST",
          body: formData,
        })
        if (res.status === 200) {
          const data = await res.json()
          responseArray.push(data.url)
        }
      }
      return responseArray
    } catch (e) {
      console.log(e)
      return null
    }
  },
  uploadAudio: async (audio) => {
    try {
      const formData = new FormData()
      formData.append("file", audio[0])
      formData.append("upload_preset", uploadPreset)
      formData.append("resource_type", "video")

      const res = await fetch(`${cloudinaryRootDomain}/upload`, {
        method: "POST",
        body: formData,
      })
      if (res.status === 200) {
        const data = await res.json()
        return data.url
      }
    } catch (e) {
      console.log(e)
      return null
    }
  },
  uploadCv: async (cv) => {
    try {
      const formData = new FormData()
      formData.append("file", cv[0])
      formData.append("upload_preset", uploadPreset)
      formData.append("resource_type", "image")

      const res = await fetch(`${cloudinaryRootDomain}/upload`, {
        method: "POST",
        body: formData,
      })
      if (res.status === 200) {
        const data = await res.json()
        return { cvUrl: data.url, cvFileName: data.original_filename }
      }
    } catch (e) {
      console.log(e)
      return null
    }
  },
  getAllArtworks: async () => {
    const response = await fetch("/api/artwork/get-all")
    if (response.ok) {
      const data = await response.json()
      return data.artworks
    } else {
      return null
    }
  },
  deleteArtwork: async (id) => {
    const response = await fetch(`/api/artwork/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      const data = await response.json()
      return data.success
    } else {
      return null
    }
  },
  editArtist: async (artist, id) => {
    const response = await fetch(`/api/artist/edit/${id}`, {
      method: "PUT",
      body: JSON.stringify(artist),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return { success: false }
    }
  },
  getAllArtists: async () => {
    const response = await fetch("/api/artist/get-all")
    if (response.ok) {
      const data = await response.json()
      return data.artists
    } else {
      return null
    }
  },
  getAllGalleries: async () => {
    const response = await fetch("/api/gallery/get-all")
    if (response.ok) {
      const data = await response.json()
      return data.galleries
    } else {
      return null
    }
  },
  sendChatRequest: async (buyerId, sellerId) => {
    const response = await fetch("/api/artwork/chat-request", {
      method: "POST",
      body: JSON.stringify({ buyerId, sellerId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const data = response.json()
      return data
    } else {
      return { success: false }
    }
  },
}
