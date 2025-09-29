import { Link, useLocation } from "react-router-dom"
import { Carousel } from "./Carousel"

export function Gallery({ stories }) {
  const { pathname } = useLocation()

  return (
    <section
      className={pathname === "/explore" ? "gallery explore" : "gallery"}>
      {stories &&
        stories.map((story) => {
          return (
            <Link key={story._id} to={`/story/${story._id}`}>
              {Array.isArray(story.imgUrl) ? (
                <Carousel images={story.imgUrl} />
              ) : (
                <img
                  key={story._id}
                  className="gallery-img"
                  src={story.imgUrl}
                  alt=""
                />
              )}
            </Link>
          )
        })}
    </section>
  )
}
