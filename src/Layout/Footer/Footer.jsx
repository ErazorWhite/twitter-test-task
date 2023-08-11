import React, { useContext, useEffect, useState } from 'react';
import { StyledFooter } from './Footer.styled';
import Pagination from 'rc-pagination';
import Select, { Option } from 'rc-select';
import 'rc-pagination/assets/index.css';
import '../../styles/rc-select.css';
import { useSearchParams } from 'react-router-dom';
import localeInfo from './locale';
import { PostsContext } from 'Layout/Layout';

// Тут немного приколов из-за связки rc-pagination + rc-select

// Wrapper нужен для изъятия пропа popupMatchSelectWidth и прокидывания Option по пути Pagination -> Options -> Select
// Если убрать Wrapper и передавать в Pagination проп selectComponentClass={Select}, то будем получать раздражающую ошибку
// React does not recognize the `popupMatchSelectWidth` prop on a DOM element.
const SelectWrapper = props => {
  const { children, popupMatchSelectWidth, ...otherProps } = props;
  return <Select {...otherProps}>{children}</Select>;
};

SelectWrapper.Option = Option; // rc-pagination ожидает Select с подкомпонентом Option.
// Если его явно не передать, то получим ошибку
// React.createElement: type is invalid -- expected a string (for built-in components) or a
// class/function (for composite components) but got: undefined. You likely forgot to export
// your component from the file it's defined in, or you might have mixed up default and named imports.
// Check the render method of `Options`.

export const Footer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalPosts } = useContext(PostsContext);
  const [curPage, setCurPage] = useState(parseSearch('_page', 1));
  const [postsPerPage, setPostsPerPage] = useState(parseSearch('_limit', 5));

  function parseSearch(searchParam, defaultValue) {
    return parseInt(searchParams.get(searchParam), 10) || defaultValue;
  }

  // Следующие два useEffect раньше приводили к бесконечному циклу рендера, 
  // но после добавления условий проблема, пусть и не идеально, но решена

  // Этот поддерживает актуальным URL в зависимости от curPage, postsPerPage
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('_page', curPage);
    newSearchParams.set('_limit', postsPerPage);
    setSearchParams(newSearchParams, { replace: true });
  }, [curPage, postsPerPage]);

  // Этот поддерживает актуальным состояние интерфейса в зависимости от URL
  useEffect(() => {
    const currentPageFromParams = parseSearch('_page', 1);
    const postsPerPageFromParams = parseSearch('_limit', 5);

    if (curPage !== currentPageFromParams) {
      setCurPage(currentPageFromParams);
    }
    if (postsPerPage !== postsPerPageFromParams) {
      setPostsPerPage(postsPerPageFromParams);
    }
  }, [searchParams]);

  const onChange = (current, pageSize) => {
    setCurPage(postsPerPage !== pageSize ? 1 : current);
    setPostsPerPage(pageSize);
  };

  return (
    <StyledFooter>
      <Pagination
        pageSizeOptions={['5', '10', '20', '50', '100']}
        showQuickJumper
        showSizeChanger
        pageSize={postsPerPage}
        current={curPage}
        onChange={onChange}
        total={totalPosts}
        locale={localeInfo}
        selectComponentClass={SelectWrapper}
      />
    </StyledFooter>
  );
};
