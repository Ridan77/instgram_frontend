import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, NavLink, Navigate } from "react-router-dom"

import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryComment,
} from "../store/actions/story.actions"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { storyService } from "../services/story"
import { userService } from "../services/user"

import { StoryList } from "../cmps/StoryList.jsx"
import { StoryFilter } from "../cmps/storyFilter"
import { LoginSignup } from "./LoginSignup.jsx"
import { updateUser } from "../store/actions/user.actions.js"
import { Loader } from "../cmps/Loader.jsx"

export function StoryIndex() {
  const [filterBy, setFilterBy] = useState(storyService.getDefaultFilter())
  const stories = useSelector((storeState) => storeState.storyModule.stories)
  const user = useSelector((storeState) => storeState.userModule.user)


  useEffect(() => {
    loadStories(filterBy)
  }, [])

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
