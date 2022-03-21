import React, { useState } from "react"
import {
  Modal,
  ModalContainer,
  ButtonContainer,
  ConfirmText,
} from "./styles/ConfirmModal.styled"
import { ReactComponent as Close } from "../../../../assets/icons/close.svg"
import PrimaryButton from "../../../atoms/PrimaryButton"
import TransparentButton from "../../../atoms/TransparentButton"
import paymentService from "../../../../services/paymentService"
import { useHistory } from "react-router"
import ErrorMessage from "../../../atoms/ErrorMessage"

export default function ConfirmModal({ closeModal, artInfo }) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  const acceptBid = async () => {
    setIsLoading(true)
    const acceptance = await paymentService.acceptBid(artInfo)
    if (acceptance.success) {
      history.push("/")
    } else {
      setErrorMessage("Something went wrong, please try again later.")
      setIsLoading(false)
    }
  }

  return (
    <ModalContainer>
      <Modal>
        {!isLoading && (
          <Close
            width={24}
            stroke={"black"}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 15,
              right: 15,
            }}
            onClick={closeModal}
          />
        )}
        <ConfirmText>
          Are you sure you would like to accept the current bid amount of $
          {artInfo.highestBid}?
        </ConfirmText>
        {errorMessage && <ErrorMessage messageBody={errorMessage} />}
        {!errorMessage && (
          <ButtonContainer>
            <TransparentButton
              disabled={isLoading}
              buttonText={"NO"}
              onClick={closeModal}
            />
            <PrimaryButton
              disabled={isLoading}
              loading={isLoading}
              buttonText={"YES"}
              onClick={acceptBid}
            />
          </ButtonContainer>
        )}
      </Modal>
    </ModalContainer>
  )
}
