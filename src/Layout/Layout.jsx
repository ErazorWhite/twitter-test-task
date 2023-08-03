import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from './Header/Header';
import { Main } from './Layout.styled';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';

export const Layout = () => {
  return (
    <>
      <Header />
      <Main className="container">
        <Suspense fallback={<LoadingSpinner isLoading />}>
          <Outlet />
          <ScrollUp />
        </Suspense>
      </Main>
    </>
  );
};
