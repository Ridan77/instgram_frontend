import { Link } from "react-router-dom";
import { Comments } from "./Comments";
import { svg } from "./Svgs";
import { useState } from "react";
import { toggleLikeStory } from "../store/actions/story.actions";
import { useSelector } from "react-redux";
export function StoryPreview({ story, onAddComment, showImage }) {
  const [comments, setComments] = useState([]);
  const user = useSelector((storeState) => storeState.userModule.user);

  function onSubmitComment(ev) {
    ev.preventDefault();
    const value = ev.target.txt.value;
    onAddComment(story._id, value);
    ev.target.txt.value = "";
    const by = {
      fullname: user.fullname,
      imgUrl: user.imgUrl,
    };
    const newComment = { by, txt: value };
    setComments([...comments, newComment]);
  }
  return (
    <article className="story-preview">
      <div className="user-preview">
        <img src={story.by.imgUrl} alt="" />
        <span className="bold">{story.by.fullname}</span>
        <span className="gray">• 3d</span>
      </div>
      {showImage && (
        <Link className="story-preview-img" to={`/story/${story._id}`}>
          <img src={story.imgUrl} alt="" />
        </Link>
      )}
      <div className="actions">
        <span className="like-heart" onClick={() => toggleLikeStory(story)}>
          {user.likedStoryIds?.includes(story._id)
            ? svg.heart
            : svg.notification}
        </span>
        <Link className="comment-preview" to={`/story/${story._id}`}>
          {svg.comment}
        </Link>

        <span onClick={() => console.log("click")}>{svg.direct}</span>
      </div>
      {story.likedBy.length > 0 && <p>{story.likedBy.length} Likes</p>}
      <p>
        <Link className="story-preview-img" to={`/user/${story.by._id}`}>
          <span className="bold">{story.by.fullname} </span>
        </Link>
        {story.txt}
      </p>
      {story.comments.length>0 && (
        <Link to={`/story/${story._id}`}>
          <p className="preview-comments gray">
            View all {story.comments.length} comments
          </p>
        </Link>
      )}
      {comments.length > 0  && <Comments comments={comments} />}
      {user && (
        <form onSubmit={onSubmitComment}>
          <input
            className="comment-input preview-comments"
            placeholder="Add a Comment..."
            type="text"
            name="txt"
            id=""
            autoComplete="off"
          />
        </form>
      )}
      <hr className="stories-seperator"/>
    </article>
  );
}
