import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupPage from '../pages/GroupPage';
import GroupDetail from '../pages/GroupDetail';
import MbtiQuestionsPage from '../pages/MbtiQuestionsPage';
import NaviBar from '../components/NaviBar';
import MainPage from '../pages/MainPage';
import Layout from '../components/Layout';
import Header from '../components/Header';
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
          <Route path="/" element={<GroupPage />} />
          <Route
            path="/main"
            element={
              <div>
                <Header />
                <MainPage />
              </div>
            }
          />
        </Routes>
    
    </BrowserRouter>
  );
};

export default Router;
