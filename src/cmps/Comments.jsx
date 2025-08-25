export function Comments({ story }) {
  console.log(story.comments);
  return (
    <ul>
      {story.comments.map((comment) => {
        return (
          <li className="comment" key={comment.id}>
            <p>
            <img className="commenter-pic" src={comment.by.imgUrl} alt="" />
              <span className="bold">{comment.by.fullname}    </span>
              <span>{comment.txt}   </span>
            {/* <img className="icon" onClick={()=>console.log('click')} src="/src/assets/img/heart.png" alt="" /> */}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
