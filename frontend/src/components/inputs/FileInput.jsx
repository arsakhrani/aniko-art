import React from "react"

export default function FileInput({ id }) {
  return (
    <div className={"file-input"}>
      <p>Drag and drop file here or</p>
      <label className={"file-input"} htmlFor={id}>
        Browse
      </label>
      <input id={id} type="file" />
    </div>
  )
}
