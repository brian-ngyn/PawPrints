import { memo } from 'react';
import Post from '../../components/Post';

import styles from './index.module.scss';
import NewPostButton from '../../components/NewPostButton';
import SearchHeader from '../../components/SearchHeader';
import {useState} from 'react';
import Feed from '../../components/Feed';

const Home = () => {
  return <div className={styles.home}>
    <SearchHeader />
    <div className={styles.feedSeperator}></div>
    <div className={styles.feed}>
      <div className={styles.feedStart}></div>
      <Feed></Feed>
      <div className={styles.feedEnd}></div>
    </div>
  </div>;
};

export default memo(Home);


