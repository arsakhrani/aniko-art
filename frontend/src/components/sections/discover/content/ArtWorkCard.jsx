import React, { useContext, useState } from "react"
import {
  CoverPicture,
  WrittenContent,
  PriceLink,
  GradientContainer,
  SoldLabel,
  CardHeading,
  CardText,
} from "./styles/ArtWorkCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import ArtWorkModal from "./ArtWorkModal"
import { AuthContext } from "../../../../context/authContext"
import { useHistory } from "react-router"
import paymentService from "../../../../services/paymentService"
import ConfirmModal from "./ConfirmModal"
import NotificationModal from "../../../atoms/NotificationModal"

export default function ArtWorkCard({
  cardInfo,
  editMode,
  selectImage,
  featureBorder,
}) {
  const [showArtModal, setShowArtModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const history = useHistory()

  const { user } = useContext(AuthContext)

  const showModal = (type) => {
    if (!cardInfo.sold) {
      if (type === "art") {
        setShowConfirmModal(false)
        setShowArtModal(true)
      } else if (type === "confirm") {
        setShowArtModal(false)
        setShowConfirmModal(true)
      }
      const body = document.getElementsByTagName("body")
      body[0].classList.add("modal-open")
    }
  }

  const closeModal = () => {
    setShowArtModal(false)
    setShowConfirmModal(false)
    const body = document.getElementsByTagName("body")
    if (body[0].classList.contains("modal-open"))
      body[0].classList.remove("modal-open")
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
            cardInfo.highestBid > 0
              ? cardInfo.highestBid + cardInfo.bidIncrement
              : cardInfo.minimumBid,
          artworkId: cardInfo._id,
          bidIncrement: cardInfo.bidIncrement,
        },
      })
    }
  }

  const isOwner = cardInfo.owner === user._id

  return (
    <div>
      {showArtModal && (
        <ArtWorkModal closeModal={closeModal} artInfo={cardInfo} />
      )}
      {showConfirmModal && (
        <ConfirmModal closeModal={closeModal} artInfo={cardInfo} />
      )}
      {modalMessage && (
        <NotificationModal
          message={modalMessage}
          closeModal={() => setModalMessage("")}
        />
      )}
      <p>LOT {cardInfo.lot}</p>
      <GradientContainer
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        $sold={cardInfo.sold}
        $hover={isHovering}
        onClick={() => showModal("art")}
        $pointer={!cardInfo.sold}
      >
        <CoverPicture
          src={cardInfo.pictures[0]}
          alt={cardInfo.title + " cover picture"}
        />
        {cardInfo.sold && isHovering && <SoldLabel>SOLD!</SoldLabel>}
      </GradientContainer>
      <WrittenContent>
        <div>
          <CardHeading>{cardInfo.artist}</CardHeading>
          <CardText>
            {cardInfo.title}, {cardInfo.year}
          </CardText>
          <span>{cardInfo.gallery}</span>
        </div>
        {!isOwner && !cardInfo.sold && cardInfo.minimumBid > 0 && (
          <PrimaryButton
            onClick={() => setupBid()}
            buttonText={
              "BID FROM $" +
              (cardInfo.highestBid > 0
                ? cardInfo.highestBid + cardInfo.bidIncrement
                : cardInfo.minimumBid) +
              ", -"
            }
            disabled={isLoading}
            loading={isLoading}
          />
        )}
        {isOwner && cardInfo.highestBid > 0 && !cardInfo.sold && (
          <PrimaryButton
            buttonText={"ACCEPT BID FOR $" + cardInfo.highestBid + ", -"}
            onClick={() => showModal("confirm")}
          />
        )}
      </WrittenContent>
      {!cardInfo.sold && <PriceLink>$ {cardInfo.price}, -</PriceLink>}
    </div>
  )
}
