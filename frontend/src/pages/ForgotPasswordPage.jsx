import React, { useState } from "react"
import { Link } from "react-router-dom"
import TextInput from "../components/inputs/TextInput"
import PrimaryButton from "../components/atoms/PrimaryButton"
import authService from "../services/authService"
import { Container } from "./styles/ForgotPasswordPage.styled"
import ErrorMessage from "../components/atoms/ErrorMessage"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const sendEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsDisabled(true)
    const email = e.target.email.value
    const request = await authService.forgotPassword(email)

    if (request.success) {
      setIsLoading(false)
      setErrorMessage("")
      setSuccessMessage("Done! You have got mail!")
    } else {
      setIsLoading(false)
      setIsDisabled(false)
      setSuccessMessage("")
      setErrorMessage("The email address you entered is not registered.")
    }
  }

  return (
    <Container>
      <h1>Aniko.Art</h1>
      <p>Enter the email address associated with your account.</p>
      <form onSubmit={(e) => sendEmail(e)}>
        <TextInput
          id={"forgot-password-email"}
          label={"Email"}
          type={"email"}
          name={"email"}
        />
        <p>We will email you a link to reset your password.</p>
        {errorMessage && <ErrorMessage messageBody={errorMessage} />}
        {successMessage && <p>{successMessage}</p>}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <PrimaryButton
            loading={isLoading}
            disabled={isDisabled}
            submit={true}
            buttonText={"Submit"}
          />
        </div>
      </form>
      <Link
        style={{ marginTop: "2em", textDecoration: "underline" }}
        to={"/login"}
      >
        Back to login
      </Link>
    </Container>
  )
}
