import { Section } from 'components/Section/Section';
import { useContext, useEffect, useState } from 'react';
import { getNewsFeed } from 'api/mockAPI';
import { PostsList } from 'components/PostsList/PostsList';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { PostsContext } from 'Layout/Layout';
import { usePaginationParams } from 'hooks/usePaginationParams';
import PropTypes from 'prop-types';

const Posts = ({ authorId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setTotalPosts, localPosts, setLocalPosts } = useContext(PostsContext);
  const [searchParams] = useSearchParams();
  const [{ page, limit }] = usePaginationParams();

  useEffect(() => {

    setIsLoading(true);

    const asyncWrapper = async () => {
      try {
        // Пагинация
        const params = {
          _page: page,
          _limit: limit,
        };

        // Фильтрация
        for (const [key, value] of searchParams.entries()) {
          if (value) {
            params[key] = value;
          }
        }

        if (authorId) params.authorId = authorId;

        const { data, headers } = await getNewsFeed(params);
        setTotalPosts(headers['x-total-count']);
        setLocalPosts(data)
        // setPosts(data);
      } catch (e) {
        console.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorId, searchParams]);

  return (
    <>
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <Section title="Posts">
        {<PostsList posts={localPosts} isLoading={isLoading} />}
      </Section>
    </>
  );
};

Posts.propTypes = {
  authorId: PropTypes.string,
};

export default Posts;
