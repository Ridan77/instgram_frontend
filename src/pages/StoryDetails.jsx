import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../cmps/Modal";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import {
  loadStory,
  addStoryComment,
  removeStory,
} from "../store/actions/story.actions";
import { StoryPreview } from "../cmps/StoryPreview";
import { Comments } from "../cmps/Comments";
import { LOADING_DONE, LOADING_START } from "../store/reducers/system.reducer";
import { svg } from "../cmps/Svgs";

export function StoryDetails() {
  const { storyId } = useParams();
  const story = useSelector((storeState) => storeState.storyModule.story);
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  );
  const user = useSelector((storeState) => storeState.userModule.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getStory(storyId);
  }, [storyId]);

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

  async function onAddStoryMsg(storyId) {
    try {
      await addStoryMsg(storyId, "bla bla " + parseInt(Math.random() * 10));
      showSuccessMsg(`Story msg added`);
    } catch (err) {
      showErrorMsg("Cannot add story msg");
    }
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
  console.log(user);

  if (!story || isLoading) return <p>Later</p>;
  return (
    <section className="story-details">
      <Modal onClose={onClose}>
        <div className="details-container">
          <img className="details-img" src={story.imgUrl} alt="" />
          <section className="details-info">
            <img className="mini-user-img" src={story.by.imgUrl} alt="" />
            <div>
              <span className="bold">{story.by.fullname}</span>
              <span>{svg.more}</span>
            </div>
            <div className="scrollable" >
              <img className="mini-user-img" src={story.by.imgUrl} alt="" />
              <p>
                <span className="bold">{story.by.fullname} </span>
                {story.txt}
              </p>
            </div>
            <div className="actions">
              <span
                className="like-heart"
                onClick={() => onLikeStory(user._id, story._id)}>
                {story.likedBy?.some((like) => like._id === user._id)
                  ? svg.heart
                  : svg.notification}
              </span>

              <span onClick={() => console.log("click")}>{svg.comment}</span>
              <span onClick={() => console.log("click")}>{svg.direct}</span>
            </div>
            {story.likedBy?.length > 0 && <p>{story.likedBy.length} Likes</p>}

            {/* <StoryPreview story={story} showImage={false} /> */}
            {/* <Comments story={story} /> */}
            <button onClick={() => navigate(`/story/edit/${storyId}`)}>
              Edit
            </button>
            <button onClick={onRemoveStory}>Delete</button>
          </section>
        </div>
      </Modal>
    </section>
  );
}
