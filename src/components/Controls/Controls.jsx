import { AiOutlinePlusSquare } from 'react-icons/ai';
import { TbFilterX } from 'react-icons/tb';
import { Input, Ul, Li, Button, SearchBar, UlButtons } from './Controls.styled';
import cssVar from 'utilities/cssVarGetter';
import Select from 'react-select';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Modal } from 'components/Modal/Modal';
import { useLocalStorage } from 'hooks/useLocalStorage';

// Sort
const options = [
  { value: 'asc', label: 'Old first' },
  { value: 'desc', label: 'New first' },
];

export const Controls = ({ isDesktop }) => {
  const [isProfilePage, setIsProfilePage] = useState(false); // для ← Go Back с сохранением фильтров
  const location = useLocation(); // для ← Go Back с сохранением фильтров
  const backLinkLocationRef = useRef(location.state?.from ?? '/'); // Для ← Go Back с сохранением фильтров
  const [searchParams, setSearchParams] = useSearchParams(); // Получаем параметры из URLSearchParams для фильтрации
  const [authorSearch, setAuthorSearch] = useState(''); // Для контролируемого Input Author
  const [querySearch, setQuerySearch] = useState(''); // Для контролируемого Input Query
  const [sort, setSort] = useLocalStorage('SORT', options[0]); // Поиск в LocalStorage запоминает
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [curPage, setCurPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useLocalStorage('PER_PAGE', 5); // PerPage в LocalStorage запоминает

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Обновляем URLSearchParams из SearchBar
  const updateSearchParams = useCallback(
    (newSort = sort) => {
      const params = {};

      params._page = curPage || 1;
      params._limit = postsPerPage || 5;
      if (authorSearch.length) params.author = authorSearch.trim();
      if (querySearch.length) params.q = querySearch.trim();
      if (newSort) {
        params._sort = 'createdAt'; // сортировка по полю 'createdAt'
        params._order = newSort.value; // порядок сортировки - asc или desc
      }
      setSearchParams(params);
    },
    [curPage, postsPerPage, authorSearch, querySearch, sort, setSearchParams]
  );

  // Хендлер для инпутов
  const handleChange = useDebouncedCallback(() => {
    updateSearchParams();
  }, 450);

  // Для Select нужен отдельный хендлер
  const handleSelect = e => {
    setSort(e);
    updateSearchParams(e);
  };

  // Перый useEffect нужен для того,
  // чтобы проверять searchParams и, если необходимо, наполнять дефолтной информацией про пагинацию, а также сетать сортировку
  // Работает только если searchParams пустой
  useEffect(() => {
    if (!searchParams.size && location.pathname !== '/profile') {
      updateSearchParams();
    }
  }, []);

  // Второй useEffect нужен на случай когда мы изменяем searchParams
  // Он парсит searchParams и наполняет информацией инпуты и селекторы
  useEffect(() => {
    setCurPage(searchParams.get('_page') ?? 1);
    setPostsPerPage(searchParams.get('_limit') ?? 5);
    setAuthorSearch(searchParams.get('author') ?? '');
    setQuerySearch(searchParams.get('q') ?? '');
    const _sort = searchParams.get('_sort');
    const _order = searchParams.get('_order');

    let sortValue = null;

    // Дальше выглядит не очень красиво, но пока не придумал как это сделать лучше

    // Если _sort равно 'createdAt' и _order равно 'asc', значит, сортировка по возрастанию
    if (_sort === 'createdAt' && _order === 'asc')
      sortValue = options.find(opt => opt.value === 'asc');
    // Если _sort равно 'createdAt' и _order равно 'desc', значит, сортировка по убыванию
    if (_sort === 'createdAt' && _order === 'desc')
      sortValue = options.find(opt => opt.value === 'desc');

    setSort(sortValue);
  }, [searchParams, setSort, setPostsPerPage]);

  // Для /profile у нас пропадает Input Author, вместо него линк ← Go Back
  useEffect(() => {
    setIsProfilePage(location.pathname.startsWith('/profile'));
    backLinkLocationRef.current = location.state?.from // Запоминаем куда возвращаться
      ? location.state.from
      : { pathname: '/', search: '' };
  }, [location]);

  // Очистка фильтрации
  const handleClear = () => {
    const params = {};
    params._page = curPage;
    params._limit = postsPerPage;
    params._sort = 'createdAt'; // сортировка по полю 'createdAt'
    params._order = 'asc'; // порядок сортировки - asc или desc
    setSearchParams(params);
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
                option: provided => ({
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

      {isModalOpen && <Modal closeModal={toggleModal} />}
    </>
  );
};
