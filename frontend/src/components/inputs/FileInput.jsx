import React from "react"

export default function FileInput({ id, audio, cv, onChange, multiple, dark }) {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )

  return (
    <div className={dark ? "file-input dark" : "file-input"}>
      {vw > 500 && <p>Drag and drop file here or</p>}
      <label className={"file-input"} htmlFor={id}>
        Browse
      </label>
      <input
        multiple={multiple}
        accept={audio ? ".mp3" : cv ? ".pdf" : "image/png, .pdf, image/jpeg"}
        onChange={onChange}
        id={id}
        type="file"
      />
    </div>
  )
}
