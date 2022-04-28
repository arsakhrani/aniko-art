import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import PrimaryButton from "../../atoms/PrimaryButton"
import TransparentButton from "../../atoms/TransparentButton"
import TextInput from "../../inputs/TextInput"
import FileInput from "../../inputs/FileInput"
import CheckboxInput from "../../inputs/CheckboxInput"
import DropdownInput from "../../inputs/DropdownInput"
import ErrorMessage from "../../atoms/ErrorMessage"
import FileDescription from "../../atoms/FileDescription"
import { countries, mediums } from "../../../services/dropdownValues"
import {
  convertNestedObjectToArray,
  addNewFiles,
} from "../../../services/uploadFunctions"
import {
  Container,
  Para,
  ShippingContainer,
} from "../manage-profile/styles/ManageProfile.styled"
import adminService from "../../../services/adminService"
import discoverService from "../../../services/discoverService"

export default function AdminCreateArt({ setTask, task }) {
  const date = new Date()

  const [entity, setEntity] = useState(null)

  const [artist, setArtist] = useState("")
  const [country, setCountry] = useState("")
  const [title, setTitle] = useState("")
  const [unit, setUnit] = useState("cm")
  const [width, setWidth] = useState(0)
  const [length, setLength] = useState(0)
  const [depth, setDepth] = useState(0)
  const [medium, setMedium] = useState("")
  const [year, setYear] = useState(date.getFullYear())
  const [price, setPrice] = useState(1000)
  const [errorMessage, setErrorMessage] = useState("")
  const [showBidInput, setShowBidInput] = useState(false)
  const [minimumBid, setMinimumBid] = useState(price * 0.2)
  const [images, setImages] = useState({})
  const [certificate, setCertificate] = useState({})
  const [imagesArray, setImagesArray] = useState([])
  const [certificateArray, setCertificateArray] = useState([])

  const [artistList, setArtistList] = useState([])
  const [galleryList, setGalleryList] = useState([])
  const [entityType, setEntityType] = useState("")

  useEffect(async () => {
    const artists = await adminService.getArtists()
    const galleries = await adminService.getGalleries()
    setArtistList(artists)
    setGalleryList(galleries)
  }, [])

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )

  const history = useHistory()

  const removeFile = (fileName, state) => {
    delete state[fileName]
    if (state === images) {
      setImages({ ...state })
      setImagesArray(convertNestedObjectToArray({ ...state }))
    }
    if (state === certificate) {
      setCertificate({ ...state })
      setCertificateArray(convertNestedObjectToArray({ ...state }))
    }
  }

  const uploadImage = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 2097152) {
        setErrorMessage("Please make sure the image file size is under 2MB.")
      } else {
        const updatedImages = addNewFiles(newFiles, e, images)
        setImages(updatedImages)
        setImagesArray(convertNestedObjectToArray(updatedImages))
      }
    }
  }

  const uploadCertificate = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 2097152) {
        setErrorMessage("Please make sure the image file size is under 2MB.")
      } else {
        const updatedCertificate = addNewFiles(newFiles, e, certificate)
        setCertificate(updatedCertificate)
        setCertificateArray(convertNestedObjectToArray(updatedCertificate))
      }
    }
  }

  const uploadCert = async () => {
    if (certificateArray.length === 1) {
      const upload = await discoverService.uploadImages(certificateArray)
      return upload
    } else {
      return []
    }
  }

  const uploadImages = async () => {
    const artImageUpload = await discoverService.uploadImages(imagesArray)

    const certImageUpload = await uploadCert()

    return {
      artImageUpload,
      certImageUpload,
    }
  }

  const validate = async () => {
    setIsLoading(true)

    const images = await uploadImages()

    const convertedMeasurements = {
      length:
        unit === "cm"
          ? Math.round((length / 2.54 + Number.EPSILON) * 10) / 10
          : Math.round(length * 2.54),
      width:
        unit === "cm"
          ? Math.round((width / 2.54 + Number.EPSILON) * 10) / 10
          : Math.round(width * 2.54),
      depth:
        unit === "cm"
          ? Math.round((depth / 2.54 + Number.EPSILON) * 10) / 10
          : Math.round(depth * 2.54),
    }
    const enteredMeasurements = {
      length,
      width,
      depth,
    }

    const artwork = {
      artist,
      country,
      title,
      medium,
      year,
      dimensionsCm:
        uploadDetails.unit === "cm"
          ? enteredMeasurements
          : convertedMeasurements,
      dimensionsIn:
        uploadDetails.unit === "in"
          ? enteredMeasurements
          : convertedMeasurements,
      price,
      pictures: images.artImageUpload,
      certificateOfAuthenticity: images.certImageUpload,
      owner: entity._id,
      minimumBid: showBidInput ? minimumBid : 0,
      entityName: entity.fullName,
      entityType,
    }

    const artUpload = await adminService.uploadArtwork(artwork)

    if (artUpload.success) {
      history.go(0)
    } else {
      setErrorMessage("Something went wrong")
      setIsLoading(false)
    }
  }

  const artistDropdownOptions = artistList.map((item) => {
    return {
      value: item.fullName,
      text: item.fullName,
    }
  })

  const galleryDropdownOptions = galleryList.map((item) => {
    return {
      value: item.fullName,
      text: item.fullName,
    }
  })

  const selectArtist = (e) => {
    setEntity(artistList.find((item) => item.fullName === e.target.value))
    setEntityType("artist")
  }

  const selectGallery = (e) => {
    setEntity(galleryList.find((item) => item.fullName === e.target.value))
    setEntityType("gallery")
  }

  return (
    <Container>
      {!artistList.length && !galleryList.length && (
        <div>
          No entity exists to add Artwork to. Please create an entity. Click{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setTask("")}
          >
            here{" "}
          </span>
          to go back.
        </div>
      )}
      {(artistList.length > 0 || galleryList.length > 0) && !entity && (
        <div>
          <DropdownInput
            onChange={selectArtist}
            value={""}
            options={[{ value: "", text: "" }, ...artistDropdownOptions]}
            label={"Select an artist to add the Artwork to:"}
            id={"entity"}
            name={"entity"}
          />
          <Para>--- or ---</Para>
          <DropdownInput
            onChange={selectGallery}
            value={""}
            options={[{ value: "", text: "" }, ...galleryDropdownOptions]}
            label={"Select a gallery to add the Artwork to:"}
            id={"entity"}
            name={"entity"}
          />
        </div>
      )}
      {entity && (
        <ShippingContainer>
          <TextInput
            id={"artist"}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            label={"Artist name"}
          />
          <DropdownInput
            id={"country"}
            value={country}
            options={countries}
            onChange={(e) => setCountry(e.target.value)}
            label={"Artist country"}
          />
          <TextInput
            id={"title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label={"Title artwork"}
          />
          <Para>Size</Para>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: vw > 370 ? "1fr 1fr 1fr 1fr" : "1fr 1fr",
              gap: "2em",
            }}
          >
            <TextInput
              id={"length"}
              value={length}
              step={0.1}
              onChange={(e) => setLength(e.target.value)}
              type={"number"}
              label={"Length"}
              min={0.1}
            />
            <TextInput
              id={"width"}
              value={width}
              step={0.1}
              onChange={(e) => setWidth(e.target.value)}
              type={"number"}
              label={"Width"}
              min={0.1}
            />
            <TextInput
              id={"depth"}
              value={depth}
              step={0.1}
              onChange={(e) => setDepth(e.target.value)}
              type={"number"}
              label={"Depth"}
              min={0.1}
            />
            <div style={{ marginTop: "2.5em" }}>
              <DropdownInput
                id={"unit"}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                options={[
                  { value: "cm", text: "cm" },
                  { value: "in", text: "in" },
                ]}
              />
            </div>
          </div>
          <DropdownInput
            id={"medium"}
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            options={mediums}
            label={"Type"}
          />
          <TextInput
            id={"year"}
            value={year}
            type={"number"}
            step={1}
            min={0}
            max={date.getFullYear()}
            onChange={(e) => setYear(e.target.value)}
            label={"Year"}
          />
        </ShippingContainer>
      )}
      {entity && (
        <ShippingContainer>
          <Para>Upload images ( JPG, PNG, PDF ) MAX. 2MB</Para>
          <FileInput multiple={true} onChange={uploadImage} id={"art-image"} />
          <FileDescription object={images} removeFile={removeFile} />
          <Para>Upload image ( JPG, PNG, PDF )</Para>
          <FileInput
            onChange={uploadCertificate}
            id={"certificate-authenticity"}
          />
          <FileDescription object={certificate} removeFile={removeFile} />
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
            <PrimaryButton onClick={validate} buttonText={"Submit"} />
          </div>
        </ShippingContainer>
      )}
      {entity && (
        <ShippingContainer>
          <div>
            <TextInput
              id={"price"}
              min={1000}
              step={50}
              type="number"
              label={"Asking Price"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <Para>
            <CheckboxInput
              onClick={() => setShowBidInput(!showBidInput)}
              checked={showBidInput}
              label={"Allow bidding?"}
            />
          </Para>
          {showBidInput && (
            <div style={{ width: "90%", marginBottom: "1em" }}>
              <TextInput
                id={"bid-amount"}
                min={100}
                step={50}
                type="number"
                label={"Minimum Bid"}
                value={minimumBid}
                onChange={(e) => setMinimumBid(e.target.value)}
              />
            </div>
          )}
        </ShippingContainer>
      )}
    </Container>
  )
}
