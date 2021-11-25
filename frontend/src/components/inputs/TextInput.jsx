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
  step,
  max,
  minLength,
  maxLength,
  min,
}) {
  return (
    <div className="text-input">
      <input
        minLength={minLength}
        maxLength={maxLength}
        min={min}
        max={max}
        step={step}
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
