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
import TogoUserlist from '../pages/Togolist';

import { store } from '../redux/config/configStore';
import { Provider } from 'react-redux';
import MainNav from '../components/MainNav';
import KakaoRedirect from '../pages/subpages/KakaoRedirect';
import Navbar from '../components/Navbar';

const Router = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/kakaocallback" element={<KakaoRedirect />} />
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
                <Navbar />
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
                <Navbar />
                <GroupPage />
              </div>
            }
          />

          <Route
            path="/"
            element={
              <div style={{ maxWidth: '1440px', margin: 'auto' }}>
                <Navbar />
                <MainPage />
              </div>
            }
          />

          <Route
            path="/community"
            element={
              <div style={{ maxWidth: '1440px', margin: 'auto' }}>
                <Navbar />
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
          <Route
            path="/map"
            element={
              <div>
                <Navbar />
                <MapPage />
              </div>
            }
          />
          <Route
            path="/mypage"
            element={
              <div
                style={{
                  maxWidth: '1440px',
                  margin: '0 auto',
                  position: 'relative',
                  // justifyContent: 'center',
                }}
              >
                <MyPage />
              </div>
            }
          />
          <Route path="/togolist" element={<TogoUserlist />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Router;
