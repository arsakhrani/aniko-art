import React from "react"
import { ReactComponent as Checkmark } from "../../assets/icons/check-solid.svg"

export default function CheckboxInput({ label, checked, name, onClick }) {
  return (
    <div onClick={onClick} className="checkbox-input">
      <input name={name} type="checkbox" checked={checked} />
      <div
        style={{
          border: checked ? "2px solid #F2A16B" : "2px solid #707070",
          backgroundColor: checked ? "#F2A16B" : "transparent",
        }}
        className="checkbox-box"
      >
        {checked && <Checkmark style={{ position: "absolute" }} />}
      </div>
      <label>{label}</label>
    </div>
  )
}
