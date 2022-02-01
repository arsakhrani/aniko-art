import React, { createContext, useState, useEffect } from "react"
import discoverService from "../services/discoverService"

export const PartnerContext = createContext()

export default ({ children }) => {
  const [partners, setPartners] = useState([])
  const [isLoaded, setIsloaded] = useState(false)

  const initialize = async () => {
    const data = await discoverService.getAllPartners()
    if (data) {
      setPartners(data)
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
        <PartnerContext.Provider value={{ partners, setPartners }}>
          {children}
        </PartnerContext.Provider>
      )}
    </div>
  )
}
