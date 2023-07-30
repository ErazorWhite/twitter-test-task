import { PostItem } from 'components/PostItem/PostItem';
import { Ul } from './PostsList.styled';

export const PostsList = ({ posts }) => {
  return (
    <Ul>
      {console.log('PostsList: ', posts)}
      {posts &&
        posts.map(post => <PostItem key={post.messageId} postDetails={post} />)}
    </Ul>
  );
};
