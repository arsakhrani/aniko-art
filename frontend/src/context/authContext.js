import React, { createContext, useState, useEffect } from "react"
import authService from "../services/authService"

export const AuthContext = createContext()

export default ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoaded, setIsloaded] = useState(false)

  const initialize = async () => {
    const data = await authService.isAuthenticated()
    if (data.isAuthenticated) {
      setUser(data.user)
      setIsAuthenticated(data.isAuthenticated)
      setIsloaded(true)
    } else {
      //error handle
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  return (
    <div>
      {!isLoaded ? (
        <h1>LOADING</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  )
}
