import { Routes, Route, Navigate } from "react-router"

import { StoryIndex } from "./pages/StoryIndex.jsx"

import { StoryDetails } from "./pages/StoryDetails.jsx"
import { UserDetails } from "./pages/UserDetails"

import { SideBar } from "./cmps/SideBar.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { LoginSignup, Login, Signup } from "./pages/LoginSignup.jsx"
import { StoryEdit } from "./pages/StoryEdit.jsx"
import { Explore } from "./pages/Explore.jsx"
import { Chat } from "./cmps/Chat.jsx"
import { UserGrid } from "./pages/UserGrid.jsx"
import { UserSaved } from "./pages/UserSaved.jsx"
import { useSelector } from "react-redux"
import { StorySearch } from "./cmps/StorySearch.jsx"

export function RootCmp() {
  const isSearchOpen = useSelector(
    (storeState) => storeState.systemModule.isSearchOpen
  )

  return (
    <div className="main-container">
        <SideBar />
        <UserMsg />
        {isSearchOpen && <StorySearch />}
        <Routes>
          <Route path="/" element={<Navigate to="/story" />} />
          <Route path="/story" element={<StoryIndex />}>
            <Route path=":storyId" element={<StoryDetails />} />
            <Route path="edit/:storyId?" element={<StoryEdit />} />
          </Route>
          <Route path="user/:id" element={<UserDetails />}>
            <Route index element={<Navigate to="grid" replace />} />
            <Route path="grid" element={<UserGrid />} />
            <Route path="saved" element={<UserSaved />} />
          </Route>
          <Route path="explore" element={<Explore />} />
          <Route path="auth" element={<LoginSignup />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
        <Chat />
    </div>
  )
}
