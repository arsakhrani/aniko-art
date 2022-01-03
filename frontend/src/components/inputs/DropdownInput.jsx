import React from "react"
import "./inputs.css"

export default function DropdownInput({
  label,
  options,
  name,
  onChange,
  id,
  value,
}) {
  return (
    <div className="dropdown-input">
      {label && <label htmlFor={id}>{label}</label>}
      <select value={value} onChange={onChange} name={name} id={id}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}
