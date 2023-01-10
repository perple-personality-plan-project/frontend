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

  MODAL_STYLES: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-54%, -50%)',
    // backgroundColor: 'white',
    padding: '50px',
    zIndex: 1000,
  } as React.CSSProperties,
};

interface Props {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  closeModal?: () => void;
}

const ModalTemplate: React.FC<Props> = ({ open, children, closeModal }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <div onClick={closeModal} style={styles.OVERLAY_STYLE} />
      <div style={styles.MODAL_STYLES}>
        <StModalContainer>{children}</StModalContainer>
        {/* <button onClick={onClose}>Close Modal</button> */}
      </div>
    </div>,
    document.getElementById('portal')!,
  );
};

export default ModalTemplate;

const StModalContainer = styled.div`
  width: 350px;

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;
