import { Section } from 'components/Section/Section';
import { useEffect, useState } from 'react';
import { getNewsFeed } from 'api/mockAPI';
import { PostsList } from 'components/PostsList/PostsList';
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const asyncWrapper = async () => {
      try {
        const posts = await getNewsFeed();
        setPosts(posts);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, []);
  return (
    <Section title="Posts">
      <PostsList posts={posts} />
    </Section>
  );
};

export default Posts;
