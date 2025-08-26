import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../cmps/Modal";


import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { loadStory, addStoryComment } from "../store/actions/story.actions";
import { StoryPreview } from "../cmps/StoryPreview";
import { Comments } from "../cmps/Comments";
import { LOADING_DONE, LOADING_START } from "../store/reducers/system.reducer";

export function StoryDetails() {
  const { storyId } = useParams();
  const story = useSelector((storeState) => storeState.storyModule.story);
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  );
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
      showSuccessMsg("story removed");
    } catch (err) {
      showErrorMsg("Cannot remove story");
    }
  }
  if (!story || isLoading) return <p>Later</p>;
  return (
    <section className="story-details">
      <Modal onClose={onClose}>
        <div className="details-container">
          <img className="details-img" src={story.imgUrl} alt="" />
          <section className="details-info">
            <StoryPreview story={story} showImage={false} />
            <Comments story={story} />
            <button onClick={onRemoveStory}>Delete</button>
          </section>
        </div>
      </Modal>
    </section>
  );
}
