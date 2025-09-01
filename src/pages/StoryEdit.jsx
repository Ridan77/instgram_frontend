import { useEffect, useRef, useState } from "react";
import { storyService } from "../services/story/index.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { addStory } from "../store/actions/story.actions.js";
import { useNavigate, useParams } from "react-router-dom";
import { uploadService } from "../services/upload.service.js";
import { svg } from "../cmps/Svgs.jsx";
import { ImgUploader } from "../cmps/ImgUploader.jsx";
import { useSelector } from "react-redux";

export function StoryEdit() {
  const navigate = useNavigate();
  const [storyToEdit, setStoryToEdit] = useState({});
  const [createStage, setCreateStage] = useState(0);
  const user = useSelector((storeState) => storeState.userModule.user);

  const { storyId } = useParams();

  useEffect(() => {
    try {
      if (storyId) loadStory();
      else {
        // setStoryToEdit({...storyService.getEmptyStory(),imgUrl:"http://res.cloudinary.com/vanilla-test-images/image/upload/v1756199716/pzyvqsuoahwung4arrhm.jpg"})
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function loadStory() {
    try {
      const story = await storyService.getById(storyId);
      setStoryToEdit(story);
      setCreateStage(2);
    } catch (error) {
      console.log("Had issues in story edit", err);
      navigate("/story");
    }
  }

  function handleChange(ev) {
    setStoryToEdit({ ...storyToEdit, txt: ev.target.value });
  }

  function onClose() {
    navigate("/story");
  }
  function onUploaded(imgUrl) {
    setStoryToEdit({ ...storyToEdit, imgUrl });
    setCreateStage(1);
  }

  async function onSaveStory(ev) {
    ev.preventDefault();
    storyToEdit.txt = ev.target.txt.value;
    try {
      await addStory(storyToEdit);
      showSuccessMsg("Story Saved!");
      navigate("/story");
    } catch (error) {
      console.log("Had issues in story details", error);
      showErrorMsg("Had issues in story details");
    }
  }
  console.log(createStage);
  if (!storyToEdit) return <div>Wait</div>;
  return (
    <>
      <section onClick={onClose} className="modal-backdrop">
        <section onClick={(ev) => ev.stopPropagation()} className="story-edit">
          <h4>{storyToEdit._id ? "Edit" : "Create new post"}</h4>
          <hr />
          <form onSubmit={onSaveStory}>
            {createStage < 2 && (
              <div className="edit-page1">
                {createStage === 0 && svg.files}
                <div>
                  <ImgUploader onUploaded={onUploaded} />
                </div>
                {createStage === 1 && (
                  <button
                    onClick={() => setCreateStage(2)}
                    className="next-btn"
                    type="button">
                    Next
                  </button>
                )}
              </div>
            )}
            {createStage === 2 && (
              <div className="edit-page2">
                <img className="edit-img" src={storyToEdit.imgUrl} alt="" />
                <section className="create-details">
                  <div className="user-preview">
                    <img src={user.imgUrl} alt="" />
                    <span className="bold">{user.fullname}</span>
                  </div>
                  <input
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="Type something..."
                    value={storyToEdit.txt}
                    onChange={handleChange}
                  />
                </section>
                <button className="share-btn">Share</button>
              </div>
            )}

            <button type="button" className="close-btn" onClick={onClose}>
              {svg.close}
            </button>
          </form>
        </section>
      </section>
    </>
  );
}
