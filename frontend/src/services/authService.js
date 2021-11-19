export default {
  login: (user) => {
    return fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data)
      else
        return {
          isAuthenticated: false,
          user: {},
          message: "Username or password is incorrect",
        }
    })
  },
  register: (user) => {
    return fetch("/api/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data)
      else
        return {
          isAuthenticated: false,
          user: {},
          message: "Email address is already taken",
        }
    })
  },
  logout: () => {
    return fetch("/api/user/logout")
      .then((res) => res.json())
      .then((data) => data)
  },
  isAuthenticated: () => {
    return fetch("/api/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data)
      else
        return {
          isAuthenticated: false,
          user: {},
        }
    })
  },
  update: (user, id) => {
    return fetch(`/api/user/update/${id}`, {
      method: "put",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data)
      else
        return {
          message: "Something went wrong",
        }
    })
  },
  requestArtwork: (request, id) => {
    return fetch(`/api/user/request-artwork/${id}`, {
      method: "put",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data)
      else
        return {
          message: "Something went wrong",
        }
    })
  },
}
