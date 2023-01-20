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
import MapPage from '../pages/MapPage';
import MyPage from '../pages/MyPage';

import { store } from '../redux/config/configStore';
import { Provider } from 'react-redux';

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/:id"
            element={
              <div
                style={{
                  maxWidth: '1440px',
                  margin: '0 auto',
                  position: 'relative',
                  // justifyContent: 'center',
                }}
              >
                <NaviBar />
                <GroupDetail />
              </div>
            }
          />
          <Route
            path="/group"
            element={
              <div
                style={{
                  maxWidth: '1440px',
                  margin: '0 auto',
                  position: 'relative',
                  // justifyContent: 'center',
                }}
              >
                <NaviBar />
                <GroupPage />
              </div>
            }
          />

          <Route
            path="/"
            element={
              <div style={{ maxWidth: '1440px', margin: 'auto' }}>
                <Header />
                <MainPage />
              </div>
            }
          />

          <Route
            path="/community"
            element={
              <div style={{ maxWidth: '1440px', margin: 'auto' }}>
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
              <div style={{ maxWidth: '1440px', margin: 'auto' }}>
                <NaviBar />
                <MbtiCheckPage />
              </div>
            }
          />
          <Route
            path="/mbtiquestion"
            element={
              <div>
                <MbtiQuestionsPage />
              </div>
            }
          />
          <Route path="/map" element={<MapPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
