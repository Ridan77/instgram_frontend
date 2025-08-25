export function Comments({ story }) {
  return (
    <ul>
      {story.comments.map((comment) => {
        return (
          <li className="comment" key={comment.id}>
            <p>
            {comment.by.imgUrl && <img className="commenter-pic" src={comment.by.imgUrl} alt="" />}
              <span className="bold">{comment.by.fullname}</span>
              <span className="comment-txt">{comment.txt}   </span>
            {/* <img className="icon" onClick={()=>console.log('click')} src="/src/assets/img/heart.png" alt="" /> */}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
