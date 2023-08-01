import { Section } from 'components/Section/Section';
import { useEffect, useState } from 'react';
import { getNewsFeed } from 'api/mockAPI';
import { PostsList } from 'components/PostsList/PostsList';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

    const asyncWrapper = async () => {
      try {
        const params = {};

        // Фильтрация
        for (const [key, value] of searchParams.entries()) {
          if (value) {
            params[key] = value;
          }
        }

        const posts = await getNewsFeed(params);
        setPosts(posts);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [searchParams]);

  return (
    <>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <Section title="Posts">
        {<PostsList posts={posts} isLoading={isLoading} />}
      </Section>
    </>
  );
};

export default Posts;
