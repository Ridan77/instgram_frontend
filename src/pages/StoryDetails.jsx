import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadStory, addStoryMsg } from '../store/actions/story.actions'


export function StoryDetails() {

  const {storyId} = useParams()
  const story = useSelector(storeState => storeState.storyModule.story)

  useEffect(() => {
    loadStory(storyId)
  }, [storyId])

  async function onAddStoryMsg(storyId) {
    try {
        await addStoryMsg(storyId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Story msg added`)
    } catch (err) {
        showErrorMsg('Cannot add story msg')
    }        

}

  return (
    <section className="story-details">
      <Link to="/story">Back to list</Link>
      <h1>Story Details</h1>
      {story && <div>
        <h3>{story.vendor}</h3>
        <h4>{story.speed} KMH</h4>
        <pre> {JSON.stringify(story, null, 2)} </pre>
      </div>
      }
      <button onClick={() => { onAddStoryMsg(story._id) }}>Add story msg</button>

    </section>
  )
}