import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/authContext"
import PrimaryButton from "../atoms/PrimaryButton"
import FileInput from "../inputs/FileInput"
import TextInput from "../inputs/TextInput"
import DropdownInput from "../inputs/DropdownInput"
import { useDispatch, useSelector } from "react-redux"
import { mediums, countries } from "../../services/dropdownValues"
import {
  StepContainer,
  StepLabel,
  BubbleCounter,
  ShippingContainer,
  Para,
  FileDetails,
} from "../sections/manage-profile/styles/ManageProfile.styled"
import VerifyArtist from "./VerifyArtist"
import { ReactComponent as CheckMark } from "../../assets/icons/verification-check.svg"
import { ReactComponent as GreenDot } from "../../assets/icons/green-dot.svg"
import { saveDetails } from "../../state/upload/uploadArtSlice"

export default function StepOne({ changeStep }) {
  const maxFileSize = 2000000
  const date = new Date()
  const authContext = useContext(AuthContext)
  const [artist, setArtist] = useState("")
  const [gallery, setGallery] = useState("")
  const [country, setCountry] = useState("")
  const [title, setTitle] = useState("")
  const [unit, setUnit] = useState("cm")
  const [width, setWidth] = useState(0)
  const [length, setLength] = useState(0)
  const [depth, setDepth] = useState(0)
  const [medium, setMedium] = useState("")
  const [year, setYear] = useState(date.getFullYear())
  const [errorMessage, setErrorMessage] = useState("")
  const [images, setImages] = useState({})
  const [certificate, setCertificate] = useState({})
  const [imagesArray, setImagesArray] = useState([])
  const [certificateArray, setCertificateArray] = useState([])

  const dispatch = useDispatch()

  const validateAndNext = () => {
    if (
      !(
        artist &&
        country &&
        title &&
        width &&
        length &&
        depth &&
        medium &&
        year
      )
    ) {
      setErrorMessage("Please make sure all fields are filled!")
    } else if (year < 0 || year > date.getFullYear()) {
      setErrorMessage("Invalid Year")
    } else if (imagesArray.length === 0) {
      setErrorMessage("Please upload at least one image!")
    } else {
      const details = {
        artist,
        gallery,
        country,
        title,
        unit,
        width,
        length,
        depth,
        medium,
        year,
        imagesArray,
        certificateArray,
      }
      dispatch(saveDetails(details))
      changeStep(2)
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
      const updatedImages = addNewFiles(newFiles, e, images)
      setImages(updatedImages)
      setImagesArray(convertNestedObjectToArray(updatedImages))
    }
  }

  const uploadCertificate = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      const updatedCertificate = addNewFiles(newFiles, e, certificate)
      setCertificate(updatedCertificate)
      setCertificateArray(convertNestedObjectToArray(updatedCertificate))
    }
  }

  return (
    <StepContainer>
      <div>
        <StepLabel>
          <BubbleCounter>1</BubbleCounter>
          <span>ADD ARTIST'S INFORMATION</span>
        </StepLabel>
        <ShippingContainer>
          {authContext.user.sellerType === "gallery" && (
            <TextInput
              value={gallery}
              onChange={(e) => setGallery(e.target.value)}
              label={"Gallery name"}
            />
          )}
          <TextInput
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            label={"Artist name"}
          />
          <DropdownInput
            value={country}
            options={countries}
            onChange={(e) => setCountry(e.target.value)}
            label={"Artist country"}
          />
          {authContext.user.sellerType === "private" &&
            !authContext.user.isVerified && <VerifyArtist id={"id-picture"} />}
          {authContext.user.sellerType === "private" &&
            authContext.user.isVerified && (
              <Para>
                <CheckMark style={{ marginRight: "0.5em" }} />
                Verified
              </Para>
            )}
          <TextInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label={"Title artwork"}
          />
          <Para>Size</Para>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "2em",
            }}
          >
            <TextInput
              value={length}
              step={0.1}
              onChange={(e) => setLength(e.target.value)}
              type={"number"}
              label={"Length"}
            />
            <TextInput
              value={width}
              step={0.1}
              onChange={(e) => setWidth(e.target.value)}
              type={"number"}
              label={"Width"}
            />
            <TextInput
              value={depth}
              step={0.1}
              onChange={(e) => setDepth(e.target.value)}
              type={"number"}
              label={"Depth"}
            />
            <DropdownInput
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              options={[
                { value: "cm", text: "cm" },
                { value: "in", text: "in" },
              ]}
            />
          </div>
          <DropdownInput
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            options={mediums}
            label={"Type"}
          />
          <TextInput
            value={year}
            type={"number"}
            step={1}
            min={0}
            max={date.getFullYear()}
            onChange={(e) => setYear(e.target.value)}
            label={"Year"}
          />
        </ShippingContainer>
      </div>
      <div>
        <StepLabel>
          <BubbleCounter>2</BubbleCounter>
          <span>UPLOAD ARTWORK</span>
        </StepLabel>
        <ShippingContainer>
          <Para>Upload images ( JPG, PNG, PDF ) MAX. 2MB</Para>
          <FileInput
            multiple={true}
            onChange={(e) => uploadImage(e)}
            id={"art-image"}
          />
          {Object.keys(images).map((image) => {
            let file = images[image]
            return (
              <FileDetails key={image}>
                <GreenDot />
                <Para>{file.name}</Para>
                <Para>{convertBytesToKB(file.size)} KB</Para>
                <span onClick={() => removeFile(image, images)}>x</span>
              </FileDetails>
            )
          })}
        </ShippingContainer>
        <StepLabel>
          <BubbleCounter>3</BubbleCounter>
          <span>CERTIFICATE AUTHENTICITY (OPTIONAL)</span>
        </StepLabel>
        <ShippingContainer>
          <Para>Upload image ( JPG, PNG, PDF )</Para>
          <FileInput
            onChange={(e) => uploadCertificate(e)}
            id={"certificate-authenticity"}
          />
          {Object.keys(certificate).map((cert) => {
            let file = certificate[cert]
            return (
              <FileDetails key={cert}>
                <GreenDot />
                <Para>{file.name}</Para>
                <Para>{convertBytesToKB(file.size)} KB</Para>
                <span onClick={() => removeFile(cert, certificate)}>x</span>
              </FileDetails>
            )
          })}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <PrimaryButton
              onClick={(e) => validateAndNext(e)}
              buttonText={"SUBMIT"}
            />
          </div>
        </ShippingContainer>
      </div>
    </StepContainer>
  )
}
