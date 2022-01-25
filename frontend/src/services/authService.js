export default {
  login: async (user) => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  },
  register: async (user) => {
    const response = await fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  },
  forgotPassword: async (email) => {
    const response = await fetch("/api/user/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  },
  verifyCode: async (code) => {
    const response = await fetch(`/api/user/verify-code/${code}`)
    const data = await response.json()
    return data
  },
  updatePassword: async (details) => {
    const response = await fetch("/api/user/update-password", {
      method: "PUT",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  },
  logout: async () => {
    const response = await fetch("/api/user/logout")
    const data = await response.json()
    return data
  },
  isAuthenticated: async () => {
    const response = await fetch("/api/user/authenticated")
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      return {
        isAuthenticated: false,
        user: {},
      }
    }
  },
  update: async (user, id) => {
    const response = await fetch(`/api/user/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
  },
  requestArtwork: async (request, id) => {
    const response = await fetch(`/api/user/request-artwork/${id}`, {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    return data
  },
}
