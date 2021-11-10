import React from "react"
import Header from "../components/header/Header"
import MainContent from "../components/sections/discover/content/MainContent"
import { Container } from "./styles/DiscoverPage.styled"
import Sidebar from "../components/sections/discover/sidebar/Sidebar"
import Footer from "../components/footer/Footer"

export default function DiscoverPage() {
  return (
    <div>
      <Header discover={true} />
      <Container>
        <Sidebar />
        <MainContent />
      </Container>
      <Footer />
    </div>
  )
}
