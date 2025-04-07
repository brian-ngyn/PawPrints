import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faHouse,
  faPeopleGroup,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useState } from 'react';

import { useNavigate, useLocation } from 'react-router';

import styles from './index.module.scss';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [targetPage, setTargetPage] = useState<string | null>(null);

  const isProfileEditPage = location.pathname === '/profile';

  const handleFooterItemClick = (target: string) => {
    if (isProfileEditPage) {
      setTargetPage(target);
      setIsProfilePopupVisible(true);
    } else {
      navigate(target);
    }
  };

  const handleConfirmLeave = () => {
    if (targetPage) {
      navigate(targetPage);
    }
    setIsProfilePopupVisible(false);
  };

  const handleCancelLeave = () => {
    setIsProfilePopupVisible(false);
  };

  const getIsActive = (path: string) => location.pathname === path;

  return (
    <div>
      <div className={styles.footer}>
        <div
          className={styles.footerItem}
          onClick={() => handleFooterItemClick('/')}
        >
          <div
            className={`${styles.iconWrapper} ${getIsActive('/') ? styles.activeIcon : ''}`}
          >
            <FontAwesomeIcon icon={faHouse} size="3x" />
          </div>
          Home
        </div>
        <div
          className={styles.footerItem}
          onClick={() => handleFooterItemClick('/events')}
        >
          <div
            className={`${styles.iconWrapper} ${getIsActive('/events') ? styles.activeIcon : ''}`}
          >
            <FontAwesomeIcon icon={faCalendar} size="3x" />
          </div>
          Events
        </div>
        <div
          className={styles.footerItem}
          onClick={() => handleFooterItemClick('/groups')}
        >
          <div
            className={`${styles.iconWrapper} ${getIsActive('/groups') ? styles.activeIcon : ''}`}
          >
            <FontAwesomeIcon icon={faPeopleGroup} size="3x" />
          </div>
          Groups
        </div>
        <div
          className={styles.footerItem}
          onClick={() => handleFooterItemClick('/shop')}
        >
          <div
            className={`${styles.iconWrapper} ${getIsActive('/shop') ? styles.activeIcon : ''}`}
          >
            <FontAwesomeIcon icon={faShop} size="3x" />
          </div>
          Shop
        </div>
        <div
          className={styles.footerItem}
          onClick={() => handleFooterItemClick('/profileView')}
        >
          <div
            className={`${styles.iconWrapper} ${getIsActive('/profileView') ? styles.activeIcon : ''}`}
          >
            <FontAwesomeIcon icon={faUser} size="3x" />
          </div>
          Profile
        </div>
      </div>

      {/* Custom Confirmation Popup */}
      {isProfilePopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>
              Are you sure you want to leave this page? Any unsaved changes will
              be lost!
            </h3>
            <div className={styles.popupButtons}>
              <button
                className={styles.confirmButton}
                onClick={handleConfirmLeave}
              >
                Yes, leave
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCancelLeave}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Footer);
