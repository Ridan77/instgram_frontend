import { useOutletContext } from "react-router-dom"
import { Gallery } from "../cmps/Gallery"
import { useEffect, useState } from "react"

export function UserSaved() {
  const { user } = useOutletContext()
  const [userSavedStories, setUserSavedStories] = useState(null)

  async function loadSavedStories(user) {
    const filterBy = { userIdSavedStories: user._id }
    try {
      const savedStories = await storyService.query(filterBy)
      setUserSavedStories(savedStories)
    } catch (err) {
      console.log("Cannot load user stories", err)
      throw err
    }
  }

  useEffect(() => {
    loadSavedStories(user)
  }, [])

  if (!user.savedStories)
    return (
      <div className="no-saved-stories">
        <h4>No Saved Stories</h4>
      </div>
    )
  return <Gallery stories={userSavedStories} />
}
