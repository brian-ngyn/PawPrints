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

type PostNotifProps = {
  username: string;
  title: string;
  timestamp: Date;
}

const PostNotification = (props: PostNotifProps) => {
  //let navigate = useNavigate();
  let now = Date.now();
  let difference = (now - props.timestamp.getTime())/(1000*60)
  let dateUnits = " minutes "
  if (difference > 60) {
    dateUnits = " hours "
    difference = Math.ceil(difference/60)
    if (difference > 24) {
      difference = Math.ceil(difference/24)
      dateUnits = " days "
    }
  }

  return (
    <div className ={styles.outerBox}>
      <div className={styles.post}>
        <div className = {styles.postHeader}>
          <div className = {styles.postUser}>{props.username}</div>
          <div className = {styles.dateText}>{difference} {dateUnits} ago</div>
        </div>

        <div className = {styles.postContents}>
          {props.title}
        </div>
      </div>
    </div>
  );
};

export default memo(PostNotification);
