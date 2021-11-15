import React from "react"
import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import { Container } from "./styles/LogInPage.styled"
import TextInput from "../components/inputs/TextInput"
import PrimaryButton from "../components/atoms/PrimaryButton"
import TransparentButton from "../components/atoms/TransparentButton"
import { Link, useHistory } from "react-router-dom"
import authService from "../services/authService"

export default function LogInPage() {
  const history = useHistory()

  const login = async (e) => {
    e.preventDefault()
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    const loginUser = await authService.login(user)
    if (loginUser) {
      history.push("/discover")
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={(e) => login(e)}>
        <Container>
          <h1>Log In</h1>
          <div>
            <TextInput name={"email"} label={"Email address"} type={"email"} />
          </div>
          <div>
            <TextInput name={"password"} label={"Password"} type={"password"} />
          </div>
          <div style={{ marginTop: "3em" }}>
            <PrimaryButton submit={true} buttonText={"LOG IN"} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "30%",
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
