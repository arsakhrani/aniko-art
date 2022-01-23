import React, { useEffect } from "react"
import Header from "../components/header/Header"
import MainContent from "../components/sections/discover/content/MainContent"
import { Container } from "./styles/DiscoverPage.styled"
import Sidebar from "../components/sections/discover/sidebar/Sidebar"
import Footer from "../components/footer/Footer"
import { useDispatch } from "react-redux"
import { saveInfo } from "../state/registration/registrationInfoSlice"
import { useParams } from "react-router"

export default function DiscoverPage() {
  const dispatch = useDispatch()

  const { type } = useParams()

  useEffect(() => {
    dispatch(saveInfo(null))
  }, [])

  return (
    <div>
      <Header discover={true} />
      <Container>
        <Sidebar />
        <MainContent type={type} />
      </Container>
      <Footer />
    </div>
  )
}
