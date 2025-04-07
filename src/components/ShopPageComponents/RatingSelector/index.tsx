import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../../pageLayouts/Shop/index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface RatingSelectorProps {
  minRating: number;
  setMinRating: React.Dispatch<React.SetStateAction<number>>;
}

const RatingSelector = ({ minRating, setMinRating }: RatingSelectorProps) => {
  const ref = useRef<HTMLDivElement>(null);
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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLabelClick = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, [setDropdownOpen]);

  const handleOptionClick = useCallback(
    (value: number) => {
      setMinRating(value);
      setDropdownOpen(false);
    },
    [setMinRating, setDropdownOpen],
  );

  return (
    <div className={styles.relative}>
      <div
        onClick={handleLabelClick}
        className={styles.filterLabel}
        style={{
          backgroundColor:
            minRating === 0 ? 'var(--primary-white)' : 'var(--primary-gray)',
          border:
            minRating === 0
              ? '1px solid black'
              : '1px solid var(--primary-gray)',
        }}
      >
        {minRating === 0
          ? 'Rating'
          : `${minRating} Star${minRating > 1 ? 's' : ''} & Up`}{' '}
        <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </div>

      {dropdownOpen && (
        <div ref={ref} className={styles.dropdown}>
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor:
                minRating === 0 ? 'var(--primary-gray)' : 'white',
            }}
            onClick={() => handleOptionClick(0)}
          >
            Rating
          </div>
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor:
                minRating === 1 ? 'var(--primary-gray)' : 'white',
            }}
            onClick={() => handleOptionClick(1)}
          >
            1 Star & Up
          </div>
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor:
                minRating === 2 ? 'var(--primary-gray)' : 'white',
            }}
            onClick={() => handleOptionClick(2)}
          >
            2 Stars & Up
          </div>
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor:
                minRating === 3 ? 'var(--primary-gray)' : 'white',
            }}
            onClick={() => handleOptionClick(3)}
          >
            3 Stars & Up
          </div>
          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              backgroundColor:
                minRating === 4 ? 'var(--primary-gray)' : 'white',
            }}
            onClick={() => handleOptionClick(4)}
          >
            4 Stars & Up
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(RatingSelector);
