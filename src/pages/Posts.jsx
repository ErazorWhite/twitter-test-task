import { Section } from 'components/Section/Section';
import { useContext, useEffect, useState } from 'react';
import { getNewsFeed } from 'api/mockAPI';
import { PostsList } from 'components/PostsList/PostsList';
import { useSearchParams } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { PostsContext } from 'Layout/Layout';

const Posts = ({ authorId }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setTotalPosts } = useContext(PostsContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [curPage] = useState(parseSearch('_page', 1));
  const [postsPerPage] = useState(parseSearch('_limit', 5));

  function parseSearch(searchParam, defaultValue) {
    return parseInt(searchParams.get(searchParam), 10) || defaultValue;
  }

  useEffect(() => {
    // Пагинация
    if (!searchParams.has('_page') || !searchParams.has('_limit')) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('_page', curPage);
      newSearchParams.set('_limit', postsPerPage);
      setSearchParams(newSearchParams, { replace: true });
    }

    setIsLoading(true);

    const asyncWrapper = async () => {
      try {
        // Пагинация
        const params = {
          _page: curPage,
          _limit: postsPerPage,
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
        setPosts(data);
      } catch (e) {
        console.log(e.message);
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
        {<PostsList posts={posts} isLoading={isLoading} />}
      </Section>
    </>
  );
};

export default Posts;
