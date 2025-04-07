import { memo } from 'react';
import styles from '../../../pageLayouts/Shop/index.module.scss';

export interface OnSaleButtonProps {
  onSaleOnly: boolean;
  setOnSaleOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

const OnSaleButton = ({ onSaleOnly, setOnSaleOnly }: OnSaleButtonProps) => {
  return (
    <div className={styles.onSale}>
      <label
        className={styles.filterLabel}
        onClick={() => setOnSaleOnly((prev) => !prev)}
        style={{
          backgroundColor: onSaleOnly
            ? 'var(--primary-gray)'
            : 'var(--primary-white)',
          border: onSaleOnly
            ? '1px solid var(--primary-gray)'
            : '1px solid black',
        }}
      >
        On Sale
      </label>
    </div>
  );
};

export default memo(OnSaleButton);
