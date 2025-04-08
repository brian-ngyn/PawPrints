import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../../pageLayouts/Shop/index.module.scss';

export interface CategorySelectorProps {
  allCategories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategorySelector = ({
  allCategories,
  selectedCategories,
  setSelectedCategories,
}: CategorySelectorProps) => {
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
      if (selectedCategories.includes(category)) {
        // If already selected, remove it
        setSelectedCategories(selectedCategories.filter((c) => c !== category));
      } else {
        // If not selected, add it
        setSelectedCategories([...selectedCategories, category]);
      }
    },
    [selectedCategories, setSelectedCategories],
  );

  return (
    <div className={styles.relative}>
      <div
        className={styles.filterLabel}
        onClick={handleLabelClick}
        style={{
          backgroundColor:
            selectedCategories.length <= 0
              ? 'var(--primary-white)'
              : 'var(--primary-gray)',
          border:
            selectedCategories.length <= 0
              ? '1px solid black'
              : '1px solid var(--primary-gray)',
        }}
      >
        Categories <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {allCategories.map((category) => (
            <div
              key={category}
              className={selectedCategories.includes(category) ? styles.selected : ''}
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                color: 'black',
                backgroundColor: selectedCategories.includes(category)
                  ? 'var(--primary-gray)'
                  : 'white',
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

export default memo(CategorySelector);
