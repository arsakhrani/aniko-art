export const filterArtworks = (artworks, filters) => {
  return artworks.filter((artwork) => {
    const mediumMatch = !filters.medium || filters.medium === artwork.medium

    // let sizeMatch = true
    // if (filters.size === "small") {
    //   sizeMatch = artwork.size < 1000
    // } else if (filters.size === "medium") {
    //   sizeMatch = artwork.size > 999 && artwork.size < 10000
    // } else if (filters.size === "large") {
    //   sizeMatch = artwork.size > 9999
    // }

    // const colorMatch = true //todo

    const priceMatch =
      artwork.price >= filters.minPrice && artwork.price <= filters.maxPrice

    return mediumMatch && priceMatch
  })
}

export const filterArtists = (artists, countryFilter) => {
  return !countryFilter
    ? artists
    : artists.filter((artist) => artist.birthCountry === countryFilter)
}

export const filterGalleries = (galleries, countryFilter) => {
  return !countryFilter
    ? galleries
    : galleries.filter((gallery) => gallery.country === countryFilter)
}
