import {  NavLink } from "react-router-dom"
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { logout } from "../store/actions/user.actions"
import { svg } from "./Svgs"
import {
  closeDialog,
  openDialog,
  openSearch,
  closeSearch,
} from "../store/actions/system.actions"

export function SideBar() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const isDialogOpen = useSelector(
    (storeState) => storeState.systemModule.isDialogOpen
  )
  const isSearchOpen = useSelector(
    (storeState) => storeState.systemModule.isSearchOpen
  )
  const navigate = useNavigate()

  async function onLogout() {
    try {
      await logout()
      navigate("/auth")
      showSuccessMsg(`Bye now`)
    } catch (err) {
      showErrorMsg("Cannot logout")
    }
  }
  return (
    <nav className="side-nav">
      <NavLink className="disappear" to="">
        {/* <div className="instagram ">{svg.instagram}</div> */}
        <span className="logo disappear">InstaStam</span>
        <span className="camera">{svg.camera}</span>
      </NavLink>
      <NavLink to="story">
        <span>{svg.home}</span>
        <span className="nav-title">Home</span>
      </NavLink>
      <button
        className={`disappear search ${isSearchOpen ? "active" : ""}`}
        onClick={isSearchOpen ? closeSearch : openSearch}>
        <span>{svg.search}</span>
        <span className="nav-title ">Search</span>
      </button>
      <NavLink to="explore">
        <span>{svg.explore}</span>
        <span className="nav-title">Explore</span>
      </NavLink>
      <NavLink to="under">
        <span>{svg.reels}</span>
        <span className="nav-title">Reels</span>
      </NavLink>

      <button
        onClick={isDialogOpen ? closeDialog : openDialog}
        className={`msg-btn ${isDialogOpen ? "active" : ""}`}>
        <span>{svg.direct}</span>
        <span className="nav-title">Messages</span>
      </button>
      <NavLink className="disappear" to="under">
        <span>{svg.notification}</span>
        <span className="nav-title ">Notifications </span>
      </NavLink>
      <NavLink to="story/edit">
        <span>{svg.newPost}</span>
        <span className="nav-title">Create</span>
      </NavLink>
      {user && (
        <NavLink to={`/user/${user._id}`}>
          <span>
            {user ? (
              <img className="user-img" src={user.imgUrl} alt="" />
            ) : (
              <img src="src/assets/img/user1.png" alt="" />
            )}
          </span>
          <span className="nav-title">Profile</span>
        </NavLink>
      )}
      {user && (
        <button className="logout-btn disappear" onClick={onLogout}>
          logout
        </button>
      )}
      {/* {isSearchOpen && <StorySearch />} */}
    </nav>
  )
}
