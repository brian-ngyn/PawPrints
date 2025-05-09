//import { faUser } from '@fortawesome/free-regular-svg-icons';
/*import {
  faHeart,
  faPeopleGroup,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';*/
import { memo } from 'react';

import { useNavigate } from 'react-router';

import styles from './index.module.scss';
import PlusIcon from '../PlusIcon';

//we are using primary black for this, but hardcoded right now
//also need to implement navigation to newpost page, right now it just goes to home
const NewPostButton = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.newPostButton} onClick={() => navigate('/new-post')}>
      <PlusIcon width={25} height={25} colour= {"#454545"}></PlusIcon>
      <div className={styles.newPostText}>New Post</div>
    </div>
  );
};

export default memo(NewPostButton);

//<img src={} width="10%" height= "10%" alt="" border-radius="50"></img>