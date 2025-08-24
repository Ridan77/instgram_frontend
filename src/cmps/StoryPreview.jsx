import { json, Link } from "react-router-dom";

export function StoryPreview({ story }) {
  console.log("in preview");

  return (
    <article className="story-preview">
      <header>
        <span>{story.txt}</span>
        <img src={story.imgUrl} alt="" />
        <Link to={`/story/${story._id}`}>{story.name}</Link>
      </header>
    </article>
  );
}
