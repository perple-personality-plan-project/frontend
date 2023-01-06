import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupPage from '../pages/GroupPage';
import GroupDetail from '../pages/GroupDetail';
import MbtiQuestionsPage from '../pages/MbtiQuestionsPage';
import MbtiCheckPage from '../pages/MbtiCheckPage';
import NaviBar from '../components/NaviBar';
import MainPage from '../pages/MainPage';
import Layout from '../components/Layout';
import Header from '../components/Header';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

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
        <Route
          path="/signin"
          element={
            <div>
              <SignInPage />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div>
              <SignUpPage />
            </div>
          }
        />
        <Route
          path="/mbti"
          element={
            <div>
              <MbtiCheckPage />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
