import { PostItem } from 'components/PostItem/PostItem';

export const PostsList = ({ posts }) => {
  return (
    <ul>
      {console.log('PostsList: ', posts)}
      {posts &&
        posts.map(post => <PostItem key={post.messageId} postDetails={post} />)}
    </ul>
  );
};
