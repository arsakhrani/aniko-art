import { useDispatch } from "react-redux"
import {
  changeArtistsCount,
  changeArtworksCount,
  changeGalleriesCount,
  changePartnersCount,
} from "../state/discover/collectionCountSlice"

export const filterArtworks = (artworks, filters) => {
  const dispatch = useDispatch()
  const filteredArtworks = artworks.filter((artwork) => {
    const mediumMatch = !filters.medium || filters.medium === artwork.medium

    let sizeMatch = true
    if (filters.size === "small") {
      sizeMatch = artwork.size < 40
    } else if (filters.size === "medium") {
      sizeMatch = artwork.size > 40 && artwork.size < 100
    } else if (filters.size === "large") {
      sizeMatch = artwork.size > 100
    }

    // const colorMatch = true //todo

    const searchParamMatch =
      !filters.searchParams ||
      artwork.artist
        .toLowerCase()
        .includes(filters.searchParams.toLowerCase()) ||
      artwork.title.toLowerCase().includes(filters.searchParams.toLowerCase())

    const countryMatch = !filters.country || filters.country === artwork.country

    const priceMatch =
      artwork.price >= filters.minPrice && artwork.price <= filters.maxPrice

    return (
      mediumMatch && priceMatch && countryMatch && searchParamMatch && sizeMatch
    )
  })

  dispatch(changeArtworksCount(filteredArtworks.length))
  return filteredArtworks
}

export const filterArtists = (artists, filters) => {
  const dispatch = useDispatch()

  const filteredArtists = artists.filter((artist) => {
    const countryMatch =
      !filters.country || filters.country === artist.birthCountry

    const searchParamMatch =
      !filters.searchParams ||
      artist.fullName.toLowerCase().includes(filters.searchParams.toLowerCase())

    return countryMatch && searchParamMatch
  })

  dispatch(changeArtistsCount(filteredArtists.length))
  return filteredArtists
}

export const filterGalleries = (galleries, filters) => {
  const dispatch = useDispatch()

  const filteredGalleries = galleries.filter((gallery) => {
    const countryMatch = !filters.country || filters.country === gallery.country

    const searchParamMatch =
      !filters.searchParams ||
      gallery.fullName
        .toLowerCase()
        .includes(filters.searchParams.toLowerCase())

    return countryMatch && searchParamMatch
  })

  dispatch(changeGalleriesCount(filteredGalleries.length))
  return filteredGalleries
}

export const filterPartners = (partners, filters) => {
  const dispatch = useDispatch()

  const filteredPartners = partners.filter((partner) => {
    const countryMatch = !filters.country || filters.country === partner.country

    const searchParamMatch =
      !filters.searchParams ||
      partner.fullName
        .toLowerCase()
        .includes(filters.searchParams.toLowerCase())

    return countryMatch && searchParamMatch
  })

  dispatch(changePartnersCount(filteredPartners.length))
  return filteredPartners
}
