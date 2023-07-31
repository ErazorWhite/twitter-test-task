import { AiOutlinePlusSquare } from 'react-icons/ai';
import { Input, Ul, Li, Button, SearchBar } from './Controls.styled';
import cssVar from 'utilities/cssVarGetter';
import Select from 'react-select';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const options = [
  { value: 'asc', label: 'New first' },
  { value: 'desc', label: 'Old first' },
];

export const Controls = ({ isDesktop }) => {
  const [isProfilePage, setIsProfilePage] = useState(false); // для ← Go Back
  const location = useLocation(); // для ← Go Back
  const backLinkLocationRef = useRef(location.state?.from ?? '/'); // Для ← Go Back
  const [searchParams, setSearchParams] = useSearchParams(); // Получаем параметры из URLSearchParams для фильтрации
  const [authorSearch, setAuthorSearch] = useState(''); // Для контролируемого Input Author
  const [querySearch, setQuerySearch] = useState(''); // Для контролируемого Input Query
  const [sort, setSort] = useState(options[0]);

  // Обновляем URLSearchParams из SearchBar
  const updateSearchParams = (newSort = sort) => {
    const params = {};

    if (authorSearch.length) params.author = authorSearch;
    if (querySearch.length) params.q = querySearch;
    if (newSort) {
      params._sort = 'createdAt'; // сортировка по полю 'createdAt'
      params._order = newSort.value; // порядок сортировки - asc или desc
    }
    setSearchParams(params);
  };

  // При потере фокуса URLSearchParams обновляет своё значение из Input value
  const handleBlur = () => {
    updateSearchParams();
  };

  // Для Select нужен отдельный хендлер
  const handleSelect = e => {
    setSort(e);
    updateSearchParams(e);
  };

  // Input value и Select заполняются из URLSearchParams
  useEffect(() => {
    setAuthorSearch(searchParams.get('author') ?? '');
    setQuerySearch(searchParams.get('q') ?? '');

    const _sort = searchParams.get('_sort');
    const _order = searchParams.get('_order');

    let sortValue = null;

    // Если _sort равно 'createdAt' и _order равно 'asc', значит, сортировка по возрастанию
    if (_sort === 'createdAt' && _order === 'asc') {
      sortValue = options.find(opt => opt.value === 'asc');
    }
    // Если _sort равно 'createdAt' и _order равно 'desc', значит, сортировка по убыванию
    if (_sort === 'createdAt' && _order === 'desc') {
      sortValue = options.find(opt => opt.value === 'desc');
    }

    setSort(sortValue);
  }, [searchParams]);

  // Для /profile у нас пропадает Input Author, вместо него ← Go Back
  useEffect(() => {
    setIsProfilePage(location.pathname.startsWith('/profile'));
  }, [location]);

  return (
    <>
      <SearchBar onBlur={handleBlur}>
        <Ul>
          {isProfilePage ? (
            <Li>
              <Link to={backLinkLocationRef.current}>← Go Back</Link>
            </Li>
          ) : (
            <Li>
              <label htmlFor="author">Username</label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Enter username to search"
                name="author"
                value={authorSearch}
                onChange={e => {
                  setAuthorSearch(e.target.value);
                }}
              />
            </Li>
          )}
          <Li>
            <label htmlFor="q">Message</label>
            <Input
              autoComplete="off"
              type="text"
              placeholder="Enter to search"
              name="q"
              value={querySearch}
              onChange={e => {
                setQuerySearch(e.target.value);
              }}
            />
          </Li>
          <Li>
            <label htmlFor="sort">Sort</label>
            <Select
              name="sort"
              id="sort"
              options={options}
              isSearchable={false}
              onChange={handleSelect}
              value={sort}
            />
          </Li>
          <Li>
            {!isDesktop && <label htmlFor="sort">Add new post:</label>}
            <Button>
              <AiOutlinePlusSquare
                size={isDesktop ? 50 : 36}
                color={cssVar('--primary-light')}
              />
            </Button>
          </Li>
        </Ul>
      </SearchBar>
    </>
  );
};
