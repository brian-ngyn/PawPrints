import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../pageLayouts/Shop/index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface BrandSelectorProps {
  allBrands: string[];
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}

const BobSelector2 = ({
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
      if (selectedBrands[0] === brand) {
        setSelectedBrands([]);
      } else {
        // Set the selected brand and close the dropdown
        setSelectedBrands([brand]);
      }
      setIsDropdownOpen(false); // Close the dropdown after selection
    },
    [selectedBrands, setSelectedBrands],
  );

  return (
    <div className={styles.relative}>
      <div
        className={styles.filterLabel}
        onClick={handleLabelClick}
        style={{
          backgroundColor: selectedBrands.length <= 0 ? 'white' : 'white',
          border:
            selectedBrands.length <= 0 ? '1px solid black' : '1px solid black',
        }}
      >
        {selectedBrands.length > 0 ? selectedBrands[0] : 'Public'}
        <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={styles.dropdown}
          style={{ marginBottom: '0px' }}
        >
          {allBrands.map((brand) => (
            <div
              key={brand}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: selectedBrands.includes(brand)
                  ? 'var(--primary-gray)'
                  : 'white',
                marginBottom: '0px',
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

export default memo(BobSelector2);
