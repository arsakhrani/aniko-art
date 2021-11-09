import React, { useState } from "react"
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

export default function Header({ discover }) {
  const [toggleMenu, setToggleMenu] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const history = useHistory()

  return (
    <Container>
      <h1 onClick={() => history.push("/")}>Aniko.Art</h1>
      {discover && <DiscoverHeader />}
      <MenuContainer
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onClick={() => setToggleMenu(!toggleMenu)}
      >
        <TopLine $toggleMenu={toggleMenu} $expanded={expanded} />
        <MidLine $toggleMenu={toggleMenu} $expanded={expanded} />
        <BottomLine $toggleMenu={toggleMenu} $expanded={expanded} />
      </MenuContainer>
      <SideMenu visible={toggleMenu} />
    </Container>
  )
}
