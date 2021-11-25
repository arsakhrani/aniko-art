import React from "react"
import {
  Container,
  FeatureImage,
  WrittenContent,
} from "./styles/ArtistCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import { Link } from "react-router-dom"

export default function ArtistAndGalleryCard({ cardInfo, artist, gallery }) {
  return (
    <Container>
      <FeatureImage src={cardInfo.featureWork} />
      <WrittenContent>
        <div>
          <h4>{cardInfo.name}</h4>
          <p>{cardInfo.location}</p>
        </div>
        {artist && (
          <Link to={`/artist-portfolio/${cardInfo._id}`}>
            <PrimaryButton buttonText={"VIEW PORTFOLIO"} />
          </Link>
        )}
        {gallery && (
          <a target="_blank" href={cardInfo.website}>
            <PrimaryButton buttonText={"VIEW WEBSITE"} />
          </a>
        )}
      </WrittenContent>
    </Container>
  )
}
