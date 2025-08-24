import React from 'react'
import { Routes, Route } from 'react-router'

import { StoryIndex } from './pages/storyIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StoryDetails } from './pages/storyDetails'
import { UserDetails } from './pages/UserDetails'

import { SideBar } from './cmps/SideBar.jsx'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup, Login, Signup } from './pages/LoginSignup.jsx'


export function RootCmp() {
    return (
        <div className="main-container">
            <SideBar />
            <UserMsg />
                <Routes>
            
                    <Route path="story" element={<StoryIndex />} />
                    <Route path="story/:storyId" element={<StoryDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="auth" element={<LoginSignup />}>
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            {/* <AppFooter /> */}
        </div>
    )
}


