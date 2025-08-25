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
          <img src="/src/assets/img/instagram.png" alt="" />
        </NavLink>
        <NavLink to="story"><img src="/src/assets/img/home.png" alt="" /></NavLink>
        <NavLink to="search"><img src="/src/assets/img/search.png" alt="" /></NavLink>
        <NavLink to="explore"><img src="/src/assets/img/home.png" alt="" /></NavLink>
        <NavLink to="reels"><img src="/src/assets/img/video.png" alt="" /></NavLink>
        <NavLink to="direct"><img src="/src/assets/img/send.png" alt="" /></NavLink>
        <NavLink to="review"><img src="/src/assets/img/heart.png" alt="" /></NavLink>
        <NavLink to="story/add"><img src="/src/assets/img/add.png" alt="" /></NavLink>
        <NavLink to="user/:id"><img src="/src/assets/img/user.png" alt="" /></NavLink>
		

        {/* {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

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
        )} */}
      </nav>
    </header>
  );
}
