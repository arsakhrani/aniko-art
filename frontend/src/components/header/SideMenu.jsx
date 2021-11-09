import React from "react"
import ContactBox from "./ContactBox"
import DefaultSideMenuLinks from "./DefaultSideMenuLinks"
import { Container } from "./styles/SideMenu.styled"

export default function SideMenu({ visible }) {
  return (
    <Container $visible={visible}>
      <DefaultSideMenuLinks />
      <ContactBox />
    </Container>
  )
}
