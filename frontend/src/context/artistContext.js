import React, { createContext, useState, useEffect } from "react"
import discoverService from "../services/discoverService"

export const ArtistContext = createContext()

export default ({ children }) => {
  const [artists, setArtists] = useState([])
  const [isLoaded, setIsloaded] = useState(false)

  const initialize = async () => {
    const data = await discoverService.getAllArtists()
    if (data) {
      setArtists(data)
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
        <ArtistContext.Provider value={{ artists, setArtists }}>
          {children}
        </ArtistContext.Provider>
      )}
    </div>
  )
}
