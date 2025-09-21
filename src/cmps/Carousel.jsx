import { useState } from "react"
import { svg } from "./Svgs"

export function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imgCount = images.length

  function moveImg(ev, diff) {
    ev.stopPropagation()
    ev.preventDefault()
    setCurrentIndex((prev) => {
      const nextIndex = (prev + diff + imgCount) % imgCount
      return nextIndex
    })
  }

  return (
    <section className="carousel">
      Carousel
      <button
        className={
          currentIndex === 0
            ? "prev-img img-controler hide"
            : "prev-img img-controler"
        }
        onClick={(ev) => moveImg(ev, -1)}>
        {svg.arrowUp}
      </button>
      <button
        className={
          currentIndex === imgCount-1
            ? "next-img img-controler hide"
            : "next-img img-controler"
        }
        onClick={(ev) => moveImg(ev, 1)}>
        {svg.arrowUp}
      </button>
      <img src={images[currentIndex]} alt="" />
      <ul className="image-counter">
        {images.map((img, idx) => {
          return (
            <li
              key={idx}
              className={idx === currentIndex ? "current dot" : "dot"}></li>
          )
        })}
      </ul>
    </section>
  )
}
