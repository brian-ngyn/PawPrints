import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faHouse,
  faPeopleGroup,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import { useNavigate } from 'react-router';

import styles from './index.module.scss';

const Footer = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.footer}>
      <div className={styles.footerItem} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faHouse} size="3x" />
        Home
      </div>
      <div className={styles.footerItem} onClick={() => navigate('/events')}>
        <FontAwesomeIcon icon={faCalendar} size="3x" />
        Events
      </div>
      <div className={styles.footerItem} onClick={() => navigate('/groups')}>
        <FontAwesomeIcon icon={faPeopleGroup} size="3x" />
        Groups
      </div>
      <div className={styles.footerItem} onClick={() => navigate('/shop')}>
        <FontAwesomeIcon icon={faShop} size="3x" />
        Shop
      </div>
      <div className={styles.footerItem} onClick={() => navigate('/profile')}>
        <FontAwesomeIcon icon={faUser} size="3x" />
        Profile
      </div>
    </div>
  );
};

export default memo(Footer);
