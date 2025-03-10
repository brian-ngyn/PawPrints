import { memo, useEffect, useRef, useState } from 'react';
import styles from '../../../pageLayouts/Shop/index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface PriceRangeProps {
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
}

const PriceRange = ({ priceRange, setPriceRange }: PriceRangeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.relative}>
      <label
        className={styles.filterLabel}
        onClick={() => setDropdownOpen((prev) => !prev)}
        style={{
          backgroundColor:
            priceRange[0] === 0 && priceRange[1] === 100
              ? 'var(--primary-white)'
              : 'var(--primary-blue)',
          border:
            priceRange[0] === 0 && priceRange[1] === 100
              ? '1px solid black'
              : '1px solid var(--primary-blue)',
        }}
      >
        Price <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </label>
      {dropdownOpen && (
        <div className={styles.priceRangeDropdown} ref={ref}>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
          <span>
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(PriceRange);
