import { memo } from 'react';
import Post from '../../components/Post';

import styles from './index.module.scss';
import NewPostButton from '../../components/NewPostButton';

const Home = () => {
  return <div className={styles.home}>
    <NewPostButton></NewPostButton>
    <div className={styles.feedSeperator}></div>
    <div className={styles.feed}>
      <div className={styles.feedStart}></div>
      <Post title="My First Post" userimgsrc="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png" username='John'/>
      <Post title="My Second Post" userimgsrc="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" username='Olivia'/>
      <Post title="My Third Post \nThere is more content here" userimgsrc="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" username='Olivia'/>
      <Post title="My Fourth Post should have a lot of content. Lorem ipsum dolor sic amet. That comes from a corruption of a Roman text on morality. The Romans also had some wacky ideas about the Egyptians, including the idea that their worship of animals was to such a degree as to be more important than their very lives." userimgsrc="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" username='Olivia'/>
      <div className={styles.feedEnd}></div>
    </div>
  </div>;
};

export default memo(Home);
