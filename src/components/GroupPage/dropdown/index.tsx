import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../../pageLayouts/Shop/index.module.scss';

export interface GroupPageDropdownProps {
  label: string;
  allDropdownOptions: string[];
  selectedDropdownOption: string;
  setSelectedDropdownOption: React.Dispatch<React.SetStateAction<string>>;
  inline?: boolean;
}

const GroupPageDropdown = ({
  allDropdownOptions,
  label,
  selectedDropdownOption,
  setSelectedDropdownOption,
  inline = false,
}: GroupPageDropdownProps) => {
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
      if (selectedDropdownOption === category) {
        // If already selected, remove it
        setSelectedDropdownOption('');
      } else {
        // If not selected, add it
        setSelectedDropdownOption(category);
      }
    },
    [allDropdownOptions, selectedDropdownOption, setSelectedDropdownOption],
  );

  return (
    <div className={styles.relative}>
      <div
        className={styles.filterLabel}
        onClick={handleLabelClick}
        style={{
          backgroundColor: inline
            ? 'var(--primary-white)'
            : selectedDropdownOption === ''
              ? 'var(--primary-white)'
              : 'var(--primary-gray)',
          border:
            selectedDropdownOption === ''
              ? '1px solid black'
              : '1px solid var(--primary-gray)',
        }}
      >
        {inline ? selectedDropdownOption : label}{' '}
        <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {allDropdownOptions.map((category) => (
            <div
              key={category}
              className={
                selectedDropdownOption === category ? styles.selected : ''
              }
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                color: 'black',
                backgroundColor:
                  selectedDropdownOption === category
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

export default memo(GroupPageDropdown);
