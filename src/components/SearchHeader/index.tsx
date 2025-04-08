//import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import { useNavigate } from 'react-router';

import styles from './index.module.scss';
import NewPostButton from '../NewPostButton';
import SearchBar from '../SearchBar';

const SearchHeader = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div
        className={styles.notifications}
        onClick={() => navigate('/notifications')}
      >
        <div className={styles.alarmBell}>
          <FontAwesomeIcon icon={faBell} size="2x" />
        </div>
      </div>
      <SearchBar />
      <div className={styles.newButton}>
        <NewPostButton />
      </div>
    </div>
  );
};

export default memo(SearchHeader);
