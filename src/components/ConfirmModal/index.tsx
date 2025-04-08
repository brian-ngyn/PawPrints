import React from 'react';
import styles from './index.module.scss';

interface ConfirmModalProps {
  visible: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Yes',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        {title && <h3>{title}</h3>}
        <p>{message}</p>
        <div className={styles.popupButtons}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmLabel}
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
