import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

interface props {
  sidebar: boolean;
  closeSidebar: () => void;
}
const SidebarComponent: React.FC<props> = ({ sidebar, closeSidebar }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const mypage = () => {
    if (accessToken !== null) {
      navigate('/mypage');
    } else {
      alert('로그인을 해주세요!');
    }
  };
  return (
    <StSidebar>
      <div className={sidebar ? 'sidebar sidebar-open' : 'sidebar'}>
        <div
          style={{
            width: '100%',
            height: '70px',
            marginLeft: '20px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={closeSidebar}
        >
          <i
            style={{ fontSize: '30px', color: 'black' }}
            className="ri-menu-line"
          ></i>
        </div>
        <li onClick={() => navigate('/')}>커뮤니티</li>
        <li onClick={() => navigate('/map')}>맵</li>
        <li onClick={() => navigate('/group')}>그룹</li>
        <li onClick={mypage}>마이페이지</li>
      </div>
    </StSidebar>
  );
};

export default SidebarComponent;

const StSidebar = styled.div`
  z-index: 10000;
  .sidebar {
    position: absolute;
    /* background-color: #222f3e; */
    background-color: #c2bebe;
    color: white;
    top: 0;
    left: 0;
    /* height: 50vh; */
    width: 150px;
    transform: translateX(-100%);
    transition: all 0.4s;

    li {
      /* box-sizing: border-box; */
      cursor: pointer;
      display: flex;
      align-items: center;
      list-style: none;
      padding: 0 1rem;
      font-size: 18px;
      border-bottom: 1px solid #c2bebe;
      /* border-right: 1px solid red; */
      height: 70px;

      &:hover {
        background-color: white;
        color: black;
      }
    }
  }

  .sidebar-open {
    transform: translateX(0%);
    z-index: 200;
  }
`;
