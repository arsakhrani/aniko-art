import React from "react"
import { ReactComponent as Search } from "../../assets/icons/search-icon.svg"
import { Container, MenuItem } from "./styles/DiscoverHeader.styled"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

export default function DiscoverHeader({ toggleSearch }) {
  const artistCount = useSelector((state) => state.collectionCount.artists)

  const artworkCount = useSelector((state) => state.collectionCount.artworks)

  const galleryCount = useSelector((state) => state.collectionCount.galleries)

  const partnerCount = useSelector((state) => state.collectionCount.partners)

  const { type } = useParams()

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )

  return (
    <Container>
      <MenuItem $activeTab={type === "artists"}>
        <Link to={"/discover/artists"}>Artists ({artistCount})</Link>
      </MenuItem>
      <MenuItem $activeTab={type === "artworks"}>
        <Link to={"/discover/artworks"}>Artworks ({artworkCount})</Link>
      </MenuItem>
      <MenuItem $activeTab={type === "galleries"}>
        <Link to={"/discover/galleries"}>Galleries ({galleryCount})</Link>
      </MenuItem>
      <MenuItem $activeTab={type === "partners"}>
        <Link to={"/discover/partners"}>Partners ({partnerCount})</Link>
      </MenuItem>
      <Search
        onClick={() => toggleSearch()}
        style={{
          marginLeft: "1em",
          cursor: "pointer",
          display: vw < 375 && "none",
        }}
      />
    </Container>
  )
}
