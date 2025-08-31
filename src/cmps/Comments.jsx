import { useNavigate } from "react-router";
import { svg } from "./Svgs";

export function Comments({ comments }) {
  const navigate = useNavigate();
  // console.log('comments', comments);
  return (
    <ul>
      {comments.map((comment, index) => {
        return (
          <li className="comment" key={index}>
            <img
              className="commenter-pic user-img"
              src={comment.by.imgUrl}
              alt=""
            />

            <span className="comment-content">
              <span
                onClick={() => navigate(`/user/${comment.by._id}`)}
                className="bold clickable">
                {comment.by.fullname}
              </span>
              <span className="comment-text">{comment.txt}</span>
            </span>
            {svg.notification}
            <div className="comment-action">
              <span className="gray">1 day</span>
              <span className="gray bold">2 likes</span>
              <span className="gray bold">Reply</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
