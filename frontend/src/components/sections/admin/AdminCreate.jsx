import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import PrimaryButton from "../../atoms/PrimaryButton"
import TransparentButton from "../../atoms/TransparentButton"
import TextInput from "../../inputs/TextInput"
import FileInput from "../../inputs/FileInput"
import DropdownInput from "../../inputs/DropdownInput"
import ErrorMessage from "../../atoms/ErrorMessage"
import FileDescription from "../../atoms/FileDescription"
import { countries } from "../../../services/dropdownValues"
import {
  uploadAudio,
  uploadCv,
  uploadImage,
  preloadFile,
  removeFile,
} from "../../../services/uploadFunctions"
import {
  Container,
  Para,
  ShippingContainer,
} from "../manage-profile/styles/ManageProfile.styled"
import adminService from "../../../services/adminService"

export default function AdminCreate({ setTask, task }) {
  const [fullName, setFullName] = useState("")
  const [website, setWebsite] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [bannerPicture, setBannerPicture] = useState([])
  const [bannerObject, setBannerObject] = useState({})
  const [audioObject, setAudioObject] = useState({})
  const [audioFile, setAudioFile] = useState([])
  const [cvObject, setCvObject] = useState({})
  const [cvFile, setCvFile] = useState([])
  const [featureObject, setFeatureObject] = useState({})
  const [featureFile, setFeatureFile] = useState([])
  const [soundDescription, setSoundDescription] = useState("")
  const [birthCity, setBirthCity] = useState("")
  const [birthCountry, setBirthCountry] = useState("")
  const [currentCity, setCurrentCity] = useState("")
  const [currentCountry, setCurrentCountry] = useState("")
  const [birthYear, setBirthYear] = useState(null)

  const history = useHistory()

  const email = process.env.REACT_APP_DEV_EMAIL

  const currentYear = new Date().getFullYear()

  const validate = async () => {
    setIsLoading(true)
    const banner = await uploadImage(bannerPicture)
    const audio = await uploadAudio(audioFile)
    const { cvUrl, cvFileName } = await uploadCv(cvFile)
    const feature = await uploadImage(featureFile)

    const artistDetails = {
      fullName,
      website,
      soundDescription,
      birthCity,
      birthCountry,
      birthYear,
      currentCity,
      currentCountry,
      email,
      bannerPicture: banner,
      audioFile: audio,
      cvFile: cvUrl,
      cvFileName: cvFileName,
      featurePicture: feature,
    }

    const galleryOrPartner = {
      email,
      fullName,
      country: currentCountry,
      city: currentCity,
      website,
      featurePicture: feature,
    }

    if (!fullName) {
      setErrorMessage("Please enter a name")
    } else {
      setErrorMessage("")

      let attemptSuccess = false

      if (task === "createArtist") {
        const createArtist = await adminService.addArtist(artistDetails)
        createArtist.success && (attemptSuccess = true)
      }

      if (task === "createGallery") {
        const createGallery = await adminService.addGallery(galleryOrPartner)
        createGallery.success && (attemptSuccess = true)
      }

      if (task === "createPartner") {
        const createGallery = await adminService.addPartner(galleryOrPartner)
        createGallery.success && (attemptSuccess = true)
      }

      if (attemptSuccess) {
        history.go(0)
      } else {
        setErrorMessage("Something went wrong!")
        setIsLoading(false)
      }
    }
  }

  return (
    <Container>
      <ShippingContainer>
        <div>
          <TextInput
            id={"full-name"}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type={"text"}
            label={task === "createGallery" ? "Gallery name *" : "Full name *"}
            name={"full-name"}
          />
        </div>
        <div>
          <TextInput
            id={"current-city"}
            value={currentCity}
            onChange={(e) => setCurrentCity(e.target.value)}
            type={"text"}
            label={"Current City"}
            name={"current-city"}
          />
        </div>
        <div>
          <TextInput
            id={"current-country"}
            value={currentCountry}
            onChange={(e) => setCurrentCountry(e.target.value)}
            type={"text"}
            label={"Current Country"}
            name={"current-country"}
          />
        </div>
        <div>
          <TextInput
            id={"website"}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            type={"text"}
            label={"Website"}
            name={"website"}
          />
        </div>
        <Para style={{ marginTop: 0 }}>Upload a feature image:</Para>
        <FileInput
          id={"feature-image"}
          onChange={(e) =>
            preloadFile(
              e,
              featureObject,
              (val) => setFeatureFile(val),
              (val) => setFeatureObject(val),
              (val) => setErrorMessage(val),
              1048576
            )
          }
          multiple={false}
        />
        <FileDescription
          object={featureObject}
          arraySetter={(val) => setFeatureFile(val)}
          objectSetter={(val) => setFeatureObject(val)}
          removeFile={removeFile}
        />
        {errorMessage && <ErrorMessage messageBody={errorMessage} />}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <TransparentButton
            onClick={() => setTask("")}
            buttonText={"Cancel"}
          />
          <PrimaryButton
            loading={isLoading}
            disabled={isLoading}
            buttonText={"Submit"}
            onClick={validate}
          />
        </div>
      </ShippingContainer>
      {task === "createArtist" && (
        <ShippingContainer>
          <Para>Upload a Portfolio Banner:</Para>
          <FileInput
            id={"portfolio-banner"}
            onChange={(e) =>
              preloadFile(
                e,
                bannerObject,
                (val) => setBannerPicture(val),
                (val) => setBannerObject(val),
                (val) => setErrorMessage(val),
                2097152
              )
            }
            multiple={false}
          />
          <FileDescription
            object={bannerObject}
            arraySetter={(val) => setBannerPicture(val)}
            objectSetter={(val) => setBannerObject(val)}
            removeFile={removeFile}
          />
          <Para>
            Upload an audio file that plays while visiting the portfolio:
          </Para>
          <FileInput
            audio={true}
            onChange={(e) =>
              preloadFile(
                e,
                audioObject,
                (val) => setAudioFile(val),
                (val) => setAudioObject(val),
                (val) => setErrorMessage(val),
                1048576
              )
            }
            id={"portfolio-audio"}
            multiple={false}
          />
          <FileDescription
            object={audioObject}
            arraySetter={(val) => setAudioFile(val)}
            objectSetter={(val) => setAudioObject(val)}
            removeFile={removeFile}
          />
          <div style={{ marginTop: "1em" }}>
            <TextInput
              id={"audio-description"}
              onChange={(e) => setSoundDescription(e.target.value)}
              value={soundDescription}
              label={"Audio Description"}
            />
          </div>
          <Para>Upload a CV:</Para>
          <FileInput
            cv={true}
            onChange={(e) =>
              preloadFile(
                e,
                cvObject,
                (val) => setCvFile(val),
                (val) => setCvObject(val),
                (val) => setErrorMessage(val),
                1048576
              )
            }
            id={"cv"}
            multiple={false}
          />
          <FileDescription
            object={cvObject}
            arraySetter={(val) => setCvFile(val)}
            objectSetter={(val) => setCvObject(val)}
            removeFile={removeFile}
          />
          <div style={{ marginTop: "1em" }}>
            <TextInput
              id={"birth-city"}
              onChange={(e) => setBirthCity(e.target.value)}
              value={birthCity}
              label={"Birth city"}
              maxLength={15}
            />
          </div>
          <div style={{ marginTop: "1em" }}>
            <DropdownInput
              id={"birth-country"}
              value={birthCountry}
              options={countries}
              onChange={(e) => setBirthCountry(e.target.value)}
              label={"Birth country"}
            />
          </div>
          <div style={{ marginTop: "1em" }}>
            <TextInput
              id={"birth-year"}
              onChange={(e) => setBirthYear(e.target.value)}
              value={birthYear}
              type={"number"}
              label={"Birth year"}
              min={currentYear - 100}
              max={currentYear - 18}
            />
          </div>
        </ShippingContainer>
      )}
    </Container>
  )
}
