import React, { useContext } from "react"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { useHistory, useParams } from "react-router"
import { ArtistContext } from "../context/artistContext"
import PrimaryButton from "../components/atoms/PrimaryButton"
import TransparentButton from "../components/atoms/TransparentButton"
import {
  Banner,
  Container,
  InfoBox,
  InfoText,
  InputContainer,
  NoArtistContainer,
  EditButtonContainer,
  WebsiteButtonContainer,
} from "./styles/ArtistPortfolioPage.styled"
import Masonry from "react-masonry-css"
import "../components/sections/discover/content/styles/masonry.css"
import ArtWorkCard from "../components/sections/discover/content/ArtWorkCard"
import { AuthContext } from "../context/authContext"
import { useState } from "react"
import TextInput from "../components/inputs/TextInput"
import FileInput from "../components/inputs/FileInput"
import DropdownInput from "../components/inputs/DropdownInput"
import discoverService from "../services/discoverService"
import { ReactComponent as GreenDot } from "../assets/icons/green-dot.svg"
import { ReactComponent as AudioIcon } from "../assets/icons/audio.svg"
import { ReactComponent as MuteIcon } from "../assets/icons/mute.svg"
import { ReactComponent as Close } from "../assets/icons/close.svg"
import {
  FileDetails,
  Para,
} from "../components/sections/manage-profile/styles/ManageProfile.styled"
import { countries } from "../services/dropdownValues"
import ErrorMessage from "../components/atoms/ErrorMessage"
import {
  convertNestedObjectToArray,
  convertBytesToKB,
  addNewFiles,
  shortenString,
  uploadImage,
  uploadCv,
  uploadAudio,
} from "../services/uploadFunctions"
import { filterArtworks } from "../services/filterFunctions"
import { useSelector } from "react-redux"

export default function ArtistPortfolioPage() {
  const history = useHistory()
  const { artistId } = useParams()
  const { section } = useParams()
  const { artists, setArtists } = useContext(ArtistContext)
  const { user } = useContext(AuthContext)

  const artworkFilters = useSelector((state) => state.discoverFilter)

  const artist = artists.find((a) => a._id === artistId)

  const [editMode, setEditMode] = useState(false)
  const [birthCity, setBirthCity] = useState(artist && artist.birthCity)
  const [birthCountry, setBirthCountry] = useState(
    artist && artist.birthCountry
  )
  const [birthYear, setBirthYear] = useState(artist && artist.birthYear)
  const [currentCity, setCurrentCity] = useState(artist && artist.currentCity)
  const [currentCountry, setCurrentCountry] = useState(
    artist && artist.currentCountry
  )
  const [soundDescription, setSoundDescription] = useState(
    artist && artist.soundDescription
  )
  const [website, setWebsite] = useState(artist && artist.website)
  const [bannerPicture, setBannerPicture] = useState([])
  const [bannerObject, setBannerObject] = useState({})
  const [audioObject, setAudioObject] = useState({})
  const [audioFile, setAudioFile] = useState([])
  const [cvObject, setCvObject] = useState({})
  const [cvFile, setCvFile] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [disableButton, setDisableButton] = useState(false)
  const [muteAudio, setMuteAudio] = useState(false)
  const [featurePicture, setFeaturePicture] = useState("")
  const [featurePictureIndex, setFeaturePictureIndex] = useState(
    artist && artist.featurePicture
  )

  const userPortfolio = artist && user.email === artist.email

  const currentYear = new Date().getFullYear()

  const filteredArtworks = filterArtworks(artist.artworks, artworkFilters)

  const selectFeaturePicture = (i, src) => {
    setFeaturePictureIndex(i)
    setFeaturePicture(src)
  }

  const preloadBanner = (e) => {
    setErrorMessage("")
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 2097152) {
        setErrorMessage("Please make sure the image file size is under 2MB.")
      } else {
        const updatedBanner = addNewFiles(newFiles, e, bannerObject)
        setBannerObject(updatedBanner)
        setBannerPicture(convertNestedObjectToArray(updatedBanner))
      }
    }
  }

  const preloadAudio = (e) => {
    setErrorMessage("")
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 1048576) {
        setErrorMessage("Please make sure the audio file size is under 1MB.")
      } else {
        const updatedAudio = addNewFiles(newFiles, e, audioObject)
        setAudioObject(updatedAudio)
        setAudioFile(convertNestedObjectToArray(updatedAudio))
      }
    }
  }

  const preloadCv = (e) => {
    setErrorMessage("")
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 1048576) {
        setErrorMessage("Please make sure the CV file size is under 1MB.")
      } else {
        const updatedCv = addNewFiles(newFiles, e, cvObject)
        setCvObject(updatedCv)
        setCvFile(convertNestedObjectToArray(updatedCv))
      }
    }
  }

  const removeFile = (fileName, state) => {
    delete state[fileName]
    if (state === bannerObject) {
      setBannerObject({ ...state })
      setBannerPicture(convertNestedObjectToArray({ ...state }))
    } else if (state === audioObject) {
      setAudioObject({ ...state })
      setAudioFile(convertNestedObjectToArray({ ...state }))
    } else if (state === cvObject) {
      setCvObject({ ...state })
      setCvFile(convertNestedObjectToArray({ ...state }))
    }
  }

  const validateAndSubmit = async () => {
    setDisableButton(true)
    if (!website.includes("www.")) {
      setErrorMessage("Please make sure your website is prefixed with 'www.'")
      setDisableButton(false)
    } else {
      const image = await uploadImage(bannerPicture)
      const audio = await uploadAudio(audioFile)
      const { cvUrl, cvFileName } = await uploadCv(cvFile)

      const editedArtist = {
        birthCity,
        birthCountry,
        birthYear,
        currentCity,
        currentCountry,
        soundDescription,
        website,
        bannerPicture: image || artist.bannerPicture,
        audioFile: audio || artist.audioFile,
        cvFile: cvUrl || artist.cvFile,
        cvFileName: cvFileName || artist.cvFileName,
        featurePicture: featurePicture,
      }
      const artistEdit = await discoverService.editArtist(
        editedArtist,
        artistId
      )
      if (artistEdit.success) {
        const allArtists = await discoverService.getAllArtists()
        setArtists(allArtists)
        history.go(0)
      }
    }
  }

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
            {muteAudio ? (
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
            )}
            <h1>{artist.fullName}</h1>
          </Banner>
          {editMode ? (
            <InfoBox>
              <div>
                <InputContainer>
                  <TextInput
                    id={"birth-city"}
                    onChange={(e) => setBirthCity(e.target.value)}
                    value={birthCity}
                    label={"Birth city"}
                    maxLength={15}
                  />
                  <DropdownInput
                    id={"birth-country"}
                    value={birthCountry}
                    options={countries}
                    onChange={(e) => setBirthCountry(e.target.value)}
                    label={"Birth country"}
                  />
                  <TextInput
                    id={"birth-year"}
                    onChange={(e) => setBirthYear(e.target.value)}
                    value={birthYear}
                    type={"number"}
                    label={"Birth year"}
                    min={currentYear - 100}
                    max={currentYear - 18}
                  />
                </InputContainer>
                <InputContainer>
                  <TextInput
                    id={"current-city"}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    value={currentCity}
                    label={"Current city"}
                    maxLength={15}
                  />
                  <TextInput
                    id={"current-country"}
                    onChange={(e) => setCurrentCountry(e.target.value)}
                    value={currentCountry}
                    label={"Current country"}
                    maxLength={15}
                  />
                </InputContainer>
                <InputContainer>
                  <TextInput
                    id={"audio-description"}
                    onChange={(e) => setSoundDescription(e.target.value)}
                    value={soundDescription}
                    label={"Audio Description"}
                  />
                </InputContainer>
                <h3>Select an artwork below to make it your feature image</h3>
                {errorMessage && <ErrorMessage messageBody={errorMessage} />}
                <TransparentButton
                  onClick={() => validateAndSubmit()}
                  buttonText={"Save Details"}
                  disabled={disableButton}
                />
              </div>
              <div>
                <InputContainer>
                  <TextInput
                    id={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    label={"Website"}
                  />
                </InputContainer>
                <InfoText>Upload your own Portfolio Banner:</InfoText>
                <InputContainer>
                  <FileInput
                    id={"portfolio-banner"}
                    onChange={(e) => preloadBanner(e)}
                    multiple={false}
                    dark={true}
                  />
                </InputContainer>
                {Object.keys(bannerObject).map((pic) => {
                  let file = bannerObject[pic]
                  return (
                    <FileDetails key={pic}>
                      <GreenDot />
                      <Para>{shortenString(file.name)}</Para>
                      <Para>{convertBytesToKB(file.size)} KB</Para>
                      <Close
                        width={10}
                        style={{ cursor: "pointer" }}
                        stroke={"black"}
                        onClick={() => removeFile(pic, bannerObject)}
                      />
                    </FileDetails>
                  )
                })}
                <InfoText>
                  Upload an audio file that plays while visiting your portfolio:
                </InfoText>
                <InputContainer>
                  <FileInput
                    audio={true}
                    onChange={(e) => preloadAudio(e)}
                    id={"portfolio-audio"}
                    multiple={false}
                    dark={true}
                  />
                </InputContainer>
                {Object.keys(audioObject).map((audio) => {
                  let file = audioObject[audio]
                  return (
                    <FileDetails key={audio}>
                      <GreenDot />
                      <Para>{shortenString(file.name)}</Para>
                      <Para>{convertBytesToKB(file.size)} KB</Para>
                      <Close
                        width={10}
                        style={{ cursor: "pointer" }}
                        stroke={"black"}
                        onClick={() => removeFile(audio, audioObject)}
                      />
                    </FileDetails>
                  )
                })}
                <InfoText>Upload your CV:</InfoText>
                <InputContainer>
                  <FileInput
                    cv={true}
                    onChange={(e) => preloadCv(e)}
                    id={"cv"}
                    multiple={false}
                    dark={true}
                  />
                </InputContainer>
                {Object.keys(cvObject).map((cv) => {
                  let file = cvObject[cv]
                  return (
                    <FileDetails key={cv}>
                      <GreenDot />
                      <Para>{shortenString(file.name)}</Para>
                      <Para>{convertBytesToKB(file.size)} KB</Para>
                      <Close
                        width={10}
                        style={{ cursor: "pointer" }}
                        stroke={"black"}
                        onClick={() => removeFile(cv, cvObject)}
                      />
                    </FileDetails>
                  )
                })}
              </div>
            </InfoBox>
          ) : (
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
              {userPortfolio && (
                <EditButtonContainer>
                  <TransparentButton
                    onClick={() => setEditMode(true)}
                    buttonText={"Edit Details"}
                  />
                </EditButtonContainer>
              )}
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
          )}
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
                    selectImage={() =>
                      selectFeaturePicture(index, artwork.pictures[0])
                    }
                    featureBorder={index === featurePictureIndex}
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
