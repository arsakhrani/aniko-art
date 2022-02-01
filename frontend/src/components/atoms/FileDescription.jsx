import React from "react"
import { convertBytesToKB, shortenString } from "../../services/uploadFunctions"
import {
  FileDetails,
  Para,
} from "../sections/manage-profile/styles/ManageProfile.styled"
import { ReactComponent as GreenDot } from "../../assets/icons/green-dot.svg"
import { ReactComponent as Close } from "../../assets/icons/close.svg"

export default function FileDescription({ object, removeFile }) {
  return Object.keys(object).map((property) => {
    let file = object[property]
    return (
      <FileDetails key={property}>
        <GreenDot />
        <Para>{shortenString(file.name)}</Para>
        <Para>{convertBytesToKB(file.size)} KB</Para>
        <Close
          width={10}
          stroke={"black"}
          style={{ cursor: "pointer" }}
          onClick={() => removeFile(property, object)}
        />
      </FileDetails>
    )
  })
}
