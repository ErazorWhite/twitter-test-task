import { Layout } from 'Layout/Layout';
import NotFoundpage from 'pages/Notfoundpage';
import Posts from 'pages/Posts';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />
        </Route>
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </>
  );
}

export default App;
