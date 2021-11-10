import React from "react"
import { artists } from "../../../../dummy-data/artists"
import { galleries } from "../../../../dummy-data/galleries"
import { ArtistsAndGalleriesContainer } from "./styles/MainContent.styled"
import ArtistAndGalleryCard from "./ArtistAndGalleryCard"
import { useSelector } from "react-redux"

export default function MainContent() {
  const filterType = useSelector((state) => state.discoverFilters.value)

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
    return <h4>HI</h4>
  }
}
