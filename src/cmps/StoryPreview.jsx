import { Link } from "react-router-dom";
import { Comments } from "./Comments";
import { svg } from "./Svgs";
import { useState } from "react";
import { AddComment } from "@mui/icons-material";
import { userService } from "../services/user";
import { addLike } from "../store/actions/story.actions";
export function StoryPreview({ story, addComment, showImage }) {
  const [comments, setComments] = useState([]);
  const user = userService.getLoggedinUser();
  const [userLikes, setUserLikes] = useState(user.likedStoryIds || []);
  const [storyLikes, setStoryLikes] = useState(story.likedBy.length);

  function onAddComment(ev) {
    ev.preventDefault();
    const value = ev.target.txt.value;
    addComment(story._id, value);
    ev.target.txt.value = "";
    const by = {
      fullname: user.fullname,
      imgUrl: user.imgUrl,
    };
    const newComment = { by, txt: value };

    setComments([...comments, newComment]);
  }

  //optimistic
  async function onLikeStory(storyId) {
    const isLiked = userLikes.includes(storyId);
    setUserLikes((prev) =>
      isLiked ? prev.filter((id) => id !== storyId) : [...prev, storyId]
    );
    setStoryLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    const heart = document.querySelector(".like-heart");
    heart.classList.remove("pop");
    void heart.offsetWidth; // force reflow
    heart.classList.add("pop");
    try {
      const newLikes = await addLike(user._id, storyId);
    } catch (err) {
      setUserLikes((prev) =>
        isLiked ? [...prev, storyId] : prev.filter((id) => id !== storyId)
      )
      setStoryLikes((prev) => (isLiked ? prev + 1 : prev - 1));
      console.error("Failed to update like:", err);
    }
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
        <span className="like-heart" onClick={() => onLikeStory(story._id)}>
          {userLikes.includes(story._id) ? svg.heart : svg.notification}
        </span>
         <Link className="comment-preview" to={`/story/${story._id}`}>
        {svg.comment}
        </Link>

        <span onClick={() => console.log("click")}>{svg.direct}</span>
      </div>
      {storyLikes > 0 && <p>{storyLikes} Likes</p>}
      <p>
        <Link className="story-preview-img" to={`/user/${story.by._id}`}>
          <span className="bold">{story.by.fullname} </span>
        </Link>
        {story.txt}
      </p>
      {story.comments.length && (
        <Link to={`/story/${story._id}`}>
          <p className="preview-comments gray">
            View all {story.comments.length} comments
          </p>
        </Link>
      )}
      {comments && <Comments story={{ comments: comments }} />}
      {user && (
        <form onSubmit={onAddComment}>
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

      {/* <Comments story={story} />  */}
      <hr />
    </article>
  );
}
