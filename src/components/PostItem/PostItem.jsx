export const PostItem = ({
  postDetails: { author, authorId, avatar, image, message, createdAt },
}) => {
  return (
    <li>
      <p>Author: {author}</p>
      <img src={avatar} alt="" />
      <p>Message: {message}</p>
    </li>
  );
};
