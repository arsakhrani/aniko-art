import React from "react"
import { Button, SpinnerContainer } from "./styles/PrimaryButton.styled"
import { ReactComponent as LoadingSpinner } from "../../assets/icons/loading-spinner.svg"

export default function PrimaryButton({
  buttonText,
  id,
  submit,
  onClick,
  disabled,
  loading,
}) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      type={submit ? "submit" : "button"}
      id={id}
      $loading={loading}
    >
      {loading && (
        <SpinnerContainer>
          <LoadingSpinner width="60" />
        </SpinnerContainer>
      )}
      {buttonText}
    </Button>
  )
}
