import React from "react"
import {
  Container,
  FeatureImage,
  WrittenContent,
} from "./styles/ArtistCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import { Link } from "react-router-dom"
import defaultFeatureImage from "../../../../assets/images/default-feature.png"

export default function ArtistAndGalleryCard({
  cardInfo,
  artist,
  gallery,
  partner,
}) {
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
        alt={cardInfo.fullName + " feature image"}
      />
      <WrittenContent>
        <div>
          <h4>{cardInfo.fullName}</h4>
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
        {partner && (
          <a target="_blank" href={`http://${cardInfo.website}`}>
            <PrimaryButton buttonText={"VIEW PARTNERS"} />
          </a>
        )}
      </WrittenContent>
    </Container>
  )
}
