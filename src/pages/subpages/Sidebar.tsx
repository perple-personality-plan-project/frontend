import React from 'react';
import styled from 'styled-components';

interface props {
  openSidebar: () => void;
}

const Sidebar: React.FC<props> = ({ openSidebar }) => {
  return (
    <StToolbar>
      <div className="tool-bar">
        <div className="burger" onClick={openSidebar}>
          <i style={{ fontSize: '30px' }} className="ri-menu-line"></i>
        </div>
        <div className="title"></div>
      </div>
    </StToolbar>
  );
};

export default Sidebar;

const StToolbar = styled.div`
  width: 100%;
  cursor: pointer;
`;
