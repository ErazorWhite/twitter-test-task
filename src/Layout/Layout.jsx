import { Outlet } from 'react-router-dom';
import React, { Suspense, useState } from 'react';
import { Header } from './Header/Header';
import { Main } from './Layout.styled';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';
import { Footer } from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const PostsContext = React.createContext(null);

export const Layout = () => {
  const [totalPosts, setTotalPosts] = useState(null);
  const [localPosts, setLocalPosts] = useState([]);

  return (
    <>
      <PostsContext.Provider
        value={{ totalPosts, setTotalPosts, localPosts, setLocalPosts }}
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
