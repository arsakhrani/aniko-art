import React, { createContext, useState, useEffect } from "react"
import discoverService from "../services/discoverService"

export const ArtistContext = createContext()

export default ({ children }) => {
  const [artists, setArtists] = useState([])
  const [isLoaded, setIsloaded] = useState(false)

  useEffect(() => {
    discoverService.getAllArtists().then((data) => {
      setArtists(data)
      setIsloaded(true)
    })
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
