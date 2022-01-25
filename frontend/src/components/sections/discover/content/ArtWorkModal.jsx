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
import { ReactComponent as Close } from "../../../../assets/icons/close.svg"
import paymentService from "../../../../services/paymentService"
import discoverService from "../../../../services/discoverService"
import { useHistory } from "react-router-dom"

export default function ArtWorkModal({ artInfo, closeModal }) {
  const [selectorNumber, setSelectorNumber] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const history = useHistory()

  const { user } = useContext(AuthContext)

  const checkOut = () => {
    setIsLoading(true)
    paymentService.redirectToStripe(user, artInfo)
  }

  const deleteWork = () => {
    setIsLoading(true)
    const attempt = discoverService.deleteArtwork(artInfo._id)
    if (attempt) {
      history.go(0)
    } else {
      //error handle
    }
  }

  const isOwner = artInfo.owner === user._id

  return (
    <ModalContainer>
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
            onClick={() => closeModal()}
          />

          <div className="basic-grid">
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
          </div>
          <div className="purchase-grid">
            <div className="buy-art-container">
              <h2>$ {artInfo.price}</h2>
              {!isOwner ? (
                <PrimaryButton
                  onClick={() => checkOut()}
                  buttonText={"BUY DIRECTLY"}
                  loading={isLoading}
                  disabled={isLoading}
                />
              ) : (
                <PrimaryButton
                  onClick={() => deleteWork()}
                  buttonText={"DELETE WORK"}
                  loading={isLoading}
                  disabled={isLoading}
                />
              )}
            </div>
            <div className="sale-info-container">
              <p>Including</p>
              <div>
                <p>Insurance & shipping</p>
                <p>Royalty to the artist for resale rights 2%</p>
                <p>Commission 10%</p>
              </div>
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
