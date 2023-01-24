import React from 'react';
import styled from 'styled-components';

interface props {
  sidebar: boolean;
  closeSidebar: () => void;
}

const Backdrop: React.FC<props> = ({ sidebar, closeSidebar }) => {
  return (
    <StBackDrop>
      <div
        onClick={closeSidebar}
        className={sidebar ? 'backdrop backdrop-open' : 'backdrop'}
      ></div>
    </StBackDrop>
  );
};

export default Backdrop;

const StBackDrop = styled.div`
  z-index: 9999;
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /* background-color: rgba(0, 0, 0, 0.5); */
    display: none;
  }

  .backdrop-open {
    display: block;
  }
`;
