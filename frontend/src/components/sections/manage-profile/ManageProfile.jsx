import React, { useState, useContext } from "react"
import { useSelector } from "react-redux"
import CheckboxInput from "../../inputs/CheckboxInput"
import TextInput from "../../inputs/TextInput"
import ErrorMessage from "../../atoms/ErrorMessage"
import {
  Container,
  BubbleCounter,
  StepLabel,
  ShippingContainer,
  RadialsContainer,
  Para,
} from "./styles/ManageProfile.styled"
import RadialInput from "../../inputs/RadialInput"
import PrimaryButton from "../../atoms/PrimaryButton"
import FileInput from "../../inputs/FileInput"
import authService from "../../../services/authService"
import { AuthContext } from "../../../context/authContext"
import { useHistory } from "react-router"
import DropdownInput from "../../inputs/DropdownInput"
import { countries } from "../../../services/dropdownValues"
import theme from "../../common/theme"
import {
  addNewFiles,
  convertNestedObjectToArray,
  uploadAudio,
  uploadCv,
  uploadImage,
} from "../../../services/uploadFunctions"
import FileDescription from "../../atoms/FileDescription"

export default function ManageProfile() {
  const registrationDetails = useSelector(
    (state) => state.registrationInfo.value
  )

  const history = useHistory()

  const { user, setUser, setIsAuthenticated } = useContext(AuthContext)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [taxNumber, setTaxNumber] = useState("")
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const [fullName, setFullName] = useState(user.fullName || "")
  const [website, setWebsite] = useState(user.website || "")
  const [shippingAddress, setShippingAddress] = useState({
    street: user.shippingAddress?.street || "",
    city: user.shippingAddress?.city || "",
    country: user.shippingAddress?.country || "",
    postCode: user.shippingAddress?.postCode || "",
    specialInstructions: user.shippingAddress?.specialInstructions || "",
  })
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "")
  const [insuranceMethod, setInsuranceMethod] = useState(
    user.insuranceMethod || ""
  )
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [idImage, setIdImage] = useState({})
  const [faceImage, setFaceImage] = useState({})
  const [idImageArray, setIdImageArray] = useState([])
  const [faceImageArray, setFaceImageArray] = useState([])
  const [bannerPicture, setBannerPicture] = useState([])
  const [bannerObject, setBannerObject] = useState({})
  const [audioObject, setAudioObject] = useState({})
  const [audioFile, setAudioFile] = useState([])
  const [cvObject, setCvObject] = useState({})
  const [cvFile, setCvFile] = useState([])
  const [featureObject, setFeatureObject] = useState({})
  const [featureFile, setFeatureFile] = useState([])
  const [soundDescription, setSoundDescription] = useState(
    user.soundDescription || ""
  )
  const [birthCity, setBirthCity] = useState(user.birthCity || "")
  const [birthCountry, setBirthCountry] = useState(user.birthCountry || "")
  const [birthYear, setBirthYear] = useState(user.birthYear || null)

  const preloadIdImage = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 2097152) {
        setErrorMessage("Please make sure the image file size is under 2MB.")
      } else {
        const updatedImages = addNewFiles(newFiles, e, idImage)
        setIdImage(updatedImages)
        setIdImageArray(convertNestedObjectToArray(updatedImages))
      }
    }
  }

  const preloadFaceImage = (e) => {
    const { files: newFiles } = e.target
    if (newFiles.length) {
      if (newFiles[0].size > 2097152) {
        setErrorMessage("Please make sure the image file size is under 2MB.")
      } else {
        const updatedImages = addNewFiles(newFiles, e, faceImage)
        setFaceImage(updatedImages)
        setFaceImageArray(convertNestedObjectToArray(updatedImages))
      }
    }
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
    if (state === idImage) {
      setIdImage({ ...state })
      setIdImageArray(convertNestedObjectToArray({ ...state }))
    }
    if (state === faceImage) {
      setFaceImage({ ...state })
      setFaceImageArray(convertNestedObjectToArray({ ...state }))
    }
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
    const banner = await uploadImage(bannerPicture)
    const audio = await uploadAudio(audioFile)
    const { cvUrl, cvFileName } = await uploadCv(cvFile)
    const feature = await uploadImage(featureFile)
    const idImageUpload = await uploadImage(idImageArray)
    const faceImageUpload = await uploadImage(faceImageArray)

    const userDetails = {
      fullName,
      shippingAddress,
      phoneNumber,
      insuranceMethod,
      website,
      soundDescription,
      birthCity,
      birthCountry,
      birthYear,
      bannerPicture: banner || user.bannerPicture,
      audioFile: audio || user.audioFile,
      cvFile: cvUrl || user.cvFile,
      cvFileName: cvFileName || user.cvFileName,
      featurePicture: feature || user.featurePicture,
      idPicture: idImageUpload || user.idPicture,
      facePicture: faceImageUpload || user.facePicture,
    }

    if (registrationDetails) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (password !== confirmPassword) {
        setErrorMessage("passwords do not match")
      } else if (!regex.test(password)) {
        setErrorMessage(
          "password must be eight characters with at least one letter and one number"
        )
      } else if (!termsAndConditions) {
        setErrorMessage("you must agree to terms and conditions")
      } else if (!fullName) {
        setErrorMessage("Please enter a name")
      } else if (registrationDetails.sellerType === "gallery" && !taxNumber) {
        setErrorMessage("Please enter a valid tax number")
      } else {
        setErrorMessage("")
        setIsLoading(true)
        const newUser = {
          ...userDetails,
          password,
          taxNumber,
          email: registrationDetails.email,
          role: registrationDetails.type,
          interests: registrationDetails.interests,
          sellerType: registrationDetails.sellerType,
        }
        const registerUser = await authService.register(newUser)
        if (!registerUser.isAuthenticated) {
          setErrorMessage("email address is already taken")
          setIsLoading(false)
        } else {
          setUser(registerUser.user)
          setIsAuthenticated(true)

          if (registrationDetails.sellerType === "artist") {
            history.push("/discover/artists")
            history.go(0)
          } else if (registrationDetails.sellerType === "gallery") {
            history.push("/discover/galleries")
            history.go(0)
          } else if (registrationDetails.sellerType === "partner") {
            history.push("/discover/partners")
            history.go(0)
          } else {
            history.push("/discover/artworks")
            history.go(0)
          }
        }
      }
    } else {
      const updateUser = await authService.update(userDetails, user._id)
      if (updateUser.isAuthenticated) {
        setUser(updateUser.user)
        if (user.sellerType === "artist") {
          history.push("/discover/artists")
          history.go(0)
        } else if (user.sellerType === "gallery") {
          history.push("/discover/galleries")
          history.go(0)
        } else if (user.sellerType === "partner") {
          history.push("/discover/partners")
          history.go(0)
        } else {
          history.push("/discover/artworks")
          history.go(0)
        }
      } else {
        console.log("handle error")
      }
    }
  }

  return (
    <Container>
      <div>
        <h1>{registrationDetails ? "Setup" : "Manage"} Profile</h1>
        {registrationDetails && (
          <div>
            <StepLabel>
              <BubbleCounter>1</BubbleCounter>
              <span>VERIFY ACCOUNT</span>
            </StepLabel>
            <ShippingContainer>
              <div style={{ marginBottom: "1em" }}>
                <TextInput
                  id={"password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name={"password"}
                  type={"password"}
                  label={"Choose a password *"}
                />
              </div>
              <div style={{ marginBottom: "1em" }}>
                <TextInput
                  id={"password-confirm"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  name={"password-confirm"}
                  type={"password"}
                  label={"Confirm password *"}
                />
              </div>
              {(registrationDetails.sellerType === "partner" ||
                registrationDetails.sellerType === "artist") && (
                <div>
                  <Para>Upload ID ( JPG, PNG, PDF ) MAX. 2MB</Para>
                  <FileInput
                    multiple={false}
                    onChange={preloadIdImage}
                    id={"id-image"}
                  />
                  <FileDescription object={idImage} removeFile={removeFile} />
                  <Para>Upload Face ( JPG, PNG, PDF ) MAX. 2MB</Para>
                  <FileInput
                    multiple={false}
                    onChange={preloadFaceImage}
                    id={"face-image"}
                  />
                  <FileDescription object={faceImage} removeFile={removeFile} />
                </div>
              )}
              {errorMessage && <ErrorMessage messageBody={errorMessage} />}
              <span onClick={() => setTermsAndConditions(!termsAndConditions)}>
                <CheckboxInput
                  checked={termsAndConditions}
                  label={
                    "I have read and accepted the general terms and conditions *"
                  }
                />
              </span>
            </ShippingContainer>
          </div>
        )}
        <StepLabel>
          <BubbleCounter>{registrationDetails ? "2" : "1"}</BubbleCounter>
          <span>ADD YOUR SHIPPING INFORMATION</span>
        </StepLabel>
        <ShippingContainer>
          <div>
            <TextInput
              id={"full-name"}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type={"text"}
              label={
                (registrationDetails &&
                  registrationDetails.sellerType === "gallery") ||
                user.sellerType === "gallery"
                  ? "Gallery name *"
                  : "Full name *"
              }
              name={"full-name"}
            />
          </div>
          {registrationDetails && registrationDetails.sellerType === "gallery" && (
            <div>
              <TextInput
                id={"tax-numner"}
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                type={"text"}
                label={"Tax Number"}
                name={"tax-number"}
              />
            </div>
          )}
          <div>
            <TextInput
              id={"street"}
              value={shippingAddress.street}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  street: e.target.value,
                })
              }
              type={"text"}
              label={"Street and house number"}
              name={"address-line-one"}
            />
          </div>
          <div>
            <TextInput
              id={"city"}
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  city: e.target.value,
                })
              }
              type={"text"}
              label={"City"}
              name={"city"}
            />
          </div>
          <div>
            {(registrationDetails &&
              registrationDetails.sellerType === "gallery") ||
            user.sellerType === "gallery" ? (
              <DropdownInput
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                options={countries}
                label={"Country"}
                id={"country-select"}
              />
            ) : (
              <TextInput
                id={"country"}
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                type={"text"}
                label={"Country"}
                name={"country"}
              />
            )}
          </div>
          <div>
            <TextInput
              id={"postcode"}
              value={shippingAddress.postCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postCode: e.target.value,
                })
              }
              type={"text"}
              label={"Postcode"}
              name={"postcode"}
            />
          </div>
          <div>
            <TextInput
              id={"phone-number"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type={"text"}
              label={"Phone number"}
              name={"phone-number"}
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
          <div>
            <TextInput
              id={"specia;-instructions"}
              value={shippingAddress.specialInstructions}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  specialInstructions: e.target.value,
                })
              }
              type={"text"}
              label={"Add delivery instructions ( optional )"}
              name={"delivery-instructions"}
            />
          </div>
        </ShippingContainer>
      </div>
      <div>
        <h1 style={{ color: theme.color.grey }}>SUPRISE</h1>
        {((registrationDetails && registrationDetails.sellerType) ||
          user.sellerType) && (
          <div>
            <StepLabel>
              <BubbleCounter>{registrationDetails ? "3" : "2"}</BubbleCounter>
              <span>EDIT PUBLIC PORTFOLIO</span>
            </StepLabel>
            <ShippingContainer>
              <Para style={{ marginTop: 0 }}>Upload your feature image:</Para>
              <FileInput
                id={"feature-image"}
                onChange={preloadFeature}
                multiple={false}
              />
              <FileDescription object={featureObject} removeFile={removeFile} />
              {((registrationDetails &&
                registrationDetails.sellerType === "artist") ||
                user.sellerType === "artist") && (
                <div>
                  <Para>Upload your own Portfolio Banner:</Para>
                  <FileInput
                    id={"portfolio-banner"}
                    onChange={preloadBanner}
                    multiple={false}
                  />
                  <FileDescription
                    object={bannerObject}
                    removeFile={removeFile}
                  />
                  <Para>
                    Upload an audio file that plays while visiting your
                    portfolio:
                  </Para>
                  <FileInput
                    audio={true}
                    onChange={preloadAudio}
                    id={"portfolio-audio"}
                    multiple={false}
                  />
                  <FileDescription
                    object={audioObject}
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
                  <Para>Upload your CV:</Para>
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
                </div>
              )}
            </ShippingContainer>
          </div>
        )}
        <StepLabel>
          <BubbleCounter>{registrationDetails ? "4" : "3"}</BubbleCounter>
          <span>CHOOSE AN INSURANCE METHOD</span>
        </StepLabel>
        <RadialsContainer>
          <RadialInput
            onClick={() => setInsuranceMethod("AXA")}
            axaInsurance={true}
            name={"insurance-method"}
            label={"AXA"}
            checked={insuranceMethod === "AXA"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("LOREM")}
            axaInsurance={true}
            name={"insurance-method"}
            label={"Lorem Ipsum"}
            checked={insuranceMethod === "LOREM"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("IPSUM")}
            axaInsurance={true}
            name={"insurance-method"}
            label={"Lorem Ipsum"}
            checked={insuranceMethod === "IPSUM"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("HAVE-NONE")}
            name={"insurance-method"}
            label={"I have no insurance"}
            checked={insuranceMethod === "HAVE-NONE"}
          />
          <RadialInput
            onClick={() => setInsuranceMethod("NONE-NEEDED")}
            name={"insurance-method"}
            label={"No insurance needed"}
            checked={insuranceMethod === "NONE-NEEDED"}
          />
        </RadialsContainer>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row-reverse",
          }}
        >
          <PrimaryButton
            onClick={validate}
            buttonText={"Save and continue"}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </Container>
  )
}
