import { Outlet } from 'react-router-dom';
import React, { Suspense, useState } from 'react';
import { Header } from './Header/Header';
import { Main } from './Layout.styled';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';
import { Footer } from './Footer/Footer';

export const PostsContext = React.createContext(null);

export const Layout = () => {
  const [totalPosts, setTotalPosts] = useState(null);

  return (
    <>
      <PostsContext.Provider value={{ totalPosts, setTotalPosts }}>
        <Header />
        <Main className="container">
          <Suspense fallback={<LoadingSpinner isLoading />}>
            <Outlet />
            <ScrollUp />
          </Suspense>
        </Main>
        <Footer />
      </PostsContext.Provider>
    </>
  );
};
