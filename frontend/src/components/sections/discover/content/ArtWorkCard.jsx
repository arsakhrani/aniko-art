import React, { useState } from "react"
import {
  CoverPicture,
  WrittenContent,
  PriceLink,
} from "./styles/ArtWorkCard.styled"
import PrimaryButton from "../../../atoms/PrimaryButton"
import { Link } from "react-router-dom"
import ArtWorkModal from "./ArtWorkModal"

export default function ArtWorkCard({ cardInfo }) {
  const [showArtModal, setShowArtModal] = useState(false)

  const showModal = () => {
    setShowArtModal(true)
    const body = document.getElementsByTagName("body")
    body[0].classList.add("modal-open")
  }

  const closeModal = () => {
    setShowArtModal(false)
    const body = document.getElementsByTagName("body")
    if (body[0].classList.contains("modal-open"))
      body[0].classList.remove("modal-open")
  }

  return (
    <div>
      {showArtModal && (
        <ArtWorkModal closeModal={() => closeModal()} artInfo={cardInfo} />
      )}
      <p>LOT {cardInfo.lot}</p>
      <CoverPicture src={cardInfo.pictures[0]} onClick={() => showModal()} />
      <WrittenContent>
        <div>
          <h4>{cardInfo.artist}</h4>
          <p>
            {cardInfo.title}, {cardInfo.year}
          </p>
          <span>{cardInfo.gallery}</span>
        </div>
        <Link to={cardInfo.website}>
          <PrimaryButton
            buttonText={"BID FROM $" + cardInfo.minimumBid + ", -"}
          />
        </Link>
      </WrittenContent>
      <PriceLink onClick={() => showModal()}>
        <div>SHOW</div>
        <span></span>
        <div>PRICE</div>
      </PriceLink>
    </div>
  )
}
