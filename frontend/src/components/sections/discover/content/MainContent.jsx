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
} from "../../../../services/filterFunctions"
import { ArtworkContext } from "../../../../context/artworkContext"
import { ArtistContext } from "../../../../context/artistContext"
import { GalleryContext } from "../../../../context/galleryContext"

export default function MainContent({ type }) {
  const { artworks } = useContext(ArtworkContext)

  const { artists } = useContext(ArtistContext)

  const { galleries } = useContext(GalleryContext)

  const artworkFilters = useSelector((state) => state.discoverFilter)

  const filteredAritsts = filterArtists(artists, artworkFilters)

  const filteredGalleries = filterGalleries(galleries, artworkFilters)

  const filteredArtworks = filterArtworks(artworks, artworkFilters)

  if (type === "artists") {
    return (
      <ArtistsAndGalleriesContainer>
        {filteredAritsts.map((artist) => (
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
        {filteredGalleries.map((gallery) => (
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
          {filteredArtworks.map((artwork) => (
            <ArtWorkCard key={artwork._id} cardInfo={artwork} />
          ))}
        </Masonry>
      </ArtworksContainer>
    )
  }

  return <div></div>
}
