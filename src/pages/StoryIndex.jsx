import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, NavLink, Navigate } from "react-router-dom";

import {
  loadStories,
  addStory,
  updateStory,
  removeStory,
  addStoryComment,
} from "../store/actions/story.actions";

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { storyService } from "../services/story";
import { userService } from "../services/user";

import { StoryList } from "../cmps/StoryList.jsx";
import { StoryFilter } from "../cmps/storyFilter";
import { LoginSignup } from "./LoginSignup.jsx";

export function StoryIndex() {
  const [filterBy, setFilterBy] = useState(storyService.getDefaultFilter());
  const stories = useSelector((storeState) => storeState.storyModule.stories);
  const user = useSelector((storeState) => storeState.userModule.user);

  useEffect(() => {
    loadStories();
  }, [user]);

  async function addComment(storyId, newComment) {
    try {
      await addStoryComment(storyId, newComment);
      showSuccessMsg(`Story comment added`);
    } catch (err) {
      showErrorMsg("Cannot add story comment");
    }
  }

  async function onAddStory() {
    const story = storyService.getEmptystory();
    story.vendor = prompt("Vendor?", "Some Vendor");
    try {
      const savedstory = await addStory(story);
      showSuccessMsg(`story added (id: ${savedstory._id})`);
    } catch (err) {
      showErrorMsg("Cannot add story");
    }
  }

  async function onUpdateStory(story) {
    const speed = +prompt("New speed?", story.speed) || 0;
    if (speed === 0 || speed === story.speed) return;

    const storyToSave = { ...story, speed };
    try {
      const savedstory = await updateStory(storyToSave);
      showSuccessMsg(`story updated, new speed: ${savedstory.speed}`);
    } catch (err) {
      showErrorMsg("Cannot update story");
    }
  }

  async function onLikeStory(userId, storyId) {
    console.log('New Like from: userId to" storyId', userId, storyId);
    const likedStoryIds = await userService.addLikedStory(userId, storyId);
  }
  return (
    <section className="story-index">
    {!user && <Navigate to="/auth/login" replace />}
        {/* // <NavLink to="auth/login" className="login-link">
        //   Please login....
        // </NavLink> */}
      
      {/* <header>
        {userService.getLoggedinUser() && (
          <button onClick={onAddStory}>Add a story</button>
        )}
      </header> */}
      {/* <StoryFilter filterBy={filterBy} setFilterBy={setFilterBy} /> */}
      {user && (
        <>
          <StoryList stories={stories} addComment={addComment} />
          <Outlet />
        </>
      )}
    </section>
  );
}
