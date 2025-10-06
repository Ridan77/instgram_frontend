import { Link } from "react-router-dom"
import { optimisticToggleLike } from "../store/actions/story.actions"
import { svg } from "./Svgs"
import { userService } from "../services/user"
import { toggleSave } from "../store/actions/user.actions"

export function Actions({ story, user, isDetails }) {
  return (
    <section className="actions1">
      <div className="actions">
        <span
          className="like-heart"
          onClick={() => optimisticToggleLike(story)}>
          {user.likedStoryIds?.includes(story._id)
            ? svg.heart
            : svg.notification}
        </span>
        <Link className="comment-preview" to={`/story/${story._id}`}>
          {svg.comment}
        </Link>
        <span onClick={() => console.log("click")}>{svg.direct}</span>
        <span
          className="save-story"
          onClick={() => toggleSave(story._id)}>
          {user.savedStories?.includes(story._id) ? svg.saved1 : svg.saved}
        </span>
      </div>
      {story.likedBy.length > 0 && (
        <div className="stats">
          <p>{story.likedBy.length} Likes</p>
          {isDetails && <p className="gray  time">3 Hours ago </p>}
        </div>
      )}
      {isDetails && <hr className="actions-border-bottom" />}
    </section>
  )
}
