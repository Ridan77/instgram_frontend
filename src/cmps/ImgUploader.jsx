import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { uploadService } from "../services/upload.service"

export function ImgUploader({ onUploaded = null }) {
  // const [imgData, setImgData] = useState({imgUrl: null,height: 500,width: 500,})
  const [imgs, setImgs] = useState([]) // Store multiple images

  const [isUploading, setIsUploading] = useState(false)
  useEffect(() => {
    onUploaded && onUploaded(imgs)
  }, [imgs])

  async function uploadImg(file) {
    console.log("file selected:", file)
    const ev = { target: { files: [file] } }
    setIsUploading(true)
    try {
      const { secure_url, height, width } = await uploadService.uploadImg(ev)
      setImgs((prev) => [...prev, secure_url])
      onUploaded && onUploaded(imgs)
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
  console.log("imgs from upload", imgs)
  return (
    <div className="upload-preview">
      <div className="upload-previre-grid">
        {imgs[0]?.imgUrl &&
          imgs.map((img, idx) => (
            <img key={idx} src={img.imgUrl} alt={`preview-${idx}`} />
          ))}
      </div>

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
