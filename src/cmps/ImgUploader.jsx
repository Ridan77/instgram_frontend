import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { uploadService } from "../services/upload.service"

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(file) {
    console.log("file selected:", file)
    const ev = { target: { files: [file] } }

    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
  }
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      uploadImg(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  function getUploadLabel() {
    if (imgData.imgUrl) return "Upload Another?"
    return isUploading
      ? "Uploading...."
      : "Select from computer or drag an image here"
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && (
        <img
          src={imgData.imgUrl}
          style={{ maxWidth: "200px", float: "right" }}
          alt="preview"
        />
      )}

      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
        }}>
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop the image here..." : getUploadLabel()}</p>
      </div>
    </div>
  )
}

{
  /* <label htmlFor="imgUpload">{getUploadLabel()}</label> */
}
{
  /* <input
        className="file-input"
        type="file"
        onChange={uploadImg}
        accept="img/*"
        id="imgUpload"
      /> */
}
