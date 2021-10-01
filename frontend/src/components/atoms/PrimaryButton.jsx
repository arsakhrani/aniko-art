import React from "react";

export default function PrimaryButton({ buttonText }) {
  return <button style={styles.button}>{buttonText}</button>;
}

const styles = {
  button: {
    border: 0,
    backgroundColor: "#F2A16B",
    borderRadius: 5,
    color: "white",
    fontFamily: "'Crimson Text', serif",
    paddingTop: "1.1em",
    paddingBottom: "1.1em",
    paddingLeft: "3em",
    paddingRight: "3em",
    cursor: "pointer",
  },
};
