import React, { useContext } from "react"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { useHistory, useParams } from "react-router"
import { ArtistContext } from "../context/artistContext"
import PrimaryButton from "../components/atoms/PrimaryButton"
import {
  Banner,
  Container,
  InfoBox,
  InfoText,
  NoArtistContainer,
  WebsiteButtonContainer,
} from "./styles/ArtistPortfolioPage.styled"
import Masonry from "react-masonry-css"
import "../components/sections/discover/content/styles/masonry.css"
import ArtWorkCard from "../components/sections/discover/content/ArtWorkCard"
import { useState } from "react"
import { ReactComponent as AudioIcon } from "../assets/icons/audio.svg"
import { ReactComponent as MuteIcon } from "../assets/icons/mute.svg"
import { filterArtworks } from "../services/filterFunctions"
import { useSelector } from "react-redux"

export default function ArtistPortfolioPage() {
  const history = useHistory()
  const { artistId } = useParams()
  const { section } = useParams()
  const { artists, setArtists } = useContext(ArtistContext)

  const artworkFilters = useSelector((state) => state.discoverFilter)

  const artist = artists.find((a) => a._id === artistId)

  const [muteAudio, setMuteAudio] = useState(false)

  const filteredArtworks = filterArtworks(artist.artworks, artworkFilters)

  return (
    <div>
      <Header portfolio={true} />
      {!artist && (
        <NoArtistContainer>
          <h1>
            Sorry, this artist does not exist or has deactivated their porfolio.
          </h1>
        </NoArtistContainer>
      )}
      {artist && (
        <Container>
          <Banner $bannerImage={artist.bannerPicture}>
            {artist.audioFile &&
              (muteAudio ? (
                <MuteIcon
                  onClick={() => setMuteAudio(false)}
                  style={{
                    color: "white",
                    width: 36,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <AudioIcon
                  onClick={() => setMuteAudio(true)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 36,
                    cursor: "pointer",
                  }}
                />
              ))}
            <h1>{artist.fullName}</h1>
          </Banner>
          <InfoBox>
            {artist.audioFile && (
              <audio
                src={artist.audioFile}
                loop={true}
                autoPlay={true}
                muted={muteAudio}
              />
            )}
            <div>
              {artist.birthCity && artist.birthCountry && artist.birthYear && (
                <InfoText>
                  Born in{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {artist.birthCity}
                  </span>
                  ,{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {artist.birthCountry}
                  </span>{" "}
                  ({artist.birthYear})
                </InfoText>
              )}
              {artist.currentCity && artist.currentCountry && (
                <InfoText>
                  Lives in{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {artist.currentCity}
                  </span>
                  ,{" "}
                  <span style={{ textTransform: "capitalize" }}>
                    {artist.currentCountry}
                  </span>
                </InfoText>
              )}
              {artist.soundDescription && (
                <InfoText
                  style={{ textTransform: "capitalize", color: "black" }}
                >
                  {artist.soundDescription}
                </InfoText>
              )}
            </div>
            <WebsiteButtonContainer>
              <a
                href={
                  artist.website
                    ? artist.website
                    : `https://www.google.com/search?q=${artist.fullName}`
                }
                target="_blank"
              >
                <PrimaryButton buttonText={"VIEW WEBSITE"} />
              </a>
            </WebsiteButtonContainer>
          </InfoBox>
          {section === "artworks" &&
            (filteredArtworks.length ? (
              <Masonry
                breakpointCols={{ default: 2, 900: 1 }}
                className="artworks-masonry-grid"
                columnClassName="artworks-masonry-grid_column"
              >
                {filteredArtworks.map((artwork, index) => (
                  <ArtWorkCard
                    editMode={editMode}
                    key={artwork._id}
                    cardInfo={artwork}
                  />
                ))}
              </Masonry>
            ) : (
              <h3>There are currently no artworks to display.</h3>
            ))}
          {section === "exhibitions" &&
            (artist.exhibitions ? (
              <h3>here are some exhibitions</h3>
            ) : (
              <h3>There are currently no exhibitions to display.</h3>
            ))}
        </Container>
      )}
      <Footer />
    </div>
  )
}
