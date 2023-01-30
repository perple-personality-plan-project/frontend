import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const styles = {
  OVERLAY_STYLE: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, .7)',
    zIndex: 1000,
  } as React.CSSProperties,
};

interface Props {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  closeModal?: () => void;
}

const GroupModalTemplate: React.FC<Props> = ({
  open,
  children,
  closeModal,
}) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <div onClick={closeModal} style={styles.OVERLAY_STYLE} />
      <StModalStyle>
        <StModalContainer>{children}</StModalContainer>
        {/* <button onClick={onClose}>Close Modal</button> */}
      </StModalStyle>
    </div>,
    document.getElementById('portal')!,
  );
};

export default GroupModalTemplate;

const StModalContainer = styled.div`
  width: 100%;

  @media screen and (max-width: 800px) {
    width: 330px;
  }
`;

const StModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 60%;

  @media screen and (max-width: 800px) {
    width: 330px;
  }
`;
