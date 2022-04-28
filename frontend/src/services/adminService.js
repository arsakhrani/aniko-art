const key = process.env.REACT_APP_ADMIN_KEY

export default {
  addArtist: async (artist) => {
    const response = await fetch(`/api/artist/add?key=${key}`, {
      method: "POST",
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
  addGallery: async (gallery) => {
    const response = await fetch(`/api/gallery/add?key=${key}`, {
      method: "POST",
      body: JSON.stringify(gallery),
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
  addPartner: async (gallery) => {
    const response = await fetch(`/api/partner/add?key=${key}`, {
      method: "POST",
      body: JSON.stringify(gallery),
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
  editArtist: async (artist, id) => {
    const response = await fetch(`/api/artist/edit-admin/${id}?key=${key}`, {
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
  editGallery: async (gallery, id) => {
    const response = await fetch(`/api/gallery/edit-admin/${id}?key=${key}`, {
      method: "PUT",
      body: JSON.stringify(gallery),
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
  editPartner: async (gallery, id) => {
    const response = await fetch(`/api/partner/edit-admin/${id}?key=${key}`, {
      method: "PUT",
      body: JSON.stringify(gallery),
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
  getArtists: async () => {
    const response = await fetch(`/api/artist/get-admin?key=${key}`)
    if (response.ok) {
      const data = await response.json()
      return data.artists
    } else {
      return { success: false }
    }
  },
  getGalleries: async () => {
    const response = await fetch(`/api/gallery/get-admin?key=${key}`)
    if (response.ok) {
      const data = await response.json()
      return data.galleries
    } else {
      return { success: false }
    }
  },
  getPartners: async () => {
    const response = await fetch(`/api/partner/get-admin?key=${key}`)
    if (response.ok) {
      const data = await response.json()
      return data.partners
    } else {
      return { success: false }
    }
  },
  getArtworks: async () => {
    const response = await fetch(`/api/artwork/get-admin?key=${key}`)
    if (response.ok) {
      const data = await response.json()
      return data.artworks
    } else {
      return { success: false }
    }
  },
  deleteArtist: async (id) => {
    const response = await fetch(`/api/artist/delete-admin/${id}?key=${key}`, {
      method: "DELETE",
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
  deleteGallery: async (id) => {
    const response = await fetch(`/api/gallery/delete-admin/${id}?key=${key}`, {
      method: "DELETE",
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
  deletePartner: async (id) => {
    const response = await fetch(`/api/partner/delete-admin/${id}?key=${key}`, {
      method: "DELETE",
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
  uploadArtwork: async (artwork) => {
    const response = await fetch(`/api/artwork/admin-upload?key=${key}`, {
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
  deleteArtwork: async (id) => {
    const response = await fetch(`/api/artwork/delete-admin/${id}?key=${key}`, {
      method: "DELETE",
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
  sendEmail: async (id, details) => {
    const response = await fetch(
      `/api/user/send-transfer-email/${id}?key=${key}`,
      {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return { success: false }
    }
  },
  verifyTransferCode: async (code) => {
    const response = await fetch(`/api/user/verify-transfer-code/${code}`)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return { success: false }
    }
  },
  transferUser: async (details) => {
    const response = await fetch(`/api/user/execute-transfer-user/`, {
      method: "POST",
      body: JSON.stringify(details),
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
}
