import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../../pageLayouts/Shop/index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface BrandSelectorProps {
  allBrands: string[];
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BrandSelector = ({
  allBrands,
  selectedBrands,
  setSelectedBrands,
}: BrandSelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLabelClick = useCallback(() => {
    setIsDropdownOpen(!isDropdownOpen);
  }, [isDropdownOpen]);

  const handleOptionClick = useCallback(
    (brand: string) => {
      if (selectedBrands.includes(brand)) {
        setSelectedBrands(selectedBrands.filter((b) => b !== brand));
      } else {
        setSelectedBrands([...selectedBrands, brand]);
      }
    },
    [selectedBrands, setSelectedBrands],
  );

  return (
    <div className={styles.relative}>
      <div
        className={styles.filterLabel}
        onClick={handleLabelClick}
        style={{
          backgroundColor:
            selectedBrands.length <= 0
              ? 'var(--primary-white)'
              : 'var(--primary-blue)',
          border:
            selectedBrands.length <= 0
              ? '1px solid black'
              : '1px solid var(--primary-blue)',
        }}
      >
        Brands <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </div>

      {isDropdownOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {allBrands.map((brand) => (
            <div
              key={brand}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: selectedBrands.includes(brand)
                  ? 'var(--primary-green)'
                  : 'var(--secondary-green)',
              }}
              onClick={() => handleOptionClick(brand)}
            >
              {brand}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(BrandSelector);
