import React from "react"
import {
  Modal,
  ModalContainer,
  ConfirmText,
} from "../sections/discover/content/styles/ConfirmModal.styled"
import PrimaryButton from "./PrimaryButton"

export default function NotificationModal({ message, closeModal }) {
  return (
    <ModalContainer>
      <Modal>
        <ConfirmText>{message}</ConfirmText>
        <PrimaryButton buttonText={"OK"} onClick={closeModal} />
      </Modal>
    </ModalContainer>
  )
}
