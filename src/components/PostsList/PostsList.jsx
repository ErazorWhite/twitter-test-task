import { PostItem } from 'components/PostItem/PostItem';
import { Ul } from './PostsList.styled';
import { Li } from '../PostItem/PostItem.styled';
import SkeletonPost from 'components/SkeletonPost/SkeletonPost';

export const PostsList = ({ posts, isLoading }) => {
  if (isLoading) {
    return (
      <Ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <Li key={index}>
            <SkeletonPost key={index} />
          </Li>
        ))}
      </Ul>
    );
  }

  return (
    <Ul>
      {posts?.length > 0 ? (
        posts.map(post => <PostItem key={post.messageId} postDetails={post} />)
      ) : (
        <h3>We didn't find any posts.</h3>
      )}
    </Ul>
  );
};
