import React, { useContext, useState } from "react"
import {
  CoverPicture,
  WrittenContent,
  PriceLink,
} from "./styles/ArtWorkCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import ArtWorkModal from "./ArtWorkModal"
import { AuthContext } from "../../../../context/authContext"
import { useHistory } from "react-router"

export default function ArtWorkCard({ cardInfo }) {
  const [showArtModal, setShowArtModal] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const { user } = useContext(AuthContext)

  const showModal = () => {
    if (!cardInfo.sold) {
      setShowArtModal(true)
      const body = document.getElementsByTagName("body")
      body[0].classList.add("modal-open")
    }
  }

  const closeModal = () => {
    setShowArtModal(false)
    const body = document.getElementsByTagName("body")
    if (body[0].classList.contains("modal-open"))
      body[0].classList.remove("modal-open")
  }

  const setupBid = async () => {
    try {
      setDisableButton(true)
      setIsLoading(true)
      const response = await fetch(
        `/api/checkout/create-checkout-save-session/${user._id}`
      )
      const secret = await response.json()
      history.push({
        pathname: "/create-bid",
        state: {
          secret: secret.client_secret,
          minimumBid: cardInfo.minimumBid + 50,
          artworkId: cardInfo._id,
        },
      })
    } catch (e) {
      console.log(e)
      alert(
        "Sorry, the bidding service seems to be down right now. We are currently trying to fix this problem."
      )
    }
  }

  return (
    <div>
      {showArtModal && (
        <ArtWorkModal closeModal={() => closeModal()} artInfo={cardInfo} />
      )}
      <p>LOT {cardInfo.lot}</p>
      <CoverPicture
        $pointer={!cardInfo.sold}
        src={cardInfo.pictures[0]}
        onClick={() => showModal()}
      />
      <WrittenContent>
        <div>
          <h4>{cardInfo.artist}</h4>
          <p>
            {cardInfo.title}, {cardInfo.year}
          </p>
          <span>{cardInfo.gallery}</span>
        </div>
        {!cardInfo.sold && cardInfo.minimumBid > 0 ? (
          <PrimaryButton
            onClick={() => setupBid()}
            buttonText={"BID FROM $" + (cardInfo.minimumBid + 50) + ", -"}
            disabled={disableButton}
            loading={isLoading}
          />
        ) : (
          <div></div>
        )}
      </WrittenContent>
      {!cardInfo.sold && <PriceLink>$ {cardInfo.price}, -</PriceLink>}
    </div>
  )
}
