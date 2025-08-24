import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { logout } from "../store/actions/user.actions";

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
    <header className="side-nav">
      <nav>
        <NavLink to="/" className="logo">
          <img className="logo" src="/src/assets/img/instagram-logo.png" alt="" />{" "}
        </NavLink>
        <NavLink to="story">StoriesIndex</NavLink>
        <NavLink to="search">Search</NavLink>
        <NavLink to="explore">Explore</NavLink>
        <NavLink to="reels">Reels</NavLink>
        <NavLink to="direct">Direct</NavLink>
        <NavLink to="review">Notifications</NavLink>
        <NavLink to="story/add">Add Story</NavLink>
        <NavLink to="user/:id">My Page</NavLink>
		

        {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

        {!user && (
          <NavLink to="auth/login" className="login-link">
            Login
          </NavLink>
        )}
        {user && (
          <div className="user-info">
            <Link to={`user/${user._id}`}>
              {user.imgUrl && <img src={user.imgUrl} />}
              {user.fullname}
            </Link>
            <span className="score">{user.score?.toLocaleString()}</span>
            <button onClick={onLogout}>logout</button>
          </div>
        )}
      </nav>
    </header>
  );
}
