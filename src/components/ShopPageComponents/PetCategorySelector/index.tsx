import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../../pageLayouts/Shop/index.module.scss';

export interface PetCategorySelectorProps {
  allPetCategories: string[];
  selectedPetCategories: string[];
  setSelectedPetCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const PetCategorySelector = ({
  allPetCategories,
  selectedPetCategories,
  setSelectedPetCategories,
}: PetCategorySelectorProps) => {
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
    setIsDropdownOpen((prev) => !prev);
  }, [setIsDropdownOpen]);

  const handleOptionClick = useCallback(
    (category: string) => {
      if (selectedPetCategories.includes(category)) {
        // If already selected, remove it
        setSelectedPetCategories(
          selectedPetCategories.filter((c) => c !== category),
        );
      } else {
        // If not selected, add it
        setSelectedPetCategories([...selectedPetCategories, category]);
      }
    },
    [selectedPetCategories, setSelectedPetCategories],
  );

  return (
    <div className={styles.relative}>
      <div
        className={styles.filterLabel}
        onClick={handleLabelClick}
        style={{
          backgroundColor:
            selectedPetCategories.length <= 0
              ? 'var(--primary-white)'
              : 'var(--primary-blue)',
          border:
            selectedPetCategories.length <= 0
              ? '1px solid black'
              : '1px solid var(--primary-blue)',
        }}
      >
        Pet <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {allPetCategories.map((category) => (
            <div
              key={category}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                backgroundColor: selectedPetCategories.includes(category)
                  ? 'var(--primary-green)'
                  : 'var(--secondary-green)',
              }}
              onClick={() => handleOptionClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(PetCategorySelector);
