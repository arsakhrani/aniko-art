import React from "react"

export default function FileInput({ id, onChange, multiple }) {
  return (
    <div className={"file-input"}>
      <p>Drag and drop file here or</p>
      <label className={"file-input"} htmlFor={id}>
        Browse
      </label>
      <input
        multiple={multiple}
        accept="image/png, .pdf, image/jpeg"
        onChange={onChange}
        id={id}
        type="file"
      />
    </div>
  )
}
