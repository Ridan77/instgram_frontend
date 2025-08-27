import { useEffect, useState } from "react";
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
import { StoryPreview } from "../cmps/StoryPreview";
import { Comments } from "../cmps/Comments";
import { LOADING_DONE, LOADING_START } from "../store/reducers/system.reducer";
import { svg } from "../cmps/Svgs";
import { userService } from "../services/user";

export function StoryDetails() {
  const { storyId } = useParams();
  const story = useSelector((storeState) => storeState.storyModule.story);
  console.log('story', story);
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  );
  // const user = useSelector((storeState) => storeState.userModule.user);
  const user = userService.getLoggedinUser()
  console.log('user', user);

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
      navigate("/story");
      showSuccessMsg("story removed");
    } catch (err) {
      showErrorMsg("Cannot remove story");
    }
  }

  // async function onLikeStory(storyId) {
  //   const isLiked = userLikes.includes(storyId);
  //   setUserLikes((prev) => isLiked ? prev.filter((id) => id !== storyId) : [...prev, storyId]
  //   );
  //   setStoryLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  //   try {
  //     const newLikes = await addLike(user._id, storyId);
  //   } catch (err) {
  //     setUserLikes((prev) =>
  //       isLiked ? [...prev, storyId] : prev.filter((id) => id !== storyId)
  //     )
  //     setStoryLikes((prev) => (isLiked ? prev + 1 : prev - 1));
  //     console.error("Failed to update like:", err);
  //   }
  // }
  // console.log('story', story);
  // console.log('user', user);
  if (!story) return <p>Later</p>;
  // if (!story || isLoading) return <p>Later</p>;
  return (
    <section className="story-details">
      <Modal onClose={onClose}>
        <div className="details-container">
          <img className="details-img" src={story.imgUrl} alt="" />
          <section className="details-info">
            <div className="header">
              <img className="mini-user-img" src={story.by.imgUrl} alt="" />
              <div className="sub-header">
                <div >
                 <div>
                   <span className="bold">{story.by.fullname}</span>
                  
                  </div>
                  <span className="full-grid location">{story.loc?.name}</span>
                </div>
                <span>{svg.more}</span>
              </div>
            </div>
            <img className="mini-user-img" src={story.by.imgUrl} alt="" />
            <span className="bold">{story.by.fullname} </span>
            <div className="scrollable text-row">
              {story.txt}
              <Comments story={story} />
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
