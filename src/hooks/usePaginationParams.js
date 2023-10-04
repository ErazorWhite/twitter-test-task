import { useSearchParams } from 'react-router-dom';

export const usePaginationParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paginationData = () => {
    const page = parseInt(searchParams.get('_page'), 10) || 1;
    const limit = parseInt(searchParams.get('_limit'), 10) || 5;
    return { page, limit };
  };

  const setPaginationData = (page, limit) => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Set parameter only if it's not a default value
    if (page !== 1) {
      newSearchParams.set('_page', page);
    } else {
      newSearchParams.delete('_page'); // Remove _page if it's the default value (1)
    }

    if (limit !== 5) {
      newSearchParams.set('_limit', limit);
    } else {
      newSearchParams.delete('_limit'); // Remove _limit if it's the default value (5)
    }

    setSearchParams(newSearchParams);
  };

  return [paginationData(), setPaginationData];
};
