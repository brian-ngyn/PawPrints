import { memo } from 'react';
import Post from '../../components/Post';

import styles from './index.module.scss';

const Home = () => {
  return <div className={styles.home}>
    
    Home Page
    <div className={styles.homeContents}>
    <Post title="My First Post" userimgsrc="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png" username='John'/>
    <Post title="My Second Post" userimgsrc="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" username='Olivia'/>
    <Post title="My Third Post \nThere is more content here" userimgsrc="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" username='Olivia'/>
    <Post title="My Fourth Post" userimgsrc="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" username='Olivia'/>
    </div>
  </div>;
};

export default memo(Home);
