import React, { useState, useContext, useEffect } from "react"
import SideMenu from "./SideMenu"
import { Link, useHistory } from "react-router-dom"
import DiscoverHeader from "./DiscoverHeader"
import ArtistHeader from "./ArtistHeader"
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
import { changeSearchParams } from "../../state/discover/discoverFilterSlice"
import { useDispatch } from "react-redux"

export default function Header({ discover, portfolio, grey }) {
  const [toggleMenu, setToggleMenu] = useState(false)

  const [labelType, setLabelType] = useState("")

  const [expanded, setExpanded] = useState(false)

  const [searchBar, setSearchBar] = useState(false)

  useEffect(() => {
    const searchInput = document.getElementById("search-input")
    searchInput && searchInput.focus()
    !searchInput && clearSearchParams()
    !searchInput && dispatch(changeSearchParams(""))
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

  const toggleSearchBar = (searchType) => {
    setLabelType(searchType)
    setSearchBar(!searchBar)
  }

  const setSearchParams = (e) => {
    dispatch(changeSearchParams(e.target.value))
  }

  const clearSearchParams = () => {
    dispatch(changeSearchParams(""))
  }

  return (
    <Container
      $searchBar={searchBar}
      $discover={discover || portfolio}
      $grey={grey}
    >
      <h1 onClick={() => history.push("/")}>Aniko</h1>
      {discover && (
        <DiscoverHeader
          toggleSearch={() =>
            toggleSearchBar("Search for artist, artwork, or gallery")
          }
        />
      )}
      {portfolio && (
        <ArtistHeader
          toggleSearch={() =>
            toggleSearchBar("Search for artwork or exhibition")
          }
        />
      )}
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
            label={labelType}
          />
        </SearchBarContainer>
      )}
      <SideMenu visible={toggleMenu} />
    </Container>
  )
}
