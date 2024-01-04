import React, { useContext, memo } from 'react';
import { PaginationContainer, StyledFooter } from './Footer.styled';
import Pagination from 'rc-pagination';
import Select, { Option } from 'rc-select';
import 'rc-pagination/assets/index.css';
import '../../styles/rc-select.css';
import localeInfo from './locale';
import { PostsContext } from 'Layout/Layout';
import { usePaginationParams } from 'hooks/usePaginationParams';

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

const Footer = () => {
  const [{ page, limit }, setPaginationData] = usePaginationParams();
  const { totalPosts } = useContext(PostsContext);

  const onChange = (current, pageSize) => {
    current = pageSize === limit ? current : 1;
    setPaginationData(current, pageSize);
  };

  return (
    <StyledFooter>
      <PaginationContainer>
        <Pagination
          pageSizeOptions={['5', '10', '20', '50', '100']}
          showSizeChanger={5}
          pageSize={limit}
          current={page}
          onChange={onChange}
          total={totalPosts}
          locale={localeInfo}
          selectComponentClass={SelectWrapper}
        />
      </PaginationContainer>
    </StyledFooter>
  );
};

export const MemoziedFooter = memo(Footer);