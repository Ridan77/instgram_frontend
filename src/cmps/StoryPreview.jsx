import { Link } from 'react-router-dom'

export function StoryPreview({ story }) {
    return <article className="story-preview">
        <header>
            <Link to={`/story/${story._id}`}>{story.name}</Link>
        </header>

    </article>
}