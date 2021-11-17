import React, { useState, useContext, useEffect } from "react"
import SideMenu from "./SideMenu"
import { useHistory } from "react-router-dom"
import DiscoverHeader from "./DiscoverHeader"
import {
  Container,
  MenuContainer,
  MidLine,
  TopLine,
  BottomLine,
} from "./styles/Header.styled"
import { AuthContext } from "../../context/authContext"
import authService from "../../services/authService"

export default function Header({ discover, grey }) {
  const [toggleMenu, setToggleMenu] = useState(false)

  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    return () => {
      const body = document.getElementsByTagName("body")
      body[0].classList.remove("modal-open")
    }
  }, [])

  const history = useHistory()

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

  const openMenu = () => {
    setToggleMenu(!toggleMenu)
    const body = document.getElementsByTagName("body")
    if (!toggleMenu) {
      body[0].classList.add("modal-open")
    } else {
      body[0].classList.remove("modal-open")
    }
  }

  const logOutUser = async () => {
    const loggedOutUser = await authService.logout()
    const { success } = loggedOutUser
    if (success) {
      setIsAuthenticated(false)
      history.push("/")
    }
  }

  return (
    <Container $grey={grey}>
      <h1 onClick={() => history.push("/")}>Aniko.Art</h1>
      {discover && <DiscoverHeader />}
      {isAuthenticated && (
        <p className={"logout-button"} onClick={() => logOutUser()}>
          LOGOUT
        </p>
      )}
      <MenuContainer
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => openMenu()}
      >
        <TopLine $toggleMenu={toggleMenu} $expanded={expanded} />
        <MidLine $toggleMenu={toggleMenu} $expanded={expanded} />
        <BottomLine $toggleMenu={toggleMenu} $expanded={expanded} />
      </MenuContainer>
      <SideMenu visible={toggleMenu} />
    </Container>
  )
}
