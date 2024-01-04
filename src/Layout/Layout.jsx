import React, { createContext, Suspense, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';
import { MemoizedHeader } from './Header/Header';
import { MemoizedFooter } from './Footer/Footer';
import { Main } from './Layout.styled';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PostsContext = createContext(null);
const spinner = <LoadingSpinner isLoading />;

export const Layout = () => {
  const [totalPosts, setTotalPosts] = useState(null);
  const [localPosts, setLocalPosts] = useState([]);

  const contextValue = useMemo(
    () => ({
      totalPosts,
      setTotalPosts,
      localPosts,
      setLocalPosts,
    }),
    [totalPosts, localPosts]
  );

  return (
    <PostsContext.Provider value={contextValue}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <MemoizedHeader />
      <Main className="container">
        <Suspense fallback={spinner}>
          <Outlet />
          <ScrollUp />
        </Suspense>
      </Main>
      <MemoizedFooter />
    </PostsContext.Provider>
  );
};
