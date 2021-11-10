import React from "react"
import {
  Container,
  FeatureImage,
  WrittenContent,
} from "./styles/ArtistCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"

export default function ArtistAndGalleryCard({ cardInfo }) {
  return (
    <Container>
      <FeatureImage src={cardInfo.featureWork} />
      <WrittenContent>
        <div>
          <h4>{cardInfo.name}</h4>
          <p>{cardInfo.location}</p>
        </div>
        <a target="_blank" href={cardInfo.website}>
          <PrimaryButton buttonText={"VIEW WEBSITE"} />
        </a>
      </WrittenContent>
    </Container>
  )
}
