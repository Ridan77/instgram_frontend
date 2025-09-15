import { svg } from "../cmps/Svgs"

export function StoryHeader({ story, openDialog }) {
  return (
    <section className="story-header">
    
      <img className="mini-user-img" src={story.by.imgUrl} alt="" />
      <div className="sub-header">
        <div>
          <div>
            <span className="bold">{story.by.fullname}</span>
          </div>
          <span className="full-grid location">{story.loc?.name}</span>
        </div>
      </div>
      <span className="more" onClick={openDialog}>
        {svg.more}
      </span>
    
    </section>
  )
}
