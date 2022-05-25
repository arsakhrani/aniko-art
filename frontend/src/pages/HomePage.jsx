import React, { useContext } from "react"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import InteractiveMap from "../components/sections/homepage/interactiveMap/InteractiveMap"
import Registration from "../components/sections/homepage/registration/Registration"
import Values from "../components/sections/homepage/values/Values"
import { AuthContext } from "../context/authContext"

export default function HomePage() {
  const authContext = useContext(AuthContext)

  return (
    <div>
      <Header />
      <InteractiveMap />
      {
        // <Values />
      }
      {!authContext.isAuthenticated && <Registration />}
      <Footer />
    </div>
  )
}
