//import { faUser } from '@fortawesome/free-regular-svg-icons';
/*import {
  faHouse,
  faPeopleGroup,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';*/
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
    <div className={styles.post}>
      <div className = {styles.postHeader}>
        <img src={props.userimgsrc} width="10%" height= "10%" alt="" border-radius="50"></img>
        <div className = {styles.postUser}>{props.username}</div>
      </div>
      <div className = {styles.postContents}>
        {props.title}
      </div>
    </div>
  );
};

export default memo(Post);
