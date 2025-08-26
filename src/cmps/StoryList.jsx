import { userService } from "../services/user";
import { StoryPreview } from "./StoryPreview";

export function StoryList({ stories, addComment }) {
  function shouldShowActionBtns(story) {
    const user = userService.getLoggedinUser();

    if (!user) return false;
    if (user.isAdmin) return true;
    return story.owner?._id === user._id;
  }

  return (
    <section>
      <ul className="story-list">
        {stories.map((story) => (
          <li className="story-li " key={story._id}>
            <StoryPreview story={story} addComment={addComment} showImage={true} />
            {/* { <div className="actions"> */}
            {/* <button onClick={() => onUpdateStory(story)}>Edit</button> */}
            {/* <button onClick={() => onRemoveStory(story._id)}>x</button> */}
            {/* </div>} */}
          </li>
        ))}
      </ul>
    </section>
  );
}
