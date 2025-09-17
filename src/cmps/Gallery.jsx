import { Link,useLocation } from "react-router-dom"


export function Gallery({ stories }) {
  const {pathname} = useLocation()
  
  return (
    <section className={pathname==='/explore' ? 'gallery explore' : 'gallery'} >
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
