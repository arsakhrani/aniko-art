import React, { useContext, useEffect, useState } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { useDispatch } from "react-redux"
import { ArtistContext } from "../../../../context/artistContext"
import { GalleryContext } from "../../../../context/galleryContext"
import { PartnerContext } from "../../../../context/partnerContext"
import { useParams } from "react-router"
import { ArtworkContext } from "../../../../context/artworkContext"
import { changeCountry } from "../../../../state/discover/discoverFilterSlice"

export default function CountryFilter() {
  const dispatch = useDispatch()
  const { artists } = useContext(ArtistContext)
  const { galleries } = useContext(GalleryContext)
  const { partners } = useContext(PartnerContext)
  const { artworks } = useContext(ArtworkContext)
  const { type } = useParams()
  const [index, setindex] = useState(1)

  useEffect(() => {
    return () => {
      dispatch(changeCountry(""))
    }
  }, [])

  const availableArtistCountries = []
  artists.forEach((artist) =>
    availableArtistCountries.push(artist.birthCountry)
  )
  let uniqueArtistCountries = [...new Set(availableArtistCountries)]
  uniqueArtistCountries.sort((a, b) => a.localeCompare(b))

  const availableGalleryCountries = []
  galleries.forEach((gallery) =>
    availableGalleryCountries.push(gallery.country)
  )
  let uniqueGalleryCountries = [...new Set(availableGalleryCountries)]
  uniqueGalleryCountries.sort((a, b) => a.localeCompare(b))

  const availablePartnerCountries = []
  partners.forEach((partner) => availablePartnerCountries.push(partner.country))
  let uniquePartnerCountries = [...new Set(availablePartnerCountries)]
  uniquePartnerCountries.sort((a, b) => a.localeCompare(b))

  const availableArtworkCountries = []
  artworks.forEach((artwork) => availableArtworkCountries.push(artwork.country))
  let uniqueArtworkCountries = [...new Set(availableArtworkCountries)]
  uniqueArtworkCountries.sort((a, b) => a.localeCompare(b))

  const selectCountry = (country, index) => {
    dispatch(changeCountry(country))
    setindex(index)
  }

  return (
    <Container $index={index}>
      <h5>COUNTRIES</h5>
      <ul>
        <li key={"all-countries"} onClick={() => selectCountry("", 1)}>
          All Countries
        </li>
        {type === "artists" &&
          uniqueArtistCountries.map((country, index) => (
            <li key={country} onClick={() => selectCountry(country, index + 2)}>
              {country}
            </li>
          ))}
        {type === "galleries" &&
          uniqueGalleryCountries.map((country, index) => (
            <li key={country} onClick={() => selectCountry(country, index + 2)}>
              {country}
            </li>
          ))}
        {type === "partners" &&
          uniquePartnerCountries.map((country, index) => (
            <li key={country} onClick={() => selectCountry(country, index + 2)}>
              {country}
            </li>
          ))}
        {type === "artworks" &&
          uniqueArtworkCountries.map((country, index) => (
            <li key={country} onClick={() => selectCountry(country, index + 2)}>
              {country}
            </li>
          ))}
      </ul>
    </Container>
  )
}
