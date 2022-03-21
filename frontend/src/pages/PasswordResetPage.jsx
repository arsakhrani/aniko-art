import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PrimaryButton from "../components/atoms/PrimaryButton"
import TextInput from "../components/inputs/TextInput"
import { Container } from "./styles/ForgotPasswordPage.styled"
import { useParams, useHistory } from "react-router-dom"
import authService from "../services/authService"
import ErrorMessage from "../components/atoms/ErrorMessage"
import { AuthContext } from "../context/authContext"

export default function PasswordResetPage() {
  const { code } = useParams()
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [email, setEmail] = useState("")

  const initialize = async () => {
    const response = await authService.verifyCode(code)
    console.log(response)
    if (response.success) {
      setEmail(response.email)
    } else {
      history.push("/")
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  const authContext = useContext(AuthContext)

  const updatePassword = async (e) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (password !== passwordConfirm) {
      setErrorMessage("passwords do not match")
    } else if (!regex.test(password)) {
      setErrorMessage(
        "password must be eight characters with at least one letter and one number"
      )
    } else {
      setErrorMessage("")
      setIsLoading(true)
      const details = {
        email,
        password,
      }
      const response = await authService.updatePassword(details)
      if (!response.success) {
        setErrorMessage(
          "A problem occured. Please request a new reset password link."
        )
        setIsLoading(false)
      } else {
        authContext.setUser(response.user)
        authContext.setIsAuthenticated(true)
        history.push("/discover/artworks")
      }
    }
  }

  return (
    <Container>
      <h1>Aniko.Art</h1>
      <p>Please enter a new password for your account.</p>
      <div>
        <div style={{ marginBottom: "2em", marginTop: "1em" }}>
          <TextInput
            id={"password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            type={"password"}
            label={"Choose new password"}
          />
        </div>
        <TextInput
          id={"password-confirm"}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
          name={"password-confirm"}
          type={"password"}
          label={"Confirm password"}
        />
      </div>
      {errorMessage && <ErrorMessage messageBody={errorMessage} />}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "2em",
        }}
      >
        <PrimaryButton
          loading={isLoading}
          disabled={isLoading}
          onClick={updatePassword}
          buttonText={"Send"}
        />
      </div>
      <Link
        style={{ marginTop: "2em", textDecoration: "underline" }}
        to="/login"
      >
        Back to login
      </Link>
    </Container>
  )
}
