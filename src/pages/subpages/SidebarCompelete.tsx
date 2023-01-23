import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SidebarComponent from './SidebarComponent';
import Backdrop from './Backdrop';
import styled from 'styled-components';

const SidebarCompelete = () => {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(prev => !prev);
  };
  return (
    <StContainer>
      <Sidebar openSidebar={toggleSidebar} />
      <Backdrop sidebar={sidebar} closeSidebar={toggleSidebar} />
      <SidebarComponent sidebar={sidebar} closeSidebar={toggleSidebar} />
    </StContainer>
  );
};

export default SidebarCompelete;

const StContainer = styled.div`
  width: 70px;
  height: 70px;
  display: none;

  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
