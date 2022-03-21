import React, { useContext, useState } from "react"
import {
  ArtistsAndGalleriesContainer,
  ArtworksContainer,
  EmptyContainer,
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
  filterPartners,
} from "../../../../services/filterFunctions"
import { ArtworkContext } from "../../../../context/artworkContext"
import { ArtistContext } from "../../../../context/artistContext"
import { GalleryContext } from "../../../../context/galleryContext"
import { PartnerContext } from "../../../../context/partnerContext"

export default function MainContent({ type }) {
  const { artworks } = useContext(ArtworkContext)

  const { artists } = useContext(ArtistContext)

  const { galleries } = useContext(GalleryContext)

  const { partners } = useContext(PartnerContext)

  const artworkFilters = useSelector((state) => state.discoverFilter)

  const filteredAritsts = filterArtists(artists, artworkFilters)

  const filteredGalleries = filterGalleries(galleries, artworkFilters)

  const filteredPartners = filterPartners(partners, artworkFilters)

  const filteredArtworks = filterArtworks(artworks, artworkFilters)

  const [audio, setAudio] = useState("")

  const selectAudio = (file) => {
    setAudio(file)
  }

  if (type === "artists" && filteredAritsts.length) {
    return (
      <ArtistsAndGalleriesContainer>
        {audio && <audio loop={true} autoPlay={true} src={audio} />}
        {filteredAritsts.map((artist) => (
          <ArtistAndGalleryCard
            artist={true}
            key={artist._id}
            cardInfo={artist}
            playAudio={artist.audioFile && artist.audioFile === audio}
            selectAudio={selectAudio}
          />
        ))}
      </ArtistsAndGalleriesContainer>
    )
  }

  if (type === "galleries" && filteredGalleries.length) {
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

  if (type === "partners" && filteredPartners.length) {
    return (
      <ArtistsAndGalleriesContainer>
        {filteredPartners.map((partner) => (
          <ArtistAndGalleryCard
            partner={true}
            key={partner._id}
            cardInfo={partner}
          />
        ))}
      </ArtistsAndGalleriesContainer>
    )
  }

  if (type === "artworks" && filteredArtworks.length) {
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

  return (
    <EmptyContainer>
      <h2>
        Sorry, no {type} match the applied filters. Try using different values
        for your filters.
      </h2>
    </EmptyContainer>
  )
}
