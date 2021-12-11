import React, { useContext, useEffect } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { useDispatch, useSelector } from "react-redux"
import {
  setCountryFilter,
  setCountryIndex,
} from "../../../../state/discover/artistAndGalleryFilterSlice"
import { ArtistContext } from "../../../../context/artistContext"
import { GalleryContext } from "../../../../context/galleryContext"
import { useParams } from "react-router"

export default function CountryFilter() {
  const dispatch = useDispatch()
  const { artists } = useContext(ArtistContext)
  const { galleries } = useContext(GalleryContext)
  const { type } = useParams()

  useEffect(() => {
    return () => {
      dispatch(setCountryFilter(""))
    }
  }, [])

  const countryStyleIndex = useSelector(
    (state) => state.artistAndGalleryFilter.index
  )

  const availableArtistCountries = []
  artists.forEach((artist) =>
    availableArtistCountries.push(artist.birthCountry)
  )
  let uniqueArtistCountries = [...new Set(availableArtistCountries)]
  uniqueArtistCountries.sort((a, b) => a.localeCompare(b))
  console.log(galleries)
  const availableGalleryCountries = []
  galleries.forEach((gallery) =>
    availableGalleryCountries.push(gallery.country)
  )
  let uniqueGalleryCountries = [...new Set(availableGalleryCountries)]
  uniqueGalleryCountries.sort((a, b) => a.localeCompare(b))

  const selectCountry = (country, index) => {
    dispatch(setCountryFilter(country))
    dispatch(setCountryIndex(index + 2))
  }

  return (
    <Container $index={countryStyleIndex}>
      <h5>COUNTRIES</h5>
      <ul>
        <li onClick={() => selectCountry("", -1)}>All Countries</li>
        {type === "artists" &&
          uniqueArtistCountries.map((country, index) => (
            <li
              style={{ textTransform: "capitalize" }}
              key={country}
              onClick={() => selectCountry(country, index)}
            >
              {country}
            </li>
          ))}
        {type === "galleries" &&
          uniqueGalleryCountries.map((country, index) => (
            <li
              style={{ textTransform: "capitalize" }}
              key={country}
              onClick={() => selectCountry(country, index)}
            >
              {country}
            </li>
          ))}
      </ul>
    </Container>
  )
}
