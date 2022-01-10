export const convertNestedObjectToArray = (nestedObj) => {
  return Object.keys(nestedObj).map((key) => nestedObj[key])
}

export const convertBytesToKB = (bytes) => {
  return Math.round(bytes / 1000)
}

export const addNewFiles = (newFiles, e, state) => {
  for (let file of newFiles) {
    if (file.size <= maxFileSize && !e.target.multiple) {
      return { file }
    }
    state[file.name] = file
  }
  return { ...state }
}

export const removeFile = (fileName, state) => {
  delete state[fileName]
  setBannerObject({ ...state })
  setBannerPicture(convertNestedObjectToArray({ ...state }))
}
