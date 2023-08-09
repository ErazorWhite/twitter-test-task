import {
  UserName,
  AvatarBox,
  Message,
  MessageSplitter,
  Img,
  MessageBox,
  MessageTitle,
  MessageImgBox,
  Li,
} from './PostItem.styled';
import { PostDate } from 'components/PostDate/PostDate';
import { Link, useLocation } from 'react-router-dom';
import defaultPhoto from 'images/img_not_found.jpg';

export const PostItem = ({
  postDetails: { author, avatar, image, message, createdAt },
}) => {
  const location = useLocation();
  const accoutAvatar = avatar ? avatar : defaultPhoto;
  const postImage = image ? image : defaultPhoto;

  return (
    <Li>
      <MessageSplitter>
        <AvatarBox>
          <Img src={accoutAvatar} alt="profile" width={'40'} height={'40'} />
        </AvatarBox>
        <div>
          <MessageTitle>
            <Link
              to={`/profile/${author}`}
              state={{ from: location }}
            >
              <UserName>{author}</UserName>
            </Link>
            <span>·</span>
            <PostDate createdAt={createdAt} />
          </MessageTitle>
          <MessageBox>
            <Message>{message}</Message>
            <MessageImgBox>
              <Img
                src={postImage}
                alt="post visualization"
                width={'480'}
                height={'360'}
              />
            </MessageImgBox>
          </MessageBox>
        </div>
      </MessageSplitter>
    </Li>
  );
};
