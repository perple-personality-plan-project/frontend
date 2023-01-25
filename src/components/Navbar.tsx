import React from 'react';
import styled from 'styled-components';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import SidebarCompelete from '../pages/subpages/SidebarCompelete';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

interface linkProps {
  to: any;
  children: any;
  props?: any;
}

const Navbar = () => {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const CustomLink: React.FC<linkProps> = ({ to, children, ...props }) => {
    // const path = window.location.pathname;
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
      <li className={isActive ? 'active' : ''}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  };

  const logout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await client.post('api/user/logout');
      localStorage.clear();
      navigate('/community');
    }
  };

  return (
    <StNavContainer>
      <nav className="nav">
        <SidebarCompelete />
        <Link to="/community" className="site-title">
          <p>Platter</p>
        </Link>
        <div className="link-container">
          <ul className="link-delete">
            <CustomLink to="/community">커뮤니티</CustomLink>
            <CustomLink to="/map">맵</CustomLink>
            <CustomLink to="/group">그룹</CustomLink>
            <CustomLink to="/mypage">마이페이지</CustomLink>
          </ul>
          <ul>
            <i
              style={{ alignSelf: 'center', fontSize: '20px' }}
              className="ri-shopping-basket-line"
            ></i>
            {token ? (
              <button onClick={logout}>로그아웃 </button>
            ) : (
              <button onClick={() => navigate('/signin')}>로그인 </button>
            )}
          </ul>
        </div>
      </nav>
    </StNavContainer>
  );
};

export default Navbar;

const StNavContainer = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
  }
  .nav {
    height: 90px;
    background-color: #644eee;
    color: white;
    display: flex;
    /* justify-content: space-between; */
    align-items: stretch;
    gap: 2rem;
    padding: 0 1rem;

    @media screen and (max-width: 800px) {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .site-title {
    font-weight: bold;
    font-size: 1.3rem;
    /* padding: 0 30px; */

    p {
      padding-left: 15px;
    }
  }

  .link-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    /* align-items: center; */
    .link-delete {
      @media screen and (max-width: 800px) {
        display: none;
      }
    }

    @media screen and (max-width: 800px) {
      width: auto;
    }
  }

  .nav ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;

    gap: 1rem;

    button {
      align-self: center;
      background-color: #644eee;
      border: 1px solid white;
      border-radius: 20px;
      color: white;
      width: 85px;
      height: 35px;
      cursor: pointer;
    }
  }

  .nav li {
    padding: 0 20px;
  }

  .nav a {
    color: inherit;
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0.25rem;
  }

  .nav li.active {
    border-bottom: 4px solid white;
    font-weight: bold;
    /* background-color: #555; */
  }

  .nav li:hover {
    color: white;
    /* background-color: #777; */
  }
`;
