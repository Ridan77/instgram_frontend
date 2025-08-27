import { useNavigate } from "react-router";
import { svg } from "./Svgs";

export function Comments({ story }) {
  const navigate = useNavigate();
  return (
    <ul>
      {story.comments.map((comment) => {
        return (
          <li className="comment" key={comment.id}>
            {comment.by.imgUrl && (
              <img className="commenter-pic" src={comment.by.imgUrl} alt="" />
            )}
            <span
              onClick={() => navigate(`/user/${comment.by._id}`)}
              className="bold clickable">
              {comment.by.fullname}
               {comment.txt}
            </span>

            {svg.notification}

            {/* <img className="icon" onClick={()=>console.log('click')} src="/src/assets/img/heart.png" alt="" /> */}
          </li>
        );
      })}
    </ul>
  );
}
