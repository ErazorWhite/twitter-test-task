import { Section } from 'components/Section/Section';
import { useContext, useEffect, useState } from 'react';
import { getNewsFeed } from 'api/mockAPI';
import { PostsList } from 'components/PostsList/PostsList';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { PostsContext } from 'Layout/Layout';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { setTotalPosts } = useContext(PostsContext);

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

        const { data, headers } = await getNewsFeed(params);
        setTotalPosts(headers['x-total-count']); // json-server отдает total в заголовке
        setPosts(data);
      } catch (e) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [searchParams, setTotalPosts]);

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
