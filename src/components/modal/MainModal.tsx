import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Props {
  id: number;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const MainModal: React.FC<Props> = ({ id, open, children, onClose }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div>
      <StOverLayStyle onClick={onClose} />
      <StModalStyle>
        <div>{children}</div>
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
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 80%;
  max-width: 1000px;

  @media screen and (max-width: 1024px) {
    width: 350px;
  }
`;
