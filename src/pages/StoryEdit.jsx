import { useEffect, useRef, useState } from "react";
import { storyService } from "../services/story/index.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { addStory } from "../store/actions/story.actions.js";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Field, Form, Formik } from "formik";
import { uploadService } from "../services/upload.service.js";
import { svg } from "../cmps/Svgs.jsx";


export function StoryEdit() {
  const navigate = useNavigate();
  const [storyToEdit, setStoryToEdit] = useState();

  const { storyId } = useParams();

  useEffect(() => {
    try {
      if (storyId) loadStory();
      else{
        // setStoryToEdit({...storyService.getEmptyStory(),imgUrl:"http://res.cloudinary.com/vanilla-test-images/image/upload/v1756199716/pzyvqsuoahwung4arrhm.jpg",
        setStoryToEdit(storyService.getEmptyStory())
        };
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function loadStory() {
    try {
      const story = await storyService.getById(storyId);
      setStoryToEdit(story);
    } catch (error) {
      console.log("Had issues in story edit", err);
      navigate("/story");
    }
  }

  function handleChange(ev) {
    console.log(ev.target.value);
    setStoryToEdit({...storyToEdit,txt: ev.target.value})
  }
  async function onFileChange(ev) {
    const url = await uploadService.uploadImg(ev);
    console.log(url.url);
    setStoryToEdit((prevStory) => ({ ...prevStory, imgUrl: url.url }));
  }

  function onClose() {
    navigate("/story");
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
    } finally {
      // () => resetForm();
    }
  }
  console.log("storyToEdit", storyToEdit);

  if (!storyToEdit) return <div>Wait</div>;
  return (
    <>
      <section onClick={onClose} className="modal-backdrop">
        <section onClick={(ev) => ev.stopPropagation()} className="story-edit">
          <h2>{storyToEdit._id ? "Edit" : "Create new post"} Toy</h2>

          <form onSubmit={onSaveStory}>
            {!storyToEdit.imgUrl && (
              <div className="edit-page1">
                <label className="file-input-label" htmlFor="file">
                  Select from computer
                </label>
                <input
                  type="file"
                  id="file"
                  className="file-input"
                  name="file"
                  accept="image/png image/jpeg image/jpg"
                  onChange={onFileChange}></input>
              </div>
            )}
            {storyToEdit.imgUrl && (
              <div className="edit-page2">
                <img className="edit-img" src={storyToEdit.imgUrl} alt="" />
                <textarea
                  id="txt"
                  name="txt"
                  rows="5"
                  cols="30"
                  placeholder="Type something..."
                  value={storyToEdit.txt}
                  onChange={handleChange}
                />
              </div>
            )}

            <button>{storyToEdit._id ? "Save" : "Add"}</button>
            <button type="button" className="close-btn" onClick={onClose}>
              {svg.close}
            </button>
          </form>
        </section>
      </section>
    </>
  );
}
