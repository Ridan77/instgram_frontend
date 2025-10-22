import { Link } from "react-router-dom";
import { Comments } from "./Comments";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ReadMore } from "./ReadMore"
import { Carousel } from "./Carousel"
import { Actions } from "./Actions"
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
        <Link to={`/user/${story.by._id}`} className="bold">{story.by.fullname}</Link>
        <span className="gray">• 3d</span>
      </div>
      {showImage && (
        <Link className="story-preview-img" to={`/story/${story._id}`}>
          {Array.isArray(story.imgUrl) ? <Carousel images={story.imgUrl}/> :<img src={story.imgUrl} alt="" />}
        </Link>
      )}
      <Actions story={story} user={user} isDetails={false}/>
      <p>
        <Link className="story-preview-img" to={`/user/${story.by._id}`}>
          <span className="bold">{story.by.fullname} </span>
        </Link>
        <ReadMore text={story.txt}/>
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
