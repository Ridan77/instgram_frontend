import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../cmps/Modal"
import { useMediaQuery } from "react-responsive"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import {
  loadStory,
  addStoryComment,
  removeStory,
  toggleLike,
} from "../store/actions/story.actions"
import { Comments } from "../cmps/Comments"
import { LOADING_DONE, LOADING_START } from "../store/reducers/system.reducer"
import { svg } from "../cmps/Svgs"
import { userService } from "../services/user"
import { Loader } from "../cmps/Loader"
import { StoryHeader } from "../cmps/StoryHeader"

export function StoryDetails() {
  const { storyId } = useParams()
  const story = useSelector((storeState) => storeState.storyModule.story)
  const [text, setText] = useState("")
  const isLoading = useSelector(
    (storeState) => storeState.systemModule.isLoading
  )
  const user = useSelector((storeState) => storeState.userModule.user)
  const dialogRef = useRef(null)
  const isMobile = useMediaQuery({ query: "(max-width: 750px)" })

  function openDialog() {
    dialogRef.current?.showModal()
  }
  function closeDialog() {
    dialogRef.current?.close()
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getStory(storyId)
  }, [])

  async function getStory(storyId) {
    dispatch({ type: LOADING_START })
    try {
      await loadStory(storyId)
    } catch (err) {
      console.log("Cannot load story", err)
    } finally {
      dispatch({ type: LOADING_DONE })
    }
  }

  function onClose() {
    navigate("/story")
  }
  function onChange({ target }) {
    setText(target.value)
  }
  async function onAddComment(ev) {
    ev.preventDefault()
    const value = ev.target.txt.value
    console.log("submitted")
    await addStoryComment(story._id, value)
    setText("")
  }

  async function onRemoveStory() {
    try {
      await removeStory(storyId)
      navigate("/story")
      showSuccessMsg("story removed")
    } catch (err) {
      showErrorMsg("Cannot remove story")
    }
  }
  console.log("isMobile", isMobile)
  if (!story || isLoading || !story.comments) return <Loader />
  return (
    <section className="story-details">
      <Modal onClose={onClose}>
        <div className="details-container">
          <img className="details-img" src={story.imgUrl} alt="" />
          <section className="details-info">
            {!isMobile && <StoryHeader story={story} openDialog={openDialog} />}
            <div className="scrollable text-row">
              <img
                className="mini-user-img mini-user"
                src={story.by.imgUrl}
                alt=""
              />
              <div className="name-and-text">
                <span className="bold scroll-name">{story.by.fullname} </span>
                <span className="verified">{svg.verified}</span>
                <span>{story.txt}</span>
              </div>
              {isMobile && (
                <span className="more" onClick={openDialog}>
                  {svg.more}
                </span>
              )}
              <Comments comments={story.comments} />
            </div>
            <div className="actions">
              <span className="like-heart" onClick={() => toggleLike(story)}>
                {story.likedBy?.some((like) => like._id === user._id)
                  ? svg.heart
                  : svg.notification}
              </span>
              <span onClick={() => console.log("click")}>{svg.comment}</span>
              <span onClick={() => console.log("click")}>{svg.direct}</span>
            </div>
            <div className="stats">
              {story.likedBy?.length > 0 && (
                <p className="likes-count">{story.likedBy.length} Likes</p>
              )}
              <p className="gray  time">3 Hours ago {isMobile}</p>
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
  )
}
