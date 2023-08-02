import { Layout } from 'Layout/Layout';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Posts = lazy(() => import('../pages/Posts'));
const Profile = lazy(() => import('../pages/Profile'));
const NotFoundpage = lazy(() => import('../pages/Notfoundpage'));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />
          <Route path="posts" element={<Posts />} />
          <Route path="profile/:userName" element={<Profile />} />
          <Route path="*" element={<NotFoundpage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
