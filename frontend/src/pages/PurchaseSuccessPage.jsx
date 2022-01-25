import React, { useEffect, useState } from "react"
import {
  Modal,
  ModalContainer,
  ConfirmText,
} from "../components/sections/discover/content/styles/ConfirmModal.styled"
import PrimaryButton from "../components/atoms/PrimaryButton"
import paymentService from "../services/paymentService"
import { useHistory, useParams } from "react-router"

export default function ConfirmModal() {
  const [isLoading, setIsLoading] = useState(true)
  const [artwork, setArtwork] = useState(null)

  const history = useHistory()
  const { artworkId } = useParams()
  const { buyerId } = useParams()

  const initialize = async () => {
    const response = await paymentService.finalizeSale(artworkId, buyerId)
    if (response.success) {
      setArtwork(response.artwork)
      setIsLoading(false)
    } else {
      history.push("/")
    }
  }

  useEffect(() => {
    if (!artworkId || !buyerId) {
      history.push("/")
    } else {
      initialize()
    }
  }, [])

  const closePage = () => {
    history.push("/")
    history.go(0)
  }

  return (
    <ModalContainer>
      <Modal>
        {artwork && (
          <ConfirmText>
            Congratulations! You have purchased {artwork.title} by{" "}
            {artwork.artist} for {artwork.price}. You shortly recieve an email
            with details on what to expect next.
          </ConfirmText>
        )}
        <PrimaryButton
          disabled={isLoading}
          loading={isLoading}
          buttonText={"OK"}
          onClick={() => closePage()}
        />
      </Modal>
    </ModalContainer>
  )
}
