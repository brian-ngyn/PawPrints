//import { faUser } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faComment,
  faTurnDown,
  faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

//import { useNavigate } from 'react-router';

import styles from './index.module.scss';

type PostProps = {
  username: string;
  userimgsrc: string;
  title: string;
}

const Post = (props: PostProps) => {
  //let navigate = useNavigate();

  return (
    <div className ={styles.outerBox}>
      <div className={styles.post}>
        <div className = {styles.postHeader}>
          <img src={props.userimgsrc} width="10%" height= "10%" alt="" style={{ borderRadius: "50%"}}></img>
          <div className = {styles.postUser}><h2>{props.username}</h2></div>
        </div>
        <div className = {styles.postContents}>
          {props.title}
        </div>
      </div>
      <div className={styles.buttonIcons}>
        <div className= {styles.actionButton}><FontAwesomeIcon icon={faBookmark} size="1x" /></div>
        <div className = {styles.actionButton}>
          <div className= {styles.mirrored}><FontAwesomeIcon icon={faComment} size = "1x"/></div>
        </div>
        <div className = {styles.actionButton}>
          <div className = {styles.rotate90}><FontAwesomeIcon icon={faTurnDown} size="1x" /></div>
        </div>
      </div>
    </div>
  );
};

export default memo(Post);