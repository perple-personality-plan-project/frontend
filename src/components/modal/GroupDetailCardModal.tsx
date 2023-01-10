import React, { useState, useEffect } from 'react';
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
    transform: 'translate(-50%, -50%)',
    // backgroundColor: 'white',
    // padding: '50px',
    zIndex: 1000,
    width: '80%',
    maxWidth: '1000px',
  } as React.CSSProperties,
};

interface Props {
  id: number;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const GroupDetailCardModal: React.FC<Props> = ({
  id,
  open,
  children,
  onClose,
}) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose} style={styles.OVERLAY_STYLE} />
      <div style={styles.MODAL_STYLES}>
        <div>{children}</div>
        {/* <button onClick={onClose}>Close Modal</button> */}
      </div>
    </div>,
    document.getElementById('portal')!,
  );
};

const StModalContainer = styled.div`
  width: 350px;

  @media screen and (max-width: 500px) {
    width: 300px;
  }
`;
