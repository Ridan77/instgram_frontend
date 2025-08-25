import { Link } from "react-router-dom";
import { Comments } from "./Comments";
import { svg } from "./Svgs";
export function StoryPreview({ story }) {
  console.log("in preview");

  return (
    <article className="story-preview">
      <div className="user-preview">
        <img src={story.by.imgUrl} alt="" />
        <span className="bold">{story.by.fullname}</span>
      </div>
      <Link className="story-preview-img" to={`/story/${story._id}`}>
        <img src={story.imgUrl} alt="" />
      </Link>
      <div className="actions">
        <span onClick={()=>console.log('click')}>{svg.notification}</span>
        <span onClick={()=>console.log('click')} >{svg.comment}</span>
        <span onClick={()=>console.log('click')} >{svg.direct}</span>
      
      </div>
      <p>XXX Likes</p>
      <p>
        <span className="bold">{story.by.fullname} </span>
        {story.txt}
      </p>
      <p className="preview-comments">View all {story.commentsCount} comments</p>
      <p className="preview-comments">Add a comment...</p>
      {/* <Comments story={story} /> */}
      <hr />
    </article>
  );
}
