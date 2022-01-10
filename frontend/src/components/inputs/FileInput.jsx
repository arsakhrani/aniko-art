import React from "react"

export default function FileInput({ id, audio, onChange, multiple, dark }) {
  return (
    <div className={dark ? "file-input dark" : "file-input"}>
      <p>Drag and drop file here or</p>
      <label className={"file-input"} htmlFor={id}>
        Browse
      </label>
      <input
        multiple={multiple}
        accept={audio ? ".mp3" : "image/png, .pdf, image/jpeg"}
        onChange={onChange}
        id={id}
        type="file"
      />
    </div>
  )
}
