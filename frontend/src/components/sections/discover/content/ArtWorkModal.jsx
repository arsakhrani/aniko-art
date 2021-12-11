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
} from "./styles/ArtWorkModal.styled"
import { AuthContext } from "../../../../context/authContext"

export default function ArtWorkModal({ artInfo, closeModal }) {
  const [selectorNumber, setSelectorNumber] = useState(0)
  const { user } = useContext(AuthContext)

  const redirectToStripe = () => {
    return fetch("/api/checkout/create-checkout-buy-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        artworkId: artInfo._id,
        userId: user._id,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json()
      })
      .then(({ url }) => {
        window.location = url
      })
      .catch((e) => console.error(e))
  }

  return (
    <ModalContainer>
      <Modal>
        <Gallery>
          {artInfo.pictures.map((pic, index) => (
            <GalleryPicture
              onClick={() => setSelectorNumber(index)}
              key={pic}
              src={pic}
            />
          ))}
        </Gallery>
        <FeaturePicture>
          <img src={artInfo.pictures[selectorNumber]} />
        </FeaturePicture>
        <Info>
          <h1>
            <span onClick={() => closeModal()}>x</span>
          </h1>
          <h2>{artInfo.artist}</h2>
          <h3>LOT {artInfo.lot}</h3>
          <a target="_blank" href={artInfo.website}>
            <span>+ FOLLOW ARTIS</span>T
          </a>
          <p>{artInfo.title}</p>
          <p>{artInfo.medium}</p>
          <p>
            {artInfo.dimensionsIn.length}x{artInfo.dimensionsIn.width}x
            {artInfo.dimensionsIn.depth} in
          </p>
          <p>
            {artInfo.dimensionsCm.length}x{artInfo.dimensionsCm.width}x
            {artInfo.dimensionsCm.depth} cm
          </p>
          <div className="buy-art-container">
            <h2>$ {artInfo.price}</h2>
            <PrimaryButton
              onClick={() => redirectToStripe()}
              buttonText={"BUY DIRECTLY"}
            />
          </div>
          <div className="sale-info-container">
            <p>Including</p>
            <div>
              <p>Insurance & shipping</p>
              <p>Royalty to the artist for resale rights 2%</p>
              <p>Commission 10%</p>
            </div>
          </div>
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
