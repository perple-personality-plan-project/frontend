import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from '../components/SidebarModal';
import SwiperSlides from '../components/Swiper';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import 'remixicon/fonts/remixicon.css';

import 'swiper/css';
import Sidebar from '../pages/subpages/Sidebar';
import SidebarCompelete from '../pages/subpages/SidebarCompelete';

const MapNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState(false);

  const NavArr = ['커뮤니티', '맵', '그룹', '마이 페이지'];
  const NavArrEng = ['community', 'map', 'group', 'mypage'];

  const logout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await client.post('api/user/logout');
      localStorage.clear();
      // setTrigger(!trigger);
      window.location.reload();
      // navigate('/signin');
    }
  };

  return (
    <StNavContainer>
      <StNav>
        <StHorizontalLists>
          <StImgGroup>
            <SidebarCompelete />
            <p className="logo" onClick={() => navigate('/')}>
              Platter
            </p>
          </StImgGroup>
          <ul>
            {NavArr.map((nav, index) => {
              if (nav === '마이 페이지') {
                if (token) {
                  return (
                    <li key={index}>
                      <Link to={`/${NavArrEng[index]}`}>{nav}</Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => alert('로그인을 해주세요!')}
                      >
                        {nav}
                      </div>
                    </li>
                  );
                }
              } else {
                return (
                  <li key={index}>
                    <Link to={`/${NavArrEng[index]}`}>{nav}</Link>
                  </li>
                );
              }
            })}
          </ul>
        </StHorizontalLists>
        {token ? (
          <StBtnGroup>
            <i className="ri-shopping-basket-line"></i>
            <button onClick={logout}>로그아웃 </button>
          </StBtnGroup>
        ) : (
          <StBtnGroup>
            <button onClick={() => navigate('/signin')}>로그인 </button>
          </StBtnGroup>
        )}
      </StNav>

      {/* <div
        className="swiper-bgColor"
        style={{ border: '30px solid #F2F2F2' }}
      ></div> */}

      {/* <SwiperSlides /> */}

      <StLine />
      <Modal closeModal={() => setIsOpen(false)} open={isOpen}>
        <StVerticalLists>
          <ul>
            {NavArr.map((nav, index) => {
              return (
                <li key={index}>
                  <Link to={`/${NavArrEng[index]}`}>{nav}</Link>
                </li>
              );
            })}
          </ul>
        </StVerticalLists>
      </Modal>
    </StNavContainer>
  );
};

export default MapNav;

const StNavContainer = styled.nav`
  .swiper-bgColor {
    display: none;
  }

  .mySwiper {
    position: absolute;
    top: 24px;
    right: 200px;
    /* right: 0; */
  }

  @media screen and (max-width: 800px) {
    .swiper-bgColor {
      display: flex;
    }
    .mySwiper {
      top: 90px;
      right: 50%;
      transform: translate(50%, 0);
    }
  }
`;

const StNav = styled.nav`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
`;

const StImgGroup = styled.div`
  display: flex;

  img {
    width: 70px;
    height: 70px;
    cursor: pointer;
  }

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    cursor: pointer;
    margin: 0;

    font-weight: bold;
  }
`;

const StHorizontalLists = styled.div`
  display: flex;
  align-items: center;

  h1 {
    margin: 0;
  }

  ul {
    display: flex;
    margin: 0;
  }

  li {
    list-style: none;
    /* margin-right: 30px; */
    margin: 0 30px;
    color: gray;

    @media screen and (max-width: 800px) {
      margin: 0;
    }
  }

  li a {
    color: gray;
    text-decoration: none;
  }

  li a:hover {
    color: black;
  }

  @media screen and (max-width: 800px) {
    ul {
      display: none;
    }

    .logo {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -15%);
    }
  }
`;

const StVerticalLists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  ul {
    margin: 0;
    padding: 0 20px;

    box-shadow: 0 0 5px 1px gray;
  }

  li {
    list-style: none;
    /* margin-right: 30px; */
    color: gray;
    margin: 20px 5px;
  }

  li a {
    color: gray;
    text-decoration: none;
  }

  li a:hover {
    color: black;
  }

  li div:hover {
    color: black;
  }

  @media screen and (min-width: 801px) {
    ul {
      display: none;
    }
  }
`;

const StBtnGroup = styled.div`
  button {
    font-size: 16px;
    font-weight: bold;
    background-color: white;
    border: 0;

    cursor: pointer;
  }
`;

const StLine = styled.div`
  border-bottom: 1px solid #c2bebe;
`;
