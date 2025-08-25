import { Link } from "react-router-dom";
import {Comments} from './Comments'
export function StoryPreview({ story }) {
  console.log("in preview");

  return (
    <article className="story-preview">
      <div className="user-preview">
        <img src={story.by.imgUrl} alt="" />
        <span>{story.by.fullname}</span>
      </div>
      <Link className="story-preview-img" to={`/story/${story._id}`}>
        <img src={story.imgUrl} alt="" />
      </Link>
      <span>{story.txt}</span>
      <div className="actions">
        <img
          onClick={() => {
            console.log("click");
          }}
          src="/src/assets/img/heart.png"
          alt=""
        />
        <img
          onClick={() => {
            console.log("click");
          }}
          src="/src/assets/img/chat.png"
          alt=""
        />
        <img
          onClick={() => {
            console.log("click");
          }}
          src="/src/assets/img/send.png"
          alt=""
        />
      </div>
      <Comments story={story}/>
    </article>
  );
}
