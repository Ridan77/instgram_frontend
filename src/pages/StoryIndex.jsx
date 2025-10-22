import {  useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet,  Navigate } from "react-router-dom"

import {
  loadStories,
  addStoryComment,
} from "../store/actions/story.actions"


import { StoryList } from "../cmps/StoryList.jsx"
import { Loader } from "../cmps/Loader.jsx"

export function StoryIndex() {
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  const user = useSelector((storeState) => storeState.userModule.user)
  const filterBy = useSelector((storeState) => storeState.storyModule.filterBy)


  useEffect(() => {
    loadStories({txt:filterBy})
  }, [filterBy])

  async function onAddComment(storyId, newComment) {
    addStoryComment(storyId, newComment)
  }
  if (!stories) return <Loader />
  return (
    <section className="story-index">
      {!user && <Navigate to="/auth/login" replace />}
      {user && (
        <>
          <StoryList stories={stories} onAddComment={onAddComment} />
          <Outlet />
        </>
      )}
    </section>
  )
}
