import React, { useContext } from "react"
import Footer from "../components/footer/Footer"
import Header from "../components/header/Header"
import InteractiveMap from "../components/sections/homepage/interactiveMap/InteractiveMap"
import Registration from "../components/sections/homepage/registration/Registration"
import { AuthContext } from "../context/authContext"

export default function HomePage() {
  const authContext = useContext(AuthContext)

  return (
    <div>
      <Header />
      <InteractiveMap />
      {!authContext.isAuthenticated && <Registration />}
      <Footer />
    </div>
  )
}
