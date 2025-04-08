import { memo } from 'react';
import styles from '../../Footer/index.module.scss';

export interface EventPopupProps {
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const EventPopup = ({ content, onConfirm, onCancel }: EventPopupProps) => {
  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h3>{content}</h3>
        <div className={styles.popupButtons}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Confirm
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(EventPopup);
