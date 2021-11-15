import React, { useEffect } from "react"
import { Container } from "./styles/CountryFilter.styled"
import { useDispatch, useSelector } from "react-redux"
import {
  setCountryFilter,
  setCountryIndex,
} from "../../../../state/discover/artistAndGalleryFilterSlice"
import { artists } from "../../../../dummy-data/artists"
import { galleries } from "../../../../dummy-data/galleries"

export default function CountryFilter() {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(setCountryFilter(""))
    }
  }, [])

  const filterType = useSelector((state) => state.discoverFilters.value)
  const countryStyleIndex = useSelector(
    (state) => state.artistAndGalleryFilter.index
  )

  const availableArtistCountries = []
  artists.forEach((artist) => availableArtistCountries.push(artist.location))
  let uniqueArtistCountries = [...new Set(availableArtistCountries)]
  uniqueArtistCountries.sort((a, b) => a.localeCompare(b))

  const availableGalleryCountries = []
  galleries.forEach((gallery) =>
    availableGalleryCountries.push(gallery.location)
  )
  let uniqueGalleryCountries = [...new Set(availableGalleryCountries)]
  uniqueGalleryCountries.sort((a, b) => a.localeCompare(b))

  const selectCountry = (country, index) => {
    dispatch(setCountryFilter(country))
    dispatch(setCountryIndex(index + 1))
  }

  return (
    <Container $index={countryStyleIndex}>
      <h5>COUNTRIES</h5>
      <ul>
        {filterType === "artists" &&
          uniqueArtistCountries.map((country, index) => (
            <li key={country} onClick={() => selectCountry(country, index)}>
              {country}
            </li>
          ))}
        {filterType === "galleries" &&
          uniqueGalleryCountries.map((country, index) => (
            <li key={country} onClick={() => selectCountry(country, index)}>
              {country}
            </li>
          ))}
      </ul>
    </Container>
  )
}
