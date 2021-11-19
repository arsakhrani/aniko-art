import React, { useContext } from "react"
import { AuthContext } from "../../context/authContext"
import BuyerSideMenuLinks from "./BuyerSideMenuLinks"
import ContactBox from "./ContactBox"
import DefaultSideMenuLinks from "./DefaultSideMenuLinks"
import SellerSideMenuLinks from "./SellerSideMenuLinks"
import { Container } from "./styles/SideMenu.styled"

export default function SideMenu({ visible }) {
  const authContext = useContext(AuthContext)

  return (
    <Container $visible={visible}>
      {!authContext.isAuthenticated && <DefaultSideMenuLinks />}
      {authContext.isAuthenticated && authContext.user.role === "buyer" && (
        <BuyerSideMenuLinks />
      )}
      {authContext.isAuthenticated && authContext.user.role === "seller" && (
        <SellerSideMenuLinks />
      )}
      <ContactBox />
    </Container>
  )
}
