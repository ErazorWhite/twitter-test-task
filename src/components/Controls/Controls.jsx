import { AiOutlinePlusSquare } from 'react-icons/ai';
import { TbFilterX } from 'react-icons/tb';
import { Input, Ul, Li, Button, SearchBar, UlButtons } from './Controls.styled';
import cssVar from 'utilities/cssVarGetter';
import Select from 'react-select';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Modal } from 'components/Modal/Modal';

const options = [
  { value: 'asc', label: 'Old first' },
  { value: 'desc', label: 'New first' },
];

export const Controls = ({ isDesktop }) => {
  const [isProfilePage, setIsProfilePage] = useState(false); // для ← Go Back
  const location = useLocation(); // для ← Go Back
  const backLinkLocationRef = useRef(location.state?.from ?? '/'); // Для ← Go Back
  const [searchParams, setSearchParams] = useSearchParams(); // Получаем параметры из URLSearchParams для фильтрации
  const [authorSearch, setAuthorSearch] = useState(''); // Для контролируемого Input Author
  const [querySearch, setQuerySearch] = useState(''); // Для контролируемого Input Query
  const [sort, setSort] = useState(options[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Обновляем URLSearchParams из SearchBar
  const updateSearchParams = (newSort = sort) => {
    const params = {};

    if (authorSearch.length) params.author = authorSearch.trim();
    if (querySearch.length) params.q = querySearch.trim() ;
    if (newSort) {
      params._sort = 'createdAt'; // сортировка по полю 'createdAt'
      params._order = newSort.value; // порядок сортировки - asc или desc
    }
    setSearchParams(params);
  };

  const handleChange = useDebouncedCallback(() => {
    updateSearchParams();
  }, 450);

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
    if (_sort === 'createdAt' && _order === 'asc')
      sortValue = options.find(opt => opt.value === 'asc');
    // Если _sort равно 'createdAt' и _order равно 'desc', значит, сортировка по убыванию
    if (_sort === 'createdAt' && _order === 'desc')
      sortValue = options.find(opt => opt.value === 'desc');

    setSort(sortValue);
  }, [searchParams]);

  // Для /profile у нас пропадает Input Author, вместо него ← Go Back
  useEffect(() => {
    setIsProfilePage(location.pathname.startsWith('/profile'));
    backLinkLocationRef.current = location.state?.from // Запоминаем куда возвращаться
      ? location.state.from
      : { pathname: '/', search: '' };
  }, [location]);

  const handleClear = () => {
    setAuthorSearch('');
    setQuerySearch('');
    setSort(null);
    setSearchParams({});
  };

  return (
    <>
      <SearchBar onChange={handleChange}>
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
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  color: 'black',
                }),
                singleValue: provided => ({
                  ...provided,
                  color: 'black',
                }),
              }}
            />
          </Li>
          <Li>
            <UlButtons>
              <Li>
                <Button name="addNew" onClick={toggleModal}>
                  <AiOutlinePlusSquare
                    size={isDesktop ? 50 : 36}
                    color={cssVar('--primary-light')}
                  />
                </Button>
              </Li>
              <Li>
                <Button name="clear" onClick={handleClear}>
                  <TbFilterX
                    size={isDesktop ? 50 : 36}
                    color={cssVar('--primary-light')}
                  />
                </Button>
              </Li>
            </UlButtons>
          </Li>
        </Ul>
      </SearchBar>
      {isModalOpen && (
        <Modal closeModal={toggleModal} />
      )}
    </>
  );
};
