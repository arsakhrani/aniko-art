import React, { useContext, useState } from "react"
import {
  CoverPicture,
  WrittenContent,
  PriceLink,
  GradientContainer,
  SoldLabel,
} from "./styles/ArtWorkCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import ArtWorkModal from "./ArtWorkModal"
import { AuthContext } from "../../../../context/authContext"
import { useHistory } from "react-router"
import paymentService from "../../../../services/paymentService"
import ConfirmModal from "./ConfirmModal"

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

  const history = useHistory()

  const { user } = useContext(AuthContext)

  const showModal = (type) => {
    if (!editMode) {
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
    } else {
      selectImage()
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
    setIsLoading(true)
    const secret = await paymentService.createCheckoutSaveSession(user._id)
    history.push({
      pathname: "/create-bid",
      state: {
        secret: secret.client_secret,
        minimumBid: cardInfo.minimumBid + 50,
        artworkId: cardInfo._id,
      },
    })
  }

  const isOwner = cardInfo.owner === user._id

  return (
    <div>
      {showArtModal && (
        <ArtWorkModal closeModal={() => closeModal()} artInfo={cardInfo} />
      )}
      {showConfirmModal && (
        <ConfirmModal closeModal={() => closeModal()} artInfo={cardInfo} />
      )}
      <p>LOT {cardInfo.lot}</p>
      <GradientContainer
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        $sold={cardInfo.sold}
        $hover={isHovering}
        onClick={() => showModal("art")}
        $pointer={!cardInfo.sold}
        $featureBorder={featureBorder}
      >
        <CoverPicture src={cardInfo.pictures[0]} />
        {cardInfo.sold && isHovering && <SoldLabel>SOLD!</SoldLabel>}
      </GradientContainer>
      <WrittenContent>
        <div>
          <h4>{cardInfo.artist}</h4>
          <p>
            {cardInfo.title}, {cardInfo.year}
          </p>
          <span>{cardInfo.gallery}</span>
        </div>
        {!isOwner && !cardInfo.sold && cardInfo.minimumBid > 0 && (
          <PrimaryButton
            onClick={() => setupBid()}
            buttonText={"BID FROM $" + (cardInfo.minimumBid + 50) + ", -"}
            disabled={isLoading}
            loading={isLoading}
          />
        )}
        {isOwner && cardInfo.highestBidHolder && !cardInfo.sold && (
          <PrimaryButton
            buttonText={"ACCEPT BID FOR $" + cardInfo.minimumBid + ", -"}
            onClick={() => showModal("confirm")}
          />
        )}
      </WrittenContent>
      {!cardInfo.sold && <PriceLink>$ {cardInfo.price}, -</PriceLink>}
    </div>
  )
}
