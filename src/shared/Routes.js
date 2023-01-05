import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupPage from '../pages/GroupPage';
import GroupDetail from '../pages/GroupDetail';
import MbtiQuestionsPage from '../pages/MbtiQuestionsPage';
import NaviBar from '../components/NaviBar';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/group" element={<GroupPage />} />
        <Route path="/:id" element={<GroupDetail />} />
        <Route
          path="/"
          element={
            <div>
              <NaviBar />
              <GroupPage />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
