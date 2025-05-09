import { memo } from 'react';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';
import PostNotification from '../../components/PostNotification';

import { useNavigate } from 'react-router';

const NotificationCentre = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.home}>
      <div className={styles.pageHeading}>
        <FontAwesomeIcon
          onClick={() => navigate('/')}
          className={styles.backButton}
          icon={faChevronLeft}
          color="white"
          size="2xs"
        />
        <div>Notifications</div>
      </div>

      <div className={styles.feedSeperator}></div>
      <div className={styles.feed}>
        <div className={styles.feedStart}></div>
        <PostNotification
          title="This is another post by John, which has links"
          username="JohnTheVet"
          timestamp={new Date('2025-03-20T14:48:00')}
        />
        <PostNotification
          title="This post has an image"
          username="JohnTheVet"
          timestamp={new Date('2025-03-18T14:48:00')}
        />
        <PostNotification
          title="This Fourth Post should have a lot of content. Lorem ipsum dolor sic amet. That comes from a corruption of a Roman text on morality. The Romans also had some wacky ideas about the Egyptians, including the idea that their worship of animals was to such a degree as to be more important than their very lives."
          username="JohnTheVet"
          timestamp={new Date('2025-03-16T14:48:00')}
        />
        <PostNotification
          title="John's First Post"
          username="JohnTheVet"
          timestamp={new Date('2025-03-12T14:48:00')}
        />
        <div className={styles.feedEnd}></div>
      </div>
    </div>
  );
};

export default memo(NotificationCentre);
