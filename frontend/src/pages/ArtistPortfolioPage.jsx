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
  InputContainer,
} from "./styles/ArtistPortfolioPage.styled"
import Masonry from "react-masonry-css"
import "../components/sections/discover/content/styles/masonry.css"
import ArtWorkCard from "../components/sections/discover/content/ArtWorkCard"
import { ArtworkContext } from "../context/artworkContext"
import { AuthContext } from "../context/authContext"
import { useState } from "react"
import TextInput from "../components/inputs/TextInput"
import FileInput from "../components/inputs/FileInput"
import DropdownInput from "../components/inputs/DropdownInput"
import discoverService from "../services/discoverService"
import { ReactComponent as GreenDot } from "../assets/icons/green-dot.svg"
import {
  FileDetails,
  Para,
} from "../components/sections/manage-profile/styles/ManageProfile.styled"
import { countries } from "../services/dropdownValues"

export default function ArtistPortfolioPage() {
  const history = useHistory()
  const maxFileSize = 2000000
  const { id } = useParams()
  const { artists, setArtists } = useContext(ArtistContext)
  const { artworks } = useContext(ArtworkContext)
  const { user } = useContext(AuthContext)

  const artist = artists.find((a) => a._id === id)

  const [editMode, setEditMode] = useState(false)
  const [birthCity, setBirthCity] = useState(artist.birthCity)
  const [birthCountry, setBirthCountry] = useState(artist.birthCountry)
  const [birthYear, setBirthYear] = useState(artist.birthYear)
  const [currentCity, setCurrentCity] = useState(artist.currentCity)
  const [currentCountry, setCurrentCountry] = useState(artist.currentCountry)
  const [soundDescription, setSoundDescription] = useState(
    artist.soundDescription
  )
  const [website, setWebsite] = useState(artist.website || "https://")
  const [bannerPicture, setBannerPicture] = useState([])
  const [bannerObject, setBannerObject] = useState({})
  const [audioFile, setAudioFile] = useState()
  const [errorMessage, setErrorMessage] = useState("")

  const userPortfolio = user.email === artist.email

  const uploadImage = async () => {
    if (bannerPicture.length === 1) {
      const upload = await discoverService.uploadImages(bannerPicture)
      return upload[0]
    } else {
      return ""
    }
  }

  const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key])

  const convertBytesToKB = (bytes) => Math.round(bytes / 1000)

  const addNewFiles = (newFiles, e, state) => {
    for (let file of newFiles) {
      if (file.size <= maxFileSize && !e.target.multiple) {
        return { file }
      }
      state[file.name] = file
    }
    return { ...state }
  }

  const removeFile = (fileName, state) => {
    delete state[fileName]
    setBannerObject({ ...state })
    setBannerPicture(convertNestedObjectToArray({ ...state }))
  }

  const preloadBanner = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      const updatedBanner = addNewFiles(newFiles, e, bannerObject)
      setBannerObject(updatedBanner)
      setBannerPicture(convertNestedObjectToArray(updatedBanner))
    }
  }

  const validateAndSubmit = async () => {
    if (!website.includes("https://")) {
      setErrorMessage(
        "Please make sure your website is prefixed with 'https://'"
      )
    } else {
      const image = await uploadImage()

      const editedArtist = {
        birthCity,
        birthCountry,
        birthYear,
        currentCity,
        currentCountry,
        soundDescription,
        website,
        bannerPicture: image,
        audioFile,
      }
      const artistEdit = await discoverService.editArtist(editedArtist, id)
      if (artistEdit.success) {
        const allArtists = await discoverService.getAllArtists()
        setArtists(allArtists)
        history.push(`artist-portfolio/${id}`)
      }
    }
  }

  return (
    <div>
      <Header />
      {!artist && (
        <h1>
          Sorry this artist does not exist or has deactivated their porfolio
        </h1>
      )}
      {artist && (
        <Container>
          <Banner $bannerImage={artist.bannerPicture}>
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
                  />
                </InputContainer>
                <InputContainer>
                  <TextInput
                    id={"current-city"}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    value={currentCity}
                    label={"Current city"}
                  />
                  <TextInput
                    id={"current-country"}
                    onChange={(e) => setCurrentCountry(e.target.value)}
                    value={currentCountry}
                    label={"Current country"}
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
                {errorMessage && <p>Something went wrong</p>}
                <TransparentButton
                  onClick={() => validateAndSubmit()}
                  buttonText={"Save Details"}
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
                <p>Upload your own Portfolio Banner:</p>
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
                      <Para>{file.name}</Para>
                      <Para>{convertBytesToKB(file.size)} KB</Para>
                      <span onClick={() => removeFile(pic, bannerObject)}>
                        x
                      </span>
                    </FileDetails>
                  )
                })}
                <p>
                  Upload an audio file that plays while visiting your portfolio:
                </p>
                <InputContainer>
                  <FileInput multiple={false} dark={true} />
                </InputContainer>
              </div>
            </InfoBox>
          ) : (
            <InfoBox>
              <div>
                {artist.birthCity && artist.birthCountry && artist.birthYear && (
                  <p>
                    Born in {artist.birthCity}, {artist.birthCountry} (
                    {artist.birthYear})
                  </p>
                )}
                {artist.currentCity && artist.currentCountry && (
                  <p>
                    Lives in {artist.currentCity}, {artist.currentCountry}
                  </p>
                )}
                {artist.soundDescription && <p>{artist.soundDescription}</p>}
              </div>
              {userPortfolio && (
                <div>
                  <TransparentButton
                    onClick={() => setEditMode(true)}
                    buttonText={"Edit Details"}
                  />
                </div>
              )}
              <div>
                {artist.website && (
                  <a href={artist.website} target="_blank">
                    <PrimaryButton buttonText={"VIEW WEBSITE"} />
                  </a>
                )}
              </div>
            </InfoBox>
          )}
          {artist.artworks.length ? (
            <Masonry
              breakpointCols={{ default: 2, 900: 1 }}
              className="artworks-masonry-grid"
              columnClassName="artworks-masonry-grid_column"
            >
              {artist.artworks.map((artwork) => (
                <ArtWorkCard key={artwork._id} cardInfo={artwork} />
              ))}
            </Masonry>
          ) : (
            <div>There are currently no artworks to display</div>
          )}
        </Container>
      )}
      <Footer />
    </div>
  )
}
