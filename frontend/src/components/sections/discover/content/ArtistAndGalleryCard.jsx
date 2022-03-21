import React from "react"
import {
  Container,
  FeatureImage,
  WrittenContent,
  CardHeading,
  CardText,
} from "./styles/ArtistCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import { Link } from "react-router-dom"
import defaultFeatureImage from "../../../../assets/images/default-feature.png"
import { ReactComponent as AudioIcon } from "../../../../assets/icons/audio.svg"
import { ReactComponent as MuteIcon } from "../../../../assets/icons/mute.svg"

export default function ArtistAndGalleryCard({
  cardInfo,
  artist,
  gallery,
  partner,
  playAudio,
  selectAudio,
}) {
  return (
    <Container>
      {cardInfo.audioFile &&
        (!playAudio ? (
          <MuteIcon
            style={{
              color: "white",
              width: 36,
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
            }}
            onClick={() => selectAudio(cardInfo.audioFile)}
          />
        ) : (
          <AudioIcon
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 36,
              cursor: "pointer",
            }}
            onClick={() => selectAudio("")}
          />
        ))}
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
          <CardHeading>{cardInfo.fullName}</CardHeading>
          <CardText>
            {artist ? cardInfo.currentCountry : cardInfo.country}
          </CardText>
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
          <Link to={`/partner-portfolio/${cardInfo._id}`}>
            <PrimaryButton buttonText={"VIEW PARTNERS"} />
          </Link>
        )}
      </WrittenContent>
    </Container>
  )
}
