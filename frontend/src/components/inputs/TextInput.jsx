import React from "react"
import "./inputs.css"

export default function TextInput({ label, type, id, name }) {
  return (
    <div className="text-input">
      <input id={id} name={name} type={type} required />
      <label>{label}</label>
    </div>
  )
}
