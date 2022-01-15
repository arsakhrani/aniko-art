import React, { useContext } from "react"
import { ReactComponent as Search } from "../../assets/icons/search-icon.svg"
import { Container, MenuItem } from "./styles/DiscoverHeader.styled"
import { Link, useParams } from "react-router-dom"
import { ArtistContext } from "../../context/artistContext"

export default function DiscoverHeader({ toggleSearch }) {
  const { section } = useParams()
  const { artistId } = useParams()

  const { artists } = useContext(ArtistContext)

  const artist = artists.find((a) => a._id === artistId)

  const getCvLink = () => {
    const fileName = artist.cvFileName.trim()
    const url = artist.cvFile
    const paramToAdd = `fl_attachment:${fileName}`
    const urlAsArray = url.split("/")
    const cloudFileName = urlAsArray.pop()
    const requiredParam = urlAsArray.pop()
    urlAsArray.push(paramToAdd)
    urlAsArray.push(requiredParam)
    urlAsArray.push(cloudFileName)
    return urlAsArray.join("/")
  }

  const setupEmail = () => {
    const email = artist.email
    const subject = "Artist Inquiry"
    const emailBody = `Dear ${artist.fullName},`
    document.location = `mailto:${email}?subject=${subject}&body=${emailBody}`
  }

  return artist ? (
    <Container>
      <MenuItem $activeTab={section === "artworks"}>
        <Link to={`/artist-portfolio/${artistId}/artworks`}>
          Artworks ({artist.artworks.length})
        </Link>
      </MenuItem>
      <MenuItem $activeTab={section === "exhibitions"}>
        <Link to={`/artist-portfolio/${artistId}/exhibitions`}>
          Exhibitions (20)
        </Link>
      </MenuItem>
      {artist.cvFile && (
        <MenuItem $activeTab={section === "cv"}>
          <a href={getCvLink()} download target="_blank">
            CV
          </a>
        </MenuItem>
      )}
      <MenuItem $activeTab={section === "inquiry"} onClick={() => setupEmail()}>
        Inquiry
      </MenuItem>
      <Search
        onClick={() => toggleSearch()}
        style={{
          marginLeft: "1em",
          cursor: "pointer",
        }}
      />
    </Container>
  ) : null
}
