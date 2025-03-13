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
import PlusIcon from '../../PlusIcon';

//we are using primary green for this, but hardcoded right now
//also need to implement navigation to newpost page, right now it just goes to home
const NewPostButton = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.newPostButton} onClick={() => navigate('/')}>
      <PlusIcon width={10} height={10} colour= {"#c2d8b9"}></PlusIcon>
    </div>
  );
};

export default memo(NewPostButton);

//<img src={} width="10%" height= "10%" alt="" border-radius="50"></img>