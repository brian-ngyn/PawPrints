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
  }

  const handleConfirmLeave = () => {
    if (targetPage) {
      navigate(targetPage);
    }
    setIsProfilePopupVisible(false);
  };

  const handleCancelLeave = () => {
    setIsProfilePopupVisible(false);
  };

  return (
  <div>
    <div className={styles.footer}>
      <div className={styles.footerItem} onClick={() => handleFooterItemClick('/')}>
        <FontAwesomeIcon icon={faHouse} size="3x" />
        Home
      </div>
      <div className={styles.footerItem} onClick={() => handleFooterItemClick('/events')}>
        <FontAwesomeIcon icon={faCalendar} size="3x" />
        Events
      </div>
      <div className={styles.footerItem} onClick={() => handleFooterItemClick('/groups')}>
        <FontAwesomeIcon icon={faPeopleGroup} size="3x" />
        Groups
      </div>
      <div className={styles.footerItem} onClick={() => handleFooterItemClick('/shop')}>
        <FontAwesomeIcon icon={faShop} size="3x" />
        Shop
      </div>
      <div className={styles.footerItem} onClick={() => handleFooterItemClick('/profileView')}>
        <FontAwesomeIcon icon={faUser} size="3x" />
        Profile
      </div>
    </div>

      {/* Custom Confirmation Popup */}
      {isProfilePopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Are you sure you want to leave this page? Any unsaved changes will be lost!</h3>
            <div className={styles.popupButtons}>
              <button className={styles.confirmButton} onClick={handleConfirmLeave}>
                Yes, leave
              </button>
              <button className={styles.cancelButton} onClick={handleCancelLeave}>
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
