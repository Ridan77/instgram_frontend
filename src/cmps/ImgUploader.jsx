import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { uploadService } from "../services/upload.service"
import { Carousel } from "./Carousel"

export function ImgUploader({ onUploaded = null }) {
  const [imgs, setImgs] = useState([])

  const [isUploading, setIsUploading] = useState(false)
  useEffect(() => {
    onUploaded && onUploaded(imgs)
  }, [imgs])

  async function uploadImg(file) {
    const ev = { target: { files: [file] } }
    setIsUploading(true)
    try {
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      setImgs((prev) => [secure_url, ...prev])
    } finally {
      setIsUploading(false)
    }
  }
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      acceptedFiles.forEach((file) => uploadImg(file))
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  })

  function getUploadLabel() {
    if (imgs.length > 0) return "Upload Another?"
    return isUploading
      ? "Uploading...."
      : "Select from computer or drag an image here"
  }
  return (
    <div className="upload-preview">
      <div className="upload-preview-grid">
        <Carousel images={imgs} />
      </div>

      <div onClick={ev=>ev.stopPropagation()}
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
