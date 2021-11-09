import React from "react"
import { ReactComponent as Checkmark } from "../../assets/icons/check-solid.svg"

export default function CheckboxInput({ label, checked }) {
  return (
    <div className="checkbox-input">
      <input type="checkbox" />
      <div
        style={{
          border: checked ? "1px solid #F2A16B" : "1px solid black",
          backgroundColor: checked ? "#F2A16B" : "transparent",
          top: checked ? 5.85 : 0,
        }}
        className="checkbox-box"
      >
        {checked && <Checkmark />}
      </div>
      <label>{label}</label>
    </div>
  )
}
