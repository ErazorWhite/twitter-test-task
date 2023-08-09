import React, { useContext, useEffect, useState } from 'react';
import { StyledFooter } from './Footer.styled';
import Pagination from 'rc-pagination';
import Select, { Option } from 'rc-select';
import 'rc-pagination/assets/index.css';
import '../../styles/rc-select.css';
import { useSearchParams } from 'react-router-dom';
import localeInfo from './locale';
import { PostsContext } from 'Layout/Layout';
import { useLocalStorage } from 'hooks/useLocalStorage';

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
  const [searchParams, setSearchParams] = useSearchParams(); // Получаем параметры из URLSearchParams для пагинации
  const { totalPosts } = useContext(PostsContext);

  const [curPage] = useState(parseInt(searchParams.get('_page'), 10) || 1);

  const [storedValue] = useLocalStorage('PER_PAGE', 5);
  const initialPostsPerPage =
    parseInt(searchParams.get('_limit'), 10) || storedValue;
  const [postsPerPage] = useState(initialPostsPerPage);

  const onShowSizeChange = (_, pageSize) => {
    searchParams.set('_limit', pageSize.toString());
    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  const onChange = current => {
    searchParams.set('_page', current.toString());
    setSearchParams(new URLSearchParams(searchParams.toString()));
  };

  return (
    <StyledFooter>
      <Pagination
        pageSizeOptions={['5', '10', '20', '50', '100']}
        showQuickJumper
        showSizeChanger
        defaultPageSize={postsPerPage}
        defaultCurrent={curPage}
        onShowSizeChange={onShowSizeChange}
        onChange={onChange}
        total={totalPosts}
        locale={localeInfo}
        selectComponentClass={SelectWrapper}
      />
    </StyledFooter>
  );
};
