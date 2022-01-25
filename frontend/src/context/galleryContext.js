import React, { createContext, useState, useEffect } from "react"
import discoverService from "../services/discoverService"

export const GalleryContext = createContext()

export default ({ children }) => {
  const [galleries, setGalleries] = useState([])
  const [isLoaded, setIsloaded] = useState(false)

  const initialize = async () => {
    const data = await discoverService.getAllGalleries()
    if (data) {
      setGalleries(data)
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
        <GalleryContext.Provider value={{ galleries, setGalleries }}>
          {children}
        </GalleryContext.Provider>
      )}
    </div>
  )
}
