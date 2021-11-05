import React from "react"
import { ReactComponent as Google } from "../../assets/icons/google-logo.svg"
import { ReactComponent as Facebook } from "../../assets/icons/social-facebook-logo.svg"

export default function TransparentButton({ buttonText, logo }) {
  return (
    <button style={styles.button}>
      {logo === "google" && (
        <Google
          width={16}
          style={{ paddingRight: 8, position: "relative", bottom: 2 }}
        />
      )}
      {logo === "facebook" && (
        <Facebook
          width={16}
          fill={"#1b76f2"}
          style={{ paddingRight: 5, position: "relative", top: 1 }}
        />
      )}
      {buttonText}
    </button>
  )
}

const styles = {
  button: {
    border: "1px solid #707070",
    backgroundColor: "transparent",
    borderRadius: 5,
    color: "#707070",
    paddingTop: "1em",
    paddingBottom: "1em",
    display: "flex",
    justifyContent: "center",
    width: "49%",
    cursor: "pointer",
  },
}
