import styles from '../../Footer/index.module.scss';

interface ModalProps {
  visible: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

const Modal = ({
  visible,
  title,
  message,
  confirmLabel = 'OK',
  onConfirm,
}: ModalProps) => {
  if (!visible) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        {title && <h3>{title}</h3>}
        <p>{message}</p>
        <div className={styles.popupButtons} style={{ placeContent: 'center' }}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
