import { memo } from 'react';
import Post from '../../components/Post';

import styles from './index.module.scss';
import NewPostButton from '../../components/NewPostButton';

type inUserProps = {
  username: string;
  userimgsrc: string;
}

const NewPostPage = (props: inUserProps) => {
  return <div className={styles.page}>
    <div className={styles.pageHeading}>
      Create New Post
    </div>

    <div className ={styles.outerBox}>
        <div className={styles.post}>
          <div className = {styles.postHeader}>
            <img src={props.userimgsrc} width="10%" height= "10%" alt="" border-radius="50"></img>
            <div className = {styles.postUser}>{props.username}</div>
          </div>

          <div className = {styles.postContents}>
            <textarea>
              
            </textarea>
          </div>
        </div>
      </div>
    <div className={styles.homeContents}>
      
    </div>
  </div>;
};

export default memo(NewPostPage);
