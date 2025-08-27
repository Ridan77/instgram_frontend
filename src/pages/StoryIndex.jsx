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
import { updateUser } from "../store/actions/user.actions.js";

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

  async function onLikeStory(story) {
    const storyToSave = { ...story };
    const isLiked = story.likedBy.some((item) => item._id === user._id);
    const { _id, imgUrl, fullname } = user;
    storyToSave.likedBy = isLiked
      ? storyToSave.likedBy.filter((like) => like._id !== user._id)
      : [...storyToSave.likedBy, { _id, imgUrl, fullname }];
    updateStory(storyToSave);
    const userToSave = { ...user };
    const isUserLiked = user.likedStoryIds.some((item) => item === story._id);
    console.log("isUserLiked", isUserLiked);
    const test = [...user.likedStoryIds]
    console.log('test', test);
    userToSave.likedStoryIds = isUserLiked
      ? userToSave.likedStoryIds.filter((like) => like !== story._id)
      : [...user.likedStoryIds, story._id];
    console.log("userToSave.likedStoryId", userToSave.likedStoryIds);
    updateUser(userToSave);
  }

  console.log('user.likedStoryIds', user.likedStoryIds);
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
          <StoryList
            stories={stories}
            addComment={addComment}
            onLikeStory={onLikeStory}
          />
          <Outlet />
        </>
      )}
    </section>
  );
}
