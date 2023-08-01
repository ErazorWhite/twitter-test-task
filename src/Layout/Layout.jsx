import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Header } from './Header/Header';
import { Main } from './Layout.styled';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

export const Layout = () => {
  return (
    <>
      <Header />
      <Main className="container">
        <Suspense fallback={<LoadingSpinner isLoading />}>
          <Outlet />
        </Suspense>
      </Main>
    </>
  );
};
