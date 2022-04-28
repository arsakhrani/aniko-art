import React, { useState } from "react"
import PrimaryButton from "../../atoms/PrimaryButton"
import TextInput from "../../inputs/TextInput"
import { Container } from "./styles/AdminLogin.styles"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [failedAttempt, setFailedAttempt] = useState(false)

  const validate = () => {
    if (password === process.env.REACT_APP_ADMIN_KEY) {
      window.localStorage.setItem("admin_key", password)
      history.go(0)
    } else {
      setFailedAttempt(true)
    }
  }

  return (
    <Container>
      <div style={{ marginBottom: "1em" }}>
        <TextInput
          label={"Password"}
          type={"password"}
          id={"admin-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {failedAttempt && (
        <p style={{ marginBottom: "1em" }}>Wrong password. Please try again.</p>
      )}
      <PrimaryButton onClick={validate} buttonText={"Submit"} />
    </Container>
  )
}
