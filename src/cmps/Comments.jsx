import { useNavigate } from "react-router";
import { svg } from "./Svgs";

export function Comments({ comments }) {
  const navigate = useNavigate();
  return (
    <ul>
      {comments.map((comment, index) => {
        return (
          <li className="comment" key={index}>
            {comment.by.imgUrl && (
              <img className="commenter-pic" src={comment.by.imgUrl} alt="" />
            )}
            <span className="comment-content">
              <span
                onClick={() => navigate(`/user/${comment.by._id}`)}
                className="bold clickable">
                {comment.by.fullname}
              </span>
              <span className="comment-text">{comment.txt}</span>
            </span>

            {svg.notification}
          </li>
        );
      })}
    </ul>
  );
}
