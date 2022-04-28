import React, { useState, useEffect } from "react"
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
  addNewFiles,
  convertNestedObjectToArray,
  uploadAudio,
  uploadCv,
  uploadImage,
} from "../../../services/uploadFunctions"
import {
  Container,
  Para,
  ShippingContainer,
} from "../manage-profile/styles/ManageProfile.styled"
import adminService from "../../../services/adminService"

export default function AdminEdit({ setTask, task }) {
  const [entity, setEntity] = useState(null)
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

  const [list, setList] = useState([])
  const [dropdownSelection, setDropDownSelection] = useState("")

  useEffect(async () => {
    if (task === "editArtist") {
      const artists = await adminService.getArtists()
      setList(artists)
    }

    if (task === "editGallery") {
      const galleries = await adminService.getGalleries()
      setList(galleries)
    }

    if (task === "editPartner") {
      const partners = await adminService.getPartners()
      setList(partners)
    }
  }, [])

  const history = useHistory()

  const email = process.env.REACT_APP_DEV_EMAIL

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

  const preloadFeature = (e) => {
    setErrorMessage("")
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 1048576) {
        setErrorMessage("Please make sure the image file size is under 1MB.")
      } else {
        const feature = addNewFiles(newFiles, e, cvObject)
        setFeatureObject(feature)
        setFeatureFile(convertNestedObjectToArray(feature))
      }
    }
  }

  const removeFile = (fileName, state) => {
    delete state[fileName]
    if (state === bannerObject) {
      setBannerObject({ ...state })
      setBannerPicture(convertNestedObjectToArray({ ...state }))
    }
    if (state === audioObject) {
      setAudioObject({ ...state })
      setAudioFile(convertNestedObjectToArray({ ...state }))
    }
    if (state === cvObject) {
      setCvObject({ ...state })
      setCvFile(convertNestedObjectToArray({ ...state }))
    }
    if (state === featureObject) {
      setFeatureObject({ ...state })
      setFeatureFile(convertNestedObjectToArray({ ...state }))
    }
  }

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
      bannerPicture: banner,
      audioFile: audio,
      cvFile: cvUrl,
      cvFileName: cvFileName,
      featurePicture: feature,
    }

    const galleryOrPartner = {
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

      if (task === "editArtist") {
        const editArtist = await adminService.editArtist(
          artistDetails,
          entity._id
        )
        editArtist.success && (attemptSuccess = true)
      }

      if (task === "editGallery") {
        const editGallery = await adminService.editGallery(
          galleryOrPartner,
          entity._id
        )
        editGallery.success && (attemptSuccess = true)
      }

      if (task === "editPartner") {
        const editPartner = await adminService.editPartner(
          galleryOrPartner,
          entity._id
        )
        editPartner.success && (attemptSuccess = true)
      }

      if (attemptSuccess) {
        history.go(0)
      } else {
        setErrorMessage("Something went wrong!")
        setIsLoading(false)
      }
    }
  }

  const dropdownOptions = list.map((item) => {
    return {
      value: item.fullName,
      text: item.fullName,
    }
  })

  const selectEntity = (e) => {
    setDropDownSelection(e.target.value)
    const selection = list.find((item) => item.fullName === e.target.value)
    setEntity(selection)
    setFullName(selection.fullName)
    setCurrentCity(selection.city || selection.currentCity)
    setCurrentCountry(selection.country || selection.currentCountry)
    setWebsite(selection.website)
    if (task === "editArtist") {
      setBirthCity(selection.birthCity)
      setBirthCountry(selection.birthCountry)
      setBirthYear(selection.birthYear)
      setSoundDescription(selection.soundDescription)
    }
  }

  return (
    <Container>
      {!list.length && (
        <div>
          No entity exists to edit. Please create an entity. Click{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => history.go(0)}
          >
            here{" "}
          </span>
          to go back.
        </div>
      )}
      {list.length > 0 && !entity && (
        <div>
          <DropdownInput
            onChange={selectEntity}
            value={dropdownSelection}
            options={[{ value: "", text: "" }, ...dropdownOptions]}
            label={"Select an entity to edit"}
            id={"entitiy"}
            name={"entity"}
          />
        </div>
      )}
      {entity && (
        <div>
          <ShippingContainer>
            <div>
              <TextInput
                id={"full-name"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type={"text"}
                label={
                  task === "createGallery" ? "Gallery name *" : "Full name *"
                }
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
              onChange={preloadFeature}
              multiple={false}
            />
            <FileDescription object={featureObject} removeFile={removeFile} />
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
                onChange={preloadBanner}
                multiple={false}
              />
              <FileDescription object={bannerObject} removeFile={removeFile} />
              <Para>
                Upload an audio file that plays while visiting the portfolio:
              </Para>
              <FileInput
                audio={true}
                onChange={preloadAudio}
                id={"portfolio-audio"}
                multiple={false}
              />
              <FileDescription object={audioObject} removeFile={removeFile} />
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
                onChange={preloadCv}
                id={"cv"}
                multiple={false}
              />
              <FileDescription object={cvObject} removeFile={removeFile} />
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
        </div>
      )}
    </Container>
  )
}
