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
    newSearchParams.set('_page', page);
    newSearchParams.set('_limit', limit);
    setSearchParams(newSearchParams, {replace: true});
  };

  return [paginationData(), setPaginationData];
};
