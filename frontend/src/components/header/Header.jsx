import React, { useState, useContext, useEffect } from "react"
import SideMenu from "./SideMenu"
import { Link, useHistory } from "react-router-dom"
import DiscoverHeader from "./DiscoverHeader"
import {
  Container,
  MenuContainer,
  MidLine,
  TopLine,
  BottomLine,
  SearchBarContainer,
} from "./styles/Header.styled"
import { AuthContext } from "../../context/authContext"
import authService from "../../services/authService"
import TextInput from "../inputs/TextInput"
import { changeSearchParams } from "../../state/discover/artworkFilterSlice"
import { useDispatch } from "react-redux"

export default function Header({ discover, grey }) {
  const [toggleMenu, setToggleMenu] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const [searchBar, setSearchBar] = useState(false)

  useEffect(() => {
    const searchInput = document.getElementById("search-input")
    searchInput && searchInput.focus()
    !searchInput && clearSearchParams()
    return () => {
      const body = document.getElementsByTagName("body")
      body[0].classList.remove("modal-open")
    }
  }, [searchBar])

  const history = useHistory()

  const dispatch = useDispatch()

  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AuthContext)

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
      setUser({})
      setIsAuthenticated(false)
      history.push("/")
    }
  }

  const toggleSearchBar = () => {
    setSearchBar(!searchBar)
  }

  const setSearchParams = (e) => {
    dispatch(changeSearchParams(e.target.value))
  }

  const clearSearchParams = () => {
    dispatch(changeSearchParams(""))
  }

  return (
    <Container $searchBar={searchBar} $discover={discover} $grey={grey}>
      <h1 onClick={() => history.push("/")}>Aniko.Art</h1>
      {discover && <DiscoverHeader toggleSearch={toggleSearchBar} />}
      {isAuthenticated ? (
        <p className={"logout-login-button"} onClick={() => logOutUser()}>
          LOGOUT
        </p>
      ) : (
        <Link to={"/login"}>
          <p className={"logout-login-button"}>LOGIN</p>
        </Link>
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
      {searchBar && (
        <SearchBarContainer>
          <TextInput
            onChange={(e) => setSearchParams(e)}
            id={"search-input"}
            label={"Search for artist or artwork"}
          />
        </SearchBarContainer>
      )}
      <SideMenu visible={toggleMenu} />
    </Container>
  )
}
