import React, { useState, useContext } from "react"
import PrimaryButton from "../../../atoms/PrimaryButton"
import {
  ModalContainer,
  Modal,
  Gallery,
  FeaturePicture,
  Info,
  GalleryPicture,
  ImageSelector,
  ChatBlock,
  SubTitle,
  OtherText,
} from "./styles/ArtWorkModal.styled"
import { AuthContext } from "../../../../context/authContext"
import { ReactComponent as Close } from "../../../../assets/icons/close.svg"
import paymentService from "../../../../services/paymentService"
import discoverService from "../../../../services/discoverService"
import { useHistory } from "react-router-dom"
import NotificationModal from "../../../atoms/NotificationModal"

export default function ArtWorkModal({ artInfo, closeModal }) {
  const [selectorNumber, setSelectorNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const history = useHistory()

  const { user } = useContext(AuthContext)

  const checkOut = () => {
    if (!user._id) {
      history.push("/login")
    } else if (!user.isVerified) {
      setModalMessage("Please verify your email to continue")
    } else {
      setIsLoading(true)
      paymentService.redirectToStripe(user, artInfo)
    }
  }

  const deleteWork = () => {
    setIsLoading(true)
    const attempt = discoverService.deleteArtwork(artInfo._id)
    if (attempt) {
      history.go(0)
    } else {
      console.log("error handle")
    }
  }

  const sendChatRequest = async () => {
    if (!user._id) {
      history.push("/login")
    } else if (!user.isVerified) {
      setModalMessage("Please verify your email to continue")
    } else {
      const response = await discoverService.sendChatRequest(
        user._id,
        artInfo.owner
      )
      if (response.success) {
        setModalMessage(
          "An email has been sent to the admin to approve your request."
        )
      } else {
        setModalMessage(
          "Sorry! We are unable to provide this service at the moment."
        )
      }
    }
  }

  const setupBid = async () => {
    if (!user._id) {
      history.push("/login")
    } else if (!user.isVerified) {
      setModalMessage("Please verify your email to continue")
    } else {
      setIsLoading(true)
      const secret = await paymentService.createCheckoutSaveSession(user._id)
      history.push({
        pathname: "/create-bid",
        state: {
          secret: secret.client_secret,
          highestBid:
            artInfo.highestBid > 0
              ? artInfo.highestBid + artInfo.bidIncrement
              : artInfo.minimumBid,
          artworkId: artInfo._id,
          bidIncrement: artInfo.bidIncrement,
        },
      })
    }
  }

  const isOwner = artInfo.owner === user._id

  return (
    <ModalContainer>
      {modalMessage && (
        <NotificationModal
          message={modalMessage}
          closeModal={() => setModalMessage("")}
        />
      )}
      <Modal>
        <Gallery>
          {artInfo.pictures.map((pic, index) => (
            <GalleryPicture
              onClick={() => setSelectorNumber(index)}
              key={pic}
              src={pic}
              alt={"Gallery picture " + index}
            />
          ))}
        </Gallery>
        <FeaturePicture>
          <img
            src={artInfo.pictures[selectorNumber]}
            alt={artInfo.title + " feature picture"}
          />
        </FeaturePicture>
        <Info>
          <Close
            width={24}
            stroke={"white"}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 20,
              right: 25,
            }}
            onClick={closeModal}
          />
          <div className="basic-grid">
            <h2>{artInfo.artist}</h2>
            <SubTitle>LOT {artInfo.lot}</SubTitle>
            <ChatBlock onClick={sendChatRequest}>
              <span>+ CHAT WITH OWNE</span>R
            </ChatBlock>
            <OtherText>{artInfo.title}</OtherText>
            <OtherText>{artInfo.medium}</OtherText>
            <OtherText>
              {artInfo.dimensionsIn.length}x{artInfo.dimensionsIn.width}x
              {artInfo.dimensionsIn.depth} in
            </OtherText>
            <OtherText>
              {artInfo.dimensionsCm.length}x{artInfo.dimensionsCm.width}x
              {artInfo.dimensionsCm.depth} cm
            </OtherText>
          </div>
          <div className="purchase-grid">
            <div className="buy-art-container">
              <h2>$ {artInfo.price}</h2>
              {!isOwner ? (
                <PrimaryButton
                  onClick={checkOut}
                  buttonText={"BUY DIRECTLY"}
                  loading={isLoading}
                  disabled={isLoading}
                />
              ) : (
                <PrimaryButton
                  onClick={deleteWork}
                  buttonText={"DELETE WORK"}
                  loading={isLoading}
                  disabled={isLoading}
                />
              )}
            </div>
            <div className="sale-info-container">
              <OtherText>Including</OtherText>
              <div>
                <OtherText>Insurance & shipping</OtherText>
                <OtherText>
                  Royalty to the artist for resale rights 2%
                </OtherText>
                <OtherText>Commission 10%</OtherText>
              </div>
            </div>
          </div>
          {artInfo.minimumBid > 0 && (
            <div className="bid-grid">
              <h2>Starting Bid</h2>
              <h3>
                ${" "}
                {artInfo.highestBid
                  ? artInfo.highestBid + artInfo.bidIncrement
                  : artInfo.minimumBid}
              </h3>
              {!isOwner && (
                <PrimaryButton
                  disabled={isLoading}
                  loading={isLoading}
                  buttonText={"BID NOW"}
                  onClick={() => setupBid()}
                />
              )}
              <div className="sale-info-container">
                <OtherText>Including</OtherText>
                <div>
                  <OtherText>Insurance & shipping</OtherText>
                  <OtherText>
                    Royalty to the artist for resale rights 2%
                  </OtherText>
                  <OtherText>Commission 10%</OtherText>
                </div>
              </div>
            </div>
          )}
        </Info>
        <ImageSelector $number={selectorNumber}>
          {artInfo.pictures.map((pic, index) => (
            <div
              key={"selector-" + pic}
              onClick={() => setSelectorNumber(index)}
            ></div>
          ))}
        </ImageSelector>
      </Modal>
    </ModalContainer>
  )
}
