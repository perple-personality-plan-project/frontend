import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from '../components/SidebarModal';

const NaviBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavArr = ['HOT', 'MAP', 'GROUP', 'PROFILE'];

  return (
    <StNavContainer>
      <StNav>
        <StHorizontalLists>
          <StImgGroup>
            <img
              className="toggle"
              src={require('../빡빡이1.png')}
              alt="toggle"
              onClick={() => setIsOpen(prev => !prev)}
            />
            <img className="logo" src={require('../amu.png')} alt="logo" />
          </StImgGroup>
          <ul>
            {NavArr.map((nav, index) => {
              return (
                <li key={index}>
                  <Link to={`/${nav}`}>{nav} </Link>
                </li>
              );
            })}
          </ul>
        </StHorizontalLists>
        <StBtnGroup>
          <button>로그인 </button>
        </StBtnGroup>
      </StNav>

      <div
        className="swiper-bgColor"
        style={{ border: '30px solid #F2F2F2' }}
      ></div>

      <StLine />
      <Modal closeModal={() => setIsOpen(false)} open={isOpen}>
        <StVerticalLists style={{ display: 'flex', flexDirection: 'column' }}>
          <ul>
            {NavArr.map((nav, index) => {
              return (
                <li key={index}>
                  <Link to={`/${nav}`}>{nav}</Link>
                </li>
              );
            })}
          </ul>
        </StVerticalLists>
      </Modal>
    </StNavContainer>
  );
};

export default NaviBar;

const StNavContainer = styled.nav`
  .swiper-bgColor {
    display: none;
  }

  .mySwiper {
    position: absolute;
    top: 24px;
    right: 25%;
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
  }

  .toggle {
    display: none;
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
    margin-right: 30px;
    color: gray;
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

    .toggle {
      display: block;
    }

    .logo {
      display: block;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`;

const StVerticalLists = styled.div`
  ul {
    margin: 0 5px;
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
