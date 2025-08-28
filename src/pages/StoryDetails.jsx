import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../cmps/Modal";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import {
  loadStory,
  addStoryComment,
  removeStory,
  toggleLikeStory,
} from "../store/actions/story.actions";
import { Comments } from "../cmps/Comments";
import { LOADING_DONE, LOADING_START } from "../store/reducers/system.reducer";
import { svg } from "../cmps/Svgs";
import { userService } from "../services/user";

export function StoryDetails() {
  const { storyId } = useParams();
  const story = useSelector((storeState) => storeState.storyModule.story);
  const comments = useSelector(
    (storeState) => storeState.storyModule.story?.comments || []
  );
  const [text, setText] = useState("");
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  );
  const user = userService.getLoggedinUser();
  const dialogRef = useRef(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }
  function closeDialog() {
    dialogRef.current?.close();
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getStory(storyId);
  }, []);

  async function getStory(storyId) {
    dispatch({ type: LOADING_START });
    try {
      await loadStory(storyId);
    } catch (err) {
      console.log("Cannot load story", err);
    } finally {
      dispatch({ type: LOADING_DONE });
    }
  }

  function onClose() {
    navigate("/story");
  }
  function onChange({ target }) {
    setText(target.value);
  }
  function onAddComment(ev) {
    ev.preventDefault();
    const value = ev.target.txt.value;
    console.log("submitted");
    addStoryComment(story._id, value);
    setText('')
  }

  async function onRemoveStory() {
    try {
      await removeStory(storyId);
      navigate("/story");
      showSuccessMsg("story removed");
    } catch (err) {
      showErrorMsg("Cannot remove story");
    }
  }
  if (!story) return <p>Later</p>;
  if (!story || isLoading || !comments) return <p>Later</p>;
  return (
    <section className="story-details">
      <Modal onClose={onClose}>
        <div className="details-container">
          <img className="details-img" src={story.imgUrl} alt="" />
          <section className="details-info">
            <div className="header">
              <img className="mini-user-img" src={story.by.imgUrl} alt="" />
              <div className="sub-header">
                <div>
                  <div>
                    <span className="bold">{story.by.fullname}</span>
                  </div>
                  <span className="full-grid location">{story.loc?.name}</span>
                </div>
                <span onClick={openDialog}>{svg.more}</span>
              </div>
            </div>
            <div className="scrollable text-row">
              <img
                className="mini-user-img mini-user"
                src={story.by.imgUrl}
                alt=""
              />
              <span className="bold scroll-name">{story.by.fullname} </span>
              <p>{story.txt}</p>
              <Comments comments={comments} />
            </div>
            <div className="actions">
              <span
                className="like-heart"
                onClick={() => toggleLikeStory(story)}>
                {story.likedBy?.some((like) => like._id === user._id)
                  ? svg.heart
                  : svg.notification}
              </span>

              <span onClick={() => console.log("click")}>{svg.comment}</span>
              <span onClick={() => console.log("click")}>{svg.direct}</span>
            </div>
            <div className="full-grid">
              {story.likedBy?.length > 0 && (
                <p className="likes-count">{story.likedBy.length} Likes</p>
              )}
              <p className="gray  time">3 Hours ago</p>
            </div>
            <form className="full-grid" onSubmit={onAddComment}>
              {svg.smiley}
              <input
                onChange={onChange}
                className="comment-input preview-comments"
                value={text}
                placeholder="Add a Comment..."
                type="text"
                name="txt"
                id=""
                autoComplete="off"
              />
              <button disabled={!text}>Post</button>
            </form>
            <dialog ref={dialogRef}>
              <div className="dialog-grid">
                <button onClick={() => navigate(`/story/edit/${storyId}`)}>
                  Edit
                </button>
                <button onClick={onRemoveStory}>Delete</button>
                <button onClick={closeDialog}>Cancel</button>
              </div>
            </dialog>
          </section>
        </div>
      </Modal>
    </section>
  );
}
