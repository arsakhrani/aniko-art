import React, { createContext, useState, useEffect } from "react"
import discoverService from "../services/discoverService"

export const ArtworkContext = createContext()

export default ({ children }) => {
  const [artworks, setArtworks] = useState([])
  const [isLoaded, setIsloaded] = useState(false)

  const initialize = async () => {
    const data = await discoverService.getAllArtworks()
    if (data) {
      setArtworks(data)
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
        <ArtworkContext.Provider value={{ artworks, setArtworks }}>
          {children}
        </ArtworkContext.Provider>
      )}
    </div>
  )
}
