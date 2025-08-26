import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "../cmps/Modal";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { loadStory, addStoryComment } from "../store/actions/story.actions";
import { StoryPreview } from "../cmps/StoryPreview";
import { Comments } from "../cmps/Comments";

export function StoryDetails() {
  const { storyId } = useParams();
  const story = useSelector((storeState) => storeState.storyModule.story);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadStory(storyId);
  }, [storyId]);

  function onClose() {
    setIsOpen(!isOpen);
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
if (!story) return <p>Later</p>
  return (
    <section className="story-details">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="details-container">
          <img className="details-img" src={story.imgUrl} alt="" />
          <section className="details-info">
          <StoryPreview story={story} showImage={false} />
          <Comments story={story}/>
          </section>
        </div>
      </Modal>
    </section>
  );
}
