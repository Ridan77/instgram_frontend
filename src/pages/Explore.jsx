import { useEffect } from "react"
import { useSelector } from "react-redux"
import { NavLink, Navigate } from "react-router-dom"
import { loadStories } from "../store/actions/story.actions"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { updateUser } from "../store/actions/user.actions.js"
import { Gallery } from "../cmps/Gallery.jsx"

export function Explore() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  const user = useSelector((storeState) => storeState.userModule.user)

  useEffect(() => {
    loadStories({ txt: "", random: true })
  }, [])
  if (!stories) return <div>Wait</div>
  return (
    <section className="explore">
      {user && <Gallery stories={stories}/>}
    </section>
  )
}
