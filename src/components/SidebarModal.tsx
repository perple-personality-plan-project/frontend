import React from 'react';
import ReactDOM from 'react-dom';

const styles = {
  OVERLAY_STYLE: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0,0,0, .7)',
    zIndex: 1000,
  } as React.CSSProperties,

  MODAL_STYLES: {
    position: 'fixed',
    top: '70px',
    left: '0',
    // transform: 'translate(-58%, -50%)',
    backgroundColor: 'white',
    // padding: '50px',
    zIndex: 1000,
  } as React.CSSProperties,
};

interface Props {
  open?: boolean;
  children?: React.ReactNode;
  closeModal?: () => void;
}

export const Modal: React.FC<Props> = ({ open, children, closeModal }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div>
      <div onClick={closeModal} style={styles.OVERLAY_STYLE} />
      <div style={styles.MODAL_STYLES}>
        <div style={{ width: '100%' }}>{children}</div>
        {/* <button onClick={closeModal}>Close Modal</button> */}
      </div>
    </div>,
    document.getElementById('portal')!,
  );
};
