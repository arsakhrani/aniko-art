import React from "react"
import "./inputs.css"

export default function TextInput({
  label,
  type,
  id,
  name,
  value,
  onChange,
  defaultValue,
}) {
  return (
    <div className="text-input">
      <input
        defaultValue={defaultValue}
        onChange={onChange}
        id={id}
        name={name}
        type={type}
        value={value}
        required
      />
      <label>{label}</label>
    </div>
  )
}
