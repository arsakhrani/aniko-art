import React from "react"
import {
  Container,
  FeatureImage,
  WrittenContent,
} from "./styles/ArtistCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import { Link } from "react-router-dom"
import defaultFeatureImage from "../../../../assets/images/default-feature.png"

export default function ArtistAndGalleryCard({ cardInfo, artist, gallery }) {
  return (
    <Container>
      <FeatureImage
        src={
          cardInfo.featurePicture
            ? cardInfo.featurePicture
            : cardInfo.artworks[0]
            ? cardInfo.artworks[0].pictures[0]
            : defaultFeatureImage
        }
      />
      <WrittenContent>
        <div>
          <h4>{artist ? cardInfo.fullName : cardInfo.name}</h4>
          <p>{artist ? cardInfo.currentCountry : cardInfo.country}</p>
        </div>
        {artist && (
          <Link to={`/artist-portfolio/${cardInfo._id}/artworks`}>
            <PrimaryButton buttonText={"VIEW PORTFOLIO"} />
          </Link>
        )}
        {gallery && (
          <a target="_blank" href={`http://${cardInfo.website}`}>
            <PrimaryButton buttonText={"VIEW WEBSITE"} />
          </a>
        )}
      </WrittenContent>
    </Container>
  )
}
