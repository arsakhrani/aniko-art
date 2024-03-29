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
} from "../sections/manage-profile/styles/ManageProfile.styled"
import { saveDetails } from "../../state/upload/uploadArtSlice"
import {
  convertNestedObjectToArray,
  addNewFiles,
  preloadFile,
  removeFile,
} from "../../services/uploadFunctions"
import FileDescription from "../atoms/FileDescription"

export default function StepOne({ changeStep }) {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )

  const date = new Date()

  const { user } = useContext(AuthContext)

  const uploadDetails = useSelector((state) => state.uploadDetails.value)

  const [artist, setArtist] = useState(
    uploadDetails.artist || (user.sellerType === "artist" ? user.fullName : "")
  )

  const [country, setCountry] = useState(uploadDetails.country || "")
  const [title, setTitle] = useState(uploadDetails.title || "")
  const [unit, setUnit] = useState(uploadDetails.unit || "cm")
  const [width, setWidth] = useState(uploadDetails.width || 0)
  const [length, setLength] = useState(uploadDetails.length || 0)
  const [depth, setDepth] = useState(uploadDetails.depth || 0)
  const [medium, setMedium] = useState(uploadDetails.medium || "")
  const [year, setYear] = useState(uploadDetails.year || date.getFullYear())
  const [errorMessage, setErrorMessage] = useState("")
  const [images, setImages] = useState(uploadDetails.images || {})
  const [certificate, setCertificate] = useState(
    uploadDetails.certificate || {}
  )
  const [imagesArray, setImagesArray] = useState(
    uploadDetails.imagesArray || []
  )
  const [certificateArray, setCertificateArray] = useState(
    uploadDetails.certificateArray || []
  )

  const changeArtist = (value) => {
    if (user.sellerType !== "artist") {
      setArtist(value)
    }
  }

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
        gallery: user.sellerType === "gallery" ? user.fullName : "",
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
        images,
        certificate,
      }
      dispatch(saveDetails(details))
      changeStep(2)
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
          <TextInput
            id={"artist"}
            value={artist}
            onChange={(e) => changeArtist(e.target.value)}
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
            onChange={(e) =>
              preloadFile(
                e,
                cvObject,
                (val) => setImagesArray(val),
                (val) => setImages(val),
                (val) => setErrorMessage(val),
                2097152
              )
            }
            id={"art-image"}
          />
          <FileDescription
            object={cvObject}
            arraySetter={(val) => setCvFile(val)}
            objectSetter={(val) => setCvObject(val)}
            removeFile={removeFile}
          />
        </ShippingContainer>
        <StepLabel>
          <BubbleCounter>3</BubbleCounter>
          <span>CERTIFICATE AUTHENTICITY (OPTIONAL)</span>
        </StepLabel>
        <ShippingContainer>
          <Para>Upload image ( JPG, PNG, PDF )</Para>
          <FileInput
            onChange={(e) =>
              preloadFile(
                e,
                cvObject,
                (val) => setCertificateArray(val),
                (val) => setCertificate(val),
                (val) => setErrorMessage(val),
                2097152
              )
            }
            id={"certificate-authenticity"}
            multiple={false}
          />
          <FileDescription
            object={cvObject}
            arraySetter={(val) => setCvFile(val)}
            objectSetter={(val) => setCvObject(val)}
            removeFile={removeFile}
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <PrimaryButton onClick={validateAndNext} buttonText={"SUBMIT"} />
          </div>
        </ShippingContainer>
      </div>
    </StepContainer>
  )
}
