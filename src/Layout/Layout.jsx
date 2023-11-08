import { Outlet } from 'react-router-dom';
import React, { createContext, memo, Suspense, useMemo, useState } from 'react';
import { Header } from './Header/Header';
import { Main } from './Layout.styled';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';
import { Footer } from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PostsContext = createContext(null);

const MemoizedHeader = memo(Header);
const MemoizedMain = memo(Main);
const MemoizedFooter = memo(Footer);

export const Layout = () => {
  const [totalPosts, setTotalPosts] = useState(null);
  const [localPosts, setLocalPosts] = useState([]);

  const memoizedTotalPosts = useMemo(() => totalPosts, [totalPosts]);
  const memoizedLocalPosts = useMemo(() => localPosts, [localPosts]);

  return (
    <>
      <PostsContext.Provider
        value={{
          totalPosts: memoizedTotalPosts,
          setTotalPosts,
          localPosts: memoizedLocalPosts,
          setLocalPosts,
        }}
      >
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
        <MemoizedMain className="container">
          <Suspense fallback={<LoadingSpinner isLoading />}>
            <Outlet />
            <ScrollUp />
          </Suspense>
        </MemoizedMain>
        <MemoizedFooter />
      </PostsContext.Provider>
    </>
  );
};
