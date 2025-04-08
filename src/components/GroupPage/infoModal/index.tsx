import React from 'react';
import styles from '../../../pageLayouts/Groups/index.module.scss';

interface InfoModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  title,
  message,
  onClose,
}) => {
  if (!visible) return null;
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.buttonRow} style={{ placeContent: 'center' }}>
          <button
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
