import React, { useContext } from "react"
import {
  ArtistsAndGalleriesContainer,
  EmptyContainer,
} from "../components/sections/discover/content/styles/MainContent.styled"
import ArtistAndGalleryCard from "../components/sections/discover/content/ArtistAndGalleryCard"
import { PartnerContext } from "../context/partnerContext"
import { useParams } from "react-router"
import Header from "../components/header/Header"
import { Container } from "./styles/DiscoverPage.styled"
import Footer from "../components/footer/Footer"

export default function PartnerPortfolioPage() {
  const { partnerId } = useParams()

  const { partners } = useContext(PartnerContext)

  const partner = partners.find((p) => p._id === partnerId)

  if (partner.affiliatedArtists.length) {
    return (
      <div>
        <Header discover={true} />
        <Container>
          <ArtistsAndGalleriesContainer>
            {partner.affiliatedArtists.map((artist) => (
              <ArtistAndGalleryCard
                artist={true}
                key={artist._id}
                cardInfo={artist}
              />
            ))}
          </ArtistsAndGalleriesContainer>
        </Container>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Header discover={true} />
      <EmptyContainer>
        <h2>
          Sorry, no partners match the applied filters. Try using different
          values for your filters.
        </h2>
      </EmptyContainer>
      <Footer />
    </div>
  )
}
