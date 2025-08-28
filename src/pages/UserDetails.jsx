import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { loadUser, toggleFollow } from "../store/actions/user.actions";
import { loadStories } from "../store/actions/story.actions";
import { store } from "../store/store";
import { showSuccessMsg } from "../services/event-bus.service";
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from "../services/socket.service";
import { svg } from "../cmps/Svgs";

export function UserDetails() {
  const params = useParams();
  const user = useSelector((storeState) => storeState.userModule.watchedUser);
  const stories = useSelector((storeState) => storeState.storyModule.stories);
  const loggedinUser = userService.getLoggedinUser();

  useEffect(() => {
    loadUser(params.id);
    loadStories({ userId: params.id });

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id);
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate);

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate);
    };
  }, [params.id]);

  async function onToggleFollow(userToFollowId) {
    try {
      await toggleFollow(userToFollowId);
    } catch (err) {
      console.log("error", err);
    }
  }

  function onUserUpdate(user) {
    showSuccessMsg(
      `This user ${user.fullname} just got updated from socket, new score: ${user.score}`
    );
    store.dispatch({ type: "SET_WATCHED_USER", user });
  }
  if (!user) return <div>Wait</div>;
  return (
    <section className="user-details">
      <section className="user-header">
        <img src={user.imgUrl} alt="" />
        <div className="name-section">
          <span>{user.fullname}</span>
          <button
            onClick={() => onToggleFollow(user._id)}
            className="follow-btn">
            Follow
          </button>
          <span className="more">{svg.more}</span>
        </div>
        <div>
          <span className="bold">{stories?.length} </span>
          <span className="gray"> Posts </span>
          <span className="bold">{user.followers?.length}</span>
          <span className="gray">Followers</span>
          <span className="bold">{user.following?.length}</span>
          <span className="gray"> Following</span>
        </div>
        <span>{user.bio}</span>
      </section>
      <section className="gallery">
        {stories &&
          stories.map((story) => {
            return (
              <img
                key={story._id}
                className="gallery-img"
                src={story.imgUrl}
                alt=""
              />
            );
          })}
      </section>
    </section>
  );
}
