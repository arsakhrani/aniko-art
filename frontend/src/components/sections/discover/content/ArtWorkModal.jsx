import React, { useState } from "react"
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

export default function ArtWorkModal({ artInfo, closeModal }) {
  const [selectorNumber, setSelectorNumber] = useState(1)

  return (
    <ModalContainer>
      <Modal>
        <Gallery>
          <GalleryPicture
            src={artInfo.coverPicture}
            onClick={() => setSelectorNumber(1)}
          />
          {artInfo.pictures.map((pic, index) => (
            <GalleryPicture
              onClick={() => setSelectorNumber(index + 2)}
              key={pic}
              src={pic}
            />
          ))}
        </Gallery>
        <FeaturePicture>
          {selectorNumber === 1 && <img src={artInfo.coverPicture} />}
          {selectorNumber !== 1 && (
            <img src={artInfo.pictures[selectorNumber - 2]} />
          )}
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
          <p>{artInfo.name}</p>
          <p>{artInfo.medium}</p>
          {artInfo.dimensionsIn && <p>{artInfo.dimensionsIn} in</p>}
          {artInfo.dimensionsCm && <p>{artInfo.dimensionsCm} cm</p>}
          <div className="buy-art-container">
            <h2>$ {artInfo.price}</h2>
            <PrimaryButton buttonText={"BUY DIRECTLY"} />
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
          <div onClick={() => setSelectorNumber(1)}></div>
          {artInfo.pictures.map((pic, index) => (
            <div
              key={"selector-" + pic}
              onClick={() => setSelectorNumber(index + 2)}
            ></div>
          ))}
        </ImageSelector>
      </Modal>
    </ModalContainer>
  )
}
