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

  const authContext = useContext(AuthContext)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [taxNumber, setTaxNumber] = useState("")
  const [termsAndConditions, setTermsAndConditions] = useState(false)
  const [fullName, setFullName] = useState(authContext.user.fullName || "")
  const [website, setWebsite] = useState(authContext.user.website || "")
  const [shippingAddress, setShippingAddress] = useState({
    street: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.street
      : "",
    city: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.city
      : "",
    country: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.country
      : "",
    postCode: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.postCode
      : "",
    specialInstructions: authContext.user.shippingAddress
      ? authContext.user.shippingAddress.specialInstructions
      : "",
  })
  const [phoneNumber, setPhoneNumber] = useState(
    authContext.user.phoneNumber || ""
  )
  const [insuranceMethod, setInsuranceMethod] = useState(
    authContext.user.insuranceMethod || ""
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

  const validate = async () => {
    const banner = await uploadImage(bannerPicture)
    const audio = await uploadAudio(audioFile)
    const { cvUrl, cvFileName } = await uploadCv(cvFile)
    const feature = await uploadImage(featureFile)
    const idImageUpload = await uploadImage(idImageArray)
    const faceImageUpload = await uploadImage(faceImageArray)

    const user = {
      fullName,
      shippingAddress,
      phoneNumber,
      insuranceMethod,
      website,
      bannerPicture: banner || authContext.user.bannerPicture,
      audioFile: audio || authContext.user.audioFile,
      cvFile: cvUrl || authContext.user.cvFile,
      cvFileName: cvFileName || authContext.user.cvFileName,
      featurePicture: feature || authContext.user.cvFileName,
      idPicture: idImageUpload || authContext.user.idPicture,
      facePicture: faceImageUpload || authContext.user.facePicture,
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
          ...user,
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
          authContext.setUser(registerUser.user)
          authContext.setIsAuthenticated(true)

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
      const updateUser = await authService.update(user, authContext.user._id)
      if (updateUser.isAuthenticated) {
        authContext.setUser(updateUser.user)
        if (authContext.user.sellerType === "artist") {
          history.push("/discover/artists")
          history.go(0)
        } else if (authContext.user.sellerType === "gallery") {
          history.push("/discover/galleries")
          history.go(0)
        } else if (authContext.user.sellerType === "partner") {
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
                    onChange={(e) => preloadIdImage(e)}
                    id={"id-image"}
                  />
                  <FileDescription object={idImage} removeFile={removeFile} />
                  <Para>Upload Face ( JPG, PNG, PDF ) MAX. 2MB</Para>
                  <FileInput
                    multiple={false}
                    onChange={(e) => preloadFaceImage(e)}
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
                authContext.user.sellerType === "gallery"
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
            authContext.user.sellerType === "gallery" ? (
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
        <StepLabel>
          <BubbleCounter>{registrationDetails ? "3" : "2"}</BubbleCounter>
          <span>CHOOSE DISPLAY IMAGES</span>
        </StepLabel>
        <ShippingContainer>
          {((registrationDetails && registrationDetails.sellerType) ||
            authContext.user.sellerType) && (
            <div>
              <Para style={{ marginTop: 0 }}>Upload your feature image:</Para>
              <FileInput
                id={"feature-image"}
                onChange={(e) => preloadFeature(e)}
                multiple={false}
              />
              <FileDescription object={featureObject} removeFile={removeFile} />
            </div>
          )}
          {((registrationDetails &&
            registrationDetails.sellerType === "artist") ||
            authContext.user.sellerType === "artist") && (
            <div>
              <Para>Upload your own Portfolio Banner:</Para>
              <FileInput
                id={"portfolio-banner"}
                onChange={(e) => preloadBanner(e)}
                multiple={false}
              />
              <FileDescription object={bannerObject} removeFile={removeFile} />
              <Para>
                Upload an audio file that plays while visiting your portfolio:
              </Para>
              <FileInput
                audio={true}
                onChange={(e) => preloadAudio(e)}
                id={"portfolio-audio"}
                multiple={false}
              />
              <FileDescription object={audioObject} removeFile={removeFile} />
              <Para>Upload your CV:</Para>
              <FileInput
                cv={true}
                onChange={(e) => preloadCv(e)}
                id={"cv"}
                multiple={false}
              />
              <FileDescription object={cvObject} removeFile={removeFile} />
            </div>
          )}
        </ShippingContainer>
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
            onClick={() => validate()}
            buttonText={"Save and continue"}
            loading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </Container>
  )
}
