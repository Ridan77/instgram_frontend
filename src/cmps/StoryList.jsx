import { StoryPreview } from "./StoryPreview";

export function StoryList({ stories, onAddComment }) {


  return (
    <section>
      <ul className="story-list">
        {stories.map((story) => (
          <li className="story-li " key={story._id}>
            <StoryPreview
              story={story}
              onAddComment={onAddComment}
              showImage={true}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
