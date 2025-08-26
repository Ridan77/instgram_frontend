import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";
import { svg } from "./Svgs";

export function SideBar() {
  const user = useSelector((storeState) => storeState.userModule.user);
  const navigate = useNavigate();

  async function onLogout() {
    try {
      await logout();
      navigate("/");
      showSuccessMsg(`Bye now`);
    } catch (err) {
      showErrorMsg("Cannot logout");
    }
  }

  return (
      <nav className="side-nav" >
         <NavLink to=""><span>{svg.instagram}</span><span>     </span> </NavLink>
        <NavLink to="story"><span>{svg.home}</span><span className="nav-title">Home</span></NavLink>
        <NavLink to="search"><span>{svg.search}</span><span className="nav-title">Search</span></NavLink>
        <NavLink to="explore"><span>{svg.explore}</span><span className="nav-title" >Explore</span></NavLink>
        <NavLink to="reels"><span>{svg.reels}</span><span className="nav-title" >Reels</span></NavLink>
        <NavLink to="direct"><span>{svg.direct}</span><span className="nav-title" >Messages</span></NavLink>
        <NavLink to="review"><span>{svg.notification}</span><span className="nav-title">Notifications  </span></NavLink>
        <NavLink to="story/edit"><span>{svg.newPost}</span><span className="nav-title" >Create</span></NavLink>
        <NavLink to="user/:id"><span>{svg.profile}</span><span className="nav-title">Profile</span></NavLink>
 
		

        {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

        {!user && (
          <NavLink to="auth/login" className="login-link">
            Login
          </NavLink>
        )}
        {/* {user && (
          <div className="user-info">
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {user.fullname}
            </Link>
            <span className="score">{user.score?.toLocaleString()}</span>
            <button onClick={onLogout}>logout</button>
          </div>
        )}  */}
      </nav>
  );
}
