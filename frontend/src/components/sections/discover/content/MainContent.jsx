import React, { useContext } from "react"
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
import { ArtworkContext } from "../../../../context/artworkContext"
import { ArtistContext } from "../../../../context/artistContext"
import { GalleryContext } from "../../../../context/galleryContext"

export default function MainContent({ type }) {
  const filterType = useSelector((state) => state.discoverFilters.value)
  const countryFilter = useSelector(
    (state) => state.artistAndGalleryFilter.value
  )

  const { artworks } = useContext(ArtworkContext)

  const { artists } = useContext(ArtistContext)

  const { galleries } = useContext(GalleryContext)

  const artworkFilters = useSelector((state) => state.artworkFilter)

  const filteredAritsts = filterArtists(artists, countryFilter)

  const filteredGalleries = filterGalleries(galleries, countryFilter)

  const filteredArtworks = filterArtworks(artworks, artworkFilters)

  if (type === "artists") {
    return (
      <ArtistsAndGalleriesContainer>
        {artists.map((artist) => (
          <ArtistAndGalleryCard
            artist={true}
            key={artist._id}
            cardInfo={artist}
          />
        ))}
      </ArtistsAndGalleriesContainer>
    )
  }

  if (type === "galleries") {
    return (
      <ArtistsAndGalleriesContainer>
        {galleries.map((gallery) => (
          <ArtistAndGalleryCard
            gallery={true}
            key={gallery._id}
            cardInfo={gallery}
          />
        ))}
      </ArtistsAndGalleriesContainer>
    )
  }

  if (type === "artworks") {
    return (
      <ArtworksContainer>
        <Masonry
          breakpointCols={{ default: 2, 900: 1 }}
          className="artworks-masonry-grid"
          columnClassName="artworks-masonry-grid_column"
        >
          {artworks.map((artwork) => (
            <ArtWorkCard key={artwork._id} cardInfo={artwork} />
          ))}
        </Masonry>
      </ArtworksContainer>
    )
  }
}
