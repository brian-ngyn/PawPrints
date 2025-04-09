import { memo } from 'react';

import styles from './index.module.scss';
import SearchHeader from '../../components/SearchHeader';
import Feed from '../../components/Feed';

const Home = () => {
  return (
    <div className={styles.home}>
      <SearchHeader />
      <div className={styles.feedSeperator}></div>
      <div className={styles.feed}>
        <div className={styles.feedStart}></div>
        <Feed></Feed>
        <div className={styles.feedEnd}></div>
      </div>
    </div>
  );
};

export default memo(Home);
