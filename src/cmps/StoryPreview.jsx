import { Link } from "react-router-dom";
import { Comments } from "./Comments";
import { svg } from "./Svgs";
import { useState } from "react";
import { AddComment } from "@mui/icons-material";
import { userService } from "../services/user";
export function StoryPreview({ story, addComment }) {
  const [comments, setComments] = useState([]);
  const user = userService.getLoggedinUser();
  const [likes, setLikes] = useState(user.likedStoryIds);

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

  async function onLikeStory(userId, storyId) {
    console.log('New Like from: userId to" storyId', userId, storyId);
    setLikes(likedStoryIds);
    const likedStoryIds = await userService.addLikedStory(userId, storyId);
    const heart = document.querySelector(".like-heart");
    heart.classList.remove("pop");
    void heart.offsetWidth; // force reflow
    heart.classList.add("pop");
  }

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
        <span
          className="like-heart"
          onClick={() => onLikeStory(user._id, story._id)}>
          {likes.includes(story._id) ? svg.heart : svg.notification}
        </span>

        <span onClick={() => console.log("click")}>{svg.comment}</span>
        <span onClick={() => console.log("click")}>{svg.direct}</span>
      </div>
      {story.likedBy.length && <p>{story.likedBy.length} Likes</p>}
      <p>
        <Link className="story-preview-img" to={`/user/${story.by._id}`}>
          <span className="bold">{story.by.fullname} </span>
        </Link>
        {story.txt}
      </p>
      {story.comments.length && (
        <Link to={`/story/${story._id}`}>
          <p className="preview-comments">
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
