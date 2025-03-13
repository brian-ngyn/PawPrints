import { memo } from 'react';
import Post from '../../components/Post';

import {
  faUser,
  faShop,
  faChain,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import NewPostButton from '../../components/NewPostButton';
import SearchHeader from '../../components/SearchHeader';
import PostNotification from '../../components/PostNotification';

import { useNavigate } from 'react-router';

const NotificationCentre = () => {
  let navigate = useNavigate();

  return <div className={styles.home}>
    <div className={styles.pageHeading}>
      Notifications
    </div>
    <div className={styles.backArrow} onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} size="2x" /></div>

    <div className={styles.feedSeperator}></div>
    <div className={styles.feed}>
      <div className={styles.feedStart}></div>
      <PostNotification title="My First Post" username='John' timestamp={new Date("2025-03-12T14:48:00")}/>
      <PostNotification title="My Fourth Post should have a lot of content. Lorem ipsum dolor sic amet. That comes from a corruption of a Roman text on morality. The Romans also had some wacky ideas about the Egyptians, including the idea that their worship of animals was to such a degree as to be more important than their very lives." username='Olivia' timestamp={new Date("2025-03-10T10:14:00")}/>
      <div className={styles.feedEnd}></div>
    </div>
  </div>;
};

export default memo(NotificationCentre);
