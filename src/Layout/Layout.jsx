import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from './Header/Header';
import { Main } from './Layout.styled';

export const Layout = () => {
  return (
    <>
      <Header>
      </Header>

      <Main className='container'>
        <Suspense>
          <Outlet />
        </Suspense>
      </Main>
    </>
  );
};
