import React from "react"
import { artists } from "../../../../dummy-data/artists"
import { galleries } from "../../../../dummy-data/galleries"
import { artworks } from "../../../../dummy-data/artworks"
import {
  ArtistsAndGalleriesContainer,
  ArtworksContainer,
} from "./styles/MainContent.styled"
import ArtistAndGalleryCard from "./ArtistAndGalleryCard"
import { useSelector } from "react-redux"
import Masonry from "react-masonry-css"
import ArtWorkCard from "./ArtWorkCard"
import "./styles/masonry.css"
import {
  filterArtists,
  filterArtworks,
  filterGalleries,
} from "../../../../services/helperFunctions"

export default function MainContent() {
  const filterType = useSelector((state) => state.discoverFilters.value)
  const countryFilter = useSelector(
    (state) => state.artistAndGalleryFilter.value
  )
  const artworkFilters = useSelector((state) => state.artworkFilter)

  const filteredAritsts = filterArtists(artists, countryFilter)

  const filteredGalleries = filterGalleries(galleries, countryFilter)

  const filteredArtworks = filterArtworks(artworks, artworkFilters)

  console.log(filteredArtworks)

  if (filterType === "artists") {
    return (
      <ArtistsAndGalleriesContainer>
        {artists.map((artist) => (
          <ArtistAndGalleryCard key={artist.id} cardInfo={artist} />
        ))}
      </ArtistsAndGalleriesContainer>
    )
  }

  if (filterType === "galleries") {
    return (
      <ArtistsAndGalleriesContainer>
        {galleries.map((gallery) => (
          <ArtistAndGalleryCard key={gallery.id} cardInfo={gallery} />
        ))}
      </ArtistsAndGalleriesContainer>
    )
  }

  if (filterType === "artworks") {
    return (
      <ArtworksContainer>
        <Masonry
          breakpointCols={{ default: 2, 900: 1 }}
          className="artworks-masonry-grid"
          columnClassName="artworks-masonry-grid_column"
        >
          {artworks.map((artwork) => (
            <ArtWorkCard key={artwork.id} cardInfo={artwork} />
          ))}
        </Masonry>
      </ArtworksContainer>
    )
  }
}
