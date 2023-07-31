import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from './Header/Header';
import { Main } from './Layout.styled';

export const Layout = () => {
  return (
    <>
      <Header />
      <Main className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Main>
    </>
  );
};
