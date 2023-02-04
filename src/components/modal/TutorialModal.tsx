import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const TutorialModal: React.FC<Props> = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <StOverLayStyle onClick={onClose} />
      <StModalStyle>
        <div>{children}</div>
        {/* <button onClick={onClose}>Close Modal</button> */}
      </StModalStyle>
    </div>,
    document.getElementById('portal')!,
  );
};

const StOverLayStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const StModalStyle = styled.div`
  /* aspect-ratio: 1186/500; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 80%;
  max-width: 1000px;
  /* 
  @media screen and (max-width: 800px) {
    width: 400px;
  } */
`;
