import discoverService from "./discoverService"

export const convertNestedObjectToArray = (nestedObj) => {
  return Object.keys(nestedObj).map((key) => nestedObj[key])
}

export const convertBytesToKB = (bytes) => {
  return Math.round(bytes / 1000)
}

export const addNewFiles = (newFiles, e, state) => {
  for (let file of newFiles) {
    if (!e.target.multiple) {
      return { file }
    }
    state[file.name] = file
  }
  return { ...state }
}

export const shortenString = (string) => {
  if (string.length > 30) {
    const shortenedString = string.slice(0, 29)
    return shortenedString.concat("...")
  } else {
    return string
  }
}

export const uploadImage = async (image) => {
  if (image.length === 1) {
    const upload = await discoverService.uploadImages(image)
    return upload[0]
  } else {
    return ""
  }
}

export const uploadAudio = async (audioFile) => {
  if (audioFile.length === 1) {
    const upload = await discoverService.uploadAudio(audioFile)
    return upload
  } else {
    return ""
  }
}

export const uploadCv = async (cvFile) => {
  if (cvFile.length === 1) {
    const upload = await discoverService.uploadCv(cvFile)
    return upload
  } else {
    return ""
  }
}

export const preloadFile = (
  e,
  objectState,
  arraySetter,
  objectSetter,
  errorSetter,
  maxFileSize
) => {
  errorSetter("")
  const { files: newFiles } = e.target
  if (newFiles.length) {
    if (newFiles[0].size > maxFileSize) {
      errorSetter("Please make sure the image file size is under 2MB.")
    } else {
      const updatedImages = addNewFiles(newFiles, e, objectState)
      objectSetter(updatedImages)
      arraySetter(convertNestedObjectToArray(updatedImages))
    }
  }
}

export const removeFile = (
  fileName,
  objectState,
  arraySetter,
  objectSetter
) => {
  delete objectState[fileName]
  objectSetter({ ...objectState })
  arraySetter(convertNestedObjectToArray({ ...objectState }))
}
