import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupPage from '../pages/GroupPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GroupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
