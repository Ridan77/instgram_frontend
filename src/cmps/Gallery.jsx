import { Link } from "react-router-dom"

export function Gallery({ stories }) {
  return (
    <section className="gallery">
      {stories &&
        stories.map((story) => {
          return (
            <Link key={story._id} to={`/story/${story._id}`}>
              <img
                key={story._id}
                className="gallery-img"
                src={story.imgUrl}
                alt=""
              />
            </Link>
          )
        })}
    </section>
  )
}
