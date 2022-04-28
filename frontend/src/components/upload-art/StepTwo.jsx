import React, { useEffect, useState, useContext } from "react"
import TextInput from "../inputs/TextInput"
import {
  Detail,
  Para,
  StepContainer,
} from "../sections/manage-profile/styles/ManageProfile.styled"
import CheckboxInput from "../inputs/CheckboxInput"
import PrimaryButton from "../atoms/PrimaryButton"
import { useDispatch, useSelector } from "react-redux"
import discoverService from "../../services/discoverService"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import { saveDetails } from "../../state/upload/uploadArtSlice"

export default function StepTwo() {
  const uploadDetails = useSelector((state) => state.uploadDetails.value)
  const [convertedLength, setConvertedLength] = useState(0)
  const [convertedWidth, setConvertedWidth] = useState(0)
  const [convertedDepth, setConvertedDepth] = useState(0)
  const [price, setPrice] = useState(1000)
  const [errorMessage, setErrorMessage] = useState("")
  const [showBidInput, setShowBidInput] = useState(false)
  const [minimumBid, setMinimumBid] = useState(price * 0.2)

  const dispatch = useDispatch()

  const authContext = useContext(AuthContext)

  const history = useHistory()

  useEffect(() => {
    if (uploadDetails.unit === "cm") {
      setConvertedLength(
        Math.round((uploadDetails.length / 2.54 + Number.EPSILON) * 10) / 10
      )
      setConvertedWidth(
        Math.round((uploadDetails.width / 2.54 + Number.EPSILON) * 10) / 10
      )
      setConvertedDepth(
        Math.round((uploadDetails.depth / 2.54 + Number.EPSILON) * 10) / 10
      )
    } else {
      setConvertedLength(Math.round(uploadDetails.length * 2.54))
      setConvertedWidth(Math.round(uploadDetails.width * 2.54))
      setConvertedDepth(Math.round(uploadDetails.depth * 2.54))
    }
  }, [])

  const uploadCert = async () => {
    if (uploadDetails.certificateArray.length === 1) {
      const upload = await discoverService.uploadImages(
        uploadDetails.certificateArray
      )
      return upload
    } else {
      return []
    }
  }

  const uploadImages = async () => {
    const artImageUpload = await discoverService.uploadImages(
      uploadDetails.imagesArray
    )

    const certImageUpload = await uploadCert()

    return {
      artImageUpload,
      certImageUpload,
    }
  }

  const validateAndSubmit = async () => {
    if (price < 1000) {
      setErrorMessage(
        "Minimum price is 1000 euros. Please adjust the asking price accordingly."
      )
    } else {
      const images = await uploadImages()

      const convertedMeasurements = {
        length: convertedLength,
        width: convertedWidth,
        depth: convertedDepth,
      }
      const enteredMeasurements = {
        length: uploadDetails.length,
        width: uploadDetails.width,
        depth: uploadDetails.depth,
      }

      const artwork = {
        artist: uploadDetails.artist,
        gallery: uploadDetails.gallery,
        country: uploadDetails.country,
        title: uploadDetails.title,
        medium: uploadDetails.medium,
        year: uploadDetails.year,
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
        owner: authContext.user._id,
        minimumBid: showBidInput ? minimumBid : 0,
      }
      const artUpload = await discoverService.uploadArt(artwork)
      if (artUpload.success) {
        history.push("discover")
        dispatch(saveDetails({}))
        history.go(0)
      } else {
        //error handle
      }
    }
  }

  return (
    uploadDetails && (
      <StepContainer>
        <div>
          <h1>{uploadDetails.title}</h1>
          <Para>IMAGE</Para>
          <img
            width="100%"
            src={URL.createObjectURL(uploadDetails.imagesArray[0])}
            alt={uploadDetails.title + " preview image"}
          />
        </div>
        <div>
          <Para>DETAILS</Para>
          <Detail>
            <p>Year</p>
            <Para>{uploadDetails.year}</Para>
          </Detail>
          <Detail>
            <p>Category</p>
            <Para>{uploadDetails.medium}</Para>
          </Detail>
          <Detail>
            <p>Dimension (l/w/d)</p>
            {uploadDetails.unit === "cm" ? (
              <Para>
                {uploadDetails.length}x{uploadDetails.width}x
                {uploadDetails.depth} cm | {convertedLength}x{convertedWidth}x
                {convertedDepth} inch
              </Para>
            ) : (
              <Para>
                {convertedLength}x{convertedWidth}x{convertedDepth} cm |{" "}
                {uploadDetails.length}x{uploadDetails.width}x
                {uploadDetails.depth} inch
              </Para>
            )}
          </Detail>
          <Para>PRICE</Para>
          <p style={{ marginBottom: "2em" }}>
            Do you already know the price you would like to sell this artwork?*
          </p>
          <div style={{ width: "90%" }}>
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
          <Para>*We only offer from 1000 euro and up</Para>
          <Para>
            ( The price will include{" "}
            <span style={{ cursor: "pointer" }}>insurance</span> and{" "}
            <span style={{ cursor: "pointer" }}>shipping</span> )
          </Para>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
          <div>
            <PrimaryButton onClick={validateAndSubmit} buttonText={"SUBMIT"} />
          </div>
        </div>
      </StepContainer>
    )
  )
}
