import React, { useContext, useState } from "react"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { Container } from "./styles/LogInPage.styled"
import TextInput from "../components/inputs/TextInput"
import PrimaryButton from "../components/atoms/PrimaryButton"
import TransparentButton from "../components/atoms/TransparentButton"
import { Link, useHistory } from "react-router-dom"
import authService from "../services/authService"
import { AuthContext } from "../context/authContext"
import ErrorMessage from "../components/atoms/ErrorMessage"

export default function LogInPage() {
  const history = useHistory()
  const authContext = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState(null)

  const login = async (e) => {
    e.preventDefault()
    const userCreds = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    const loginUser = await authService.login(userCreds)
    const { isAuthenticated, user, message } = loginUser
    if (isAuthenticated) {
      authContext.setUser(user)
      authContext.setIsAuthenticated(isAuthenticated)
      history.push("/discover/artworks")
    } else {
      setErrorMessage(message)
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={(e) => login(e)}>
        <Container>
          <h1>Log In</h1>
          <div>
            <TextInput
              id={"email"}
              name={"email"}
              label={"Email address"}
              type={"email"}
            />
          </div>
          <div>
            <TextInput
              id={"password"}
              name={"password"}
              label={"Password"}
              type={"password"}
            />
          </div>
          <div style={{ marginTop: "3em" }}>
            <PrimaryButton submit={true} buttonText={"LOG IN"} />
          </div>
          {errorMessage && <ErrorMessage messageBody={errorMessage} />}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "35%",
              marginTop: "3em",
            }}
          >
            <TransparentButton
              logo={"google"}
              buttonText={"Continue with Google"}
            />
            <TransparentButton
              logo={"facebook"}
              buttonText={"Continue with Facebook"}
            />
          </div>
          <p style={{ marginTop: "2em" }}>
            DON'T HAVE AN ACCOUNT?{" "}
            <Link to="/register" style={{ color: "#F2A16B" }}>
              REGISTER NOW
            </Link>
          </p>
        </Container>
      </form>
      <Footer />
    </div>
  )
}
